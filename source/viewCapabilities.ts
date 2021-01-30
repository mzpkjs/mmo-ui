
const TRANSLATE_REGEXP = /translate\(([-0-9\.]+) ([-0-9\.]+)\)/
const SCALE_REGEXP = /scale\(([-0-9\.]+)\)/

export const applyPanCapability = (view: Element) => {
    view.addEventListener('mousemove', e => {
        e.preventDefault()
        e.stopPropagation()
        if ((e as MouseEvent).buttons === 1) {
            const transform = view.attributes.getNamedItem('transform')!
            const [x, y] = getTranslate(transform)
            setTranslate(transform, x + (e as MouseEvent).movementX, y + (e as MouseEvent).movementY)
        }
    })
}

export const applyZoomCapability = (view: Element, minZoom: number, maxZoom: number) => {
    view.addEventListener('wheel', e => {
        e.preventDefault()
        e.stopPropagation()
        const transform = view.attributes.getNamedItem('transform')!
        const zoom = getZoom(transform)
        const deltaZoom = (e as WheelEvent).deltaY / 100;
        setZoom(transform, Math.min(maxZoom, Math.max(minZoom, zoom - deltaZoom)))
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
