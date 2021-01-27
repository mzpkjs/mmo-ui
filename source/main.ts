class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public toString = () => {
        return `${this.x}, ${this.y}`
    }

    public move = (vector: Point) => new Point(this.x + vector.x, this.y + vector.y)

    public multiply = (scalar: number) => new Point(this.x * scalar, this.y * scalar)

    public distance = (other: Point) => (Math.abs(this.x - other.x) + Math.abs(this.y - other.y) + Math.abs(this.x + this.y - other.x - other.y)) / 2
}

const hexPoints = (center: Point, size: number) => {
    return [...Array(6)].map((e, i) => {
        const angle_deg = 60 * i - 30
        const angle_rad = Math.PI / 180 * angle_deg
        return new Point(center.x + size * Math.cos(angle_rad), center.y + size * Math.sin(angle_rad))
    })
}

const drawHex = (center: Point, size: number, text: string): string => {
    const points = hexPoints(center, size)
    return `<polygon points="${points.join(' ')}" style="fill:lightgray;stroke:black;stroke-width:1.5">
        <title>${JSON.stringify({"x": center.x,"y": center.y}, null, 4)}</title>
    </polygon>
    <text x="${center.x}" y="${center.y + 6}" text-anchor="middle">${text}</text>
    `
}

const ORIGIN = new Point(600, 400)
const SIZE = 40
const X_VERSOR = new Point(SIZE * Math.sqrt(3), 0)
const Y_VERSOR = new Point(SIZE * Math.sqrt(3) / 2, SIZE * 3 / 2)

let x = [...Array(20)].map((e, x) => x - 10).forEach(x => {
    let y = [...Array(20)].map((e, y) => y - 10).forEach(y => {
        const center = ORIGIN
            .move(X_VERSOR.multiply(x))
            .move(Y_VERSOR.multiply(y))
        const distance = new Point(0, 0).distance(new Point(x, y))
        document.querySelector('#viewport')!.innerHTML += drawHex(center, SIZE, `${distance} : ${x},${y}`)
    })
})