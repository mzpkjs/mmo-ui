
const TRANSLATE_REGEXP = /translate\(([-0-9\.]+) ([-0-9\.]+)\)/
const SCALE_REGEXP = /scale\(([-0-9\.]+)\)/
const ROTATE_REGEXP = /rotate\(([-0-9\.]+)\)/

export const applyPanCapability = (view: Element) => {
    view.addEventListener('mousemove', e => {
        e.preventDefault()
        e.stopPropagation()

        if ((e as MouseEvent).buttons === 1) {
            const transform = view.attributes.getNamedItem('transform')!
            const [x, y] = getTranslate(transform)

            const [viewX, viewY] = view.parentElement!.getAttribute('viewBox')!.split(' ').slice(2).map(e => parseInt(e))
            const screenX = view.parentElement!.getBoundingClientRect().width
            const screenY = view.parentElement!.getBoundingClientRect().height
            const mouseX = (e as MouseEvent).movementX * viewX / screenX
            const mouseY = (e as MouseEvent).movementY * viewY / screenY
            
            setTranslate(transform, x + mouseX, y + mouseY)
        }
    })
}

export const applyZoomCapability = (view: Element, minZoom: number, maxZoom: number, step: number) => {
    view.addEventListener('wheel', e => {
        e.preventDefault()
        e.stopPropagation()

        const transform = view.attributes.getNamedItem('transform')!
        const zoom = getZoom(transform)
        const deltaZoom = Math.sign((e as WheelEvent).deltaY) * step;
        const newZoom = Math.min(maxZoom, Math.max(minZoom, zoom - deltaZoom))
        setZoom(transform, newZoom)

        const [viewX, viewY] = view.parentElement!.getAttribute('viewBox')!.split(' ').slice(2).map(e => parseInt(e))
        const screenX = view.parentElement!.getBoundingClientRect().width
        const screenY = view.parentElement!.getBoundingClientRect().height
        const mouseX = (e as WheelEvent).x * viewX / screenX
        const mouseY = (e as WheelEvent).y * viewY / screenY

        const [x, y] = getTranslate(transform)
        const diffX = mouseX - x
        const diffY = mouseY - y
        setTranslate(transform, x + diffX * (zoom - newZoom) / zoom, y + diffY * (zoom - newZoom) / zoom)
    })
}

export const applyRotateCapability = (view: Element) => {
    view.addEventListener('mousedown', e => {
        e.preventDefault()
        e.stopPropagation()

        if ((e as MouseEvent).buttons === 4) {
            const transform = view.attributes.getNamedItem('transform')!
            const rotate = getRotate(transform)
            setRotate(transform, rotate + 45)
        }
    })
}

function getTranslate(transform: Attr): [number, number] {
    return transform.value.match(TRANSLATE_REGEXP)!.slice(1).map(s => parseInt(s)) as [number, number]
}

function setTranslate(transform: Attr, x: number, y: number) {
    const translate = `translate(${x} ${y})`
    transform.value = transform.value.replace(TRANSLATE_REGEXP, translate)
}

function getZoom(transform: Attr) {
    return parseFloat(transform.value.match(SCALE_REGEXP)![1])
}

function setZoom(transform: Attr, zoom: number) {
    const scale = `scale(${zoom})`
    transform.value = transform.value.replace(SCALE_REGEXP, scale)
}

function getRotate(transform: Attr) {
    return parseFloat(transform.value.match(ROTATE_REGEXP)![1])
}

function setRotate(transform: Attr, deg: number) {
    const rotate = `rotate(${deg})`
    transform.value = transform.value.replace(ROTATE_REGEXP, rotate)
}
