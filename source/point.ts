export class Point {
    x: number
    y: number
    z: number

    constructor(x: number, y: number, z: number = 0) {
        this.x = x
        this.y = y
        this.z = z
    }

    public toString = () => `${this.x}, ${this.y}`

    public valueOf = () => `${this.x}, ${this.y}`

    public translate = (vector: Point) => new Point(this.x + vector.x, this.y + vector.y, this.z + vector.z)

    public multiply = (scalar: number) => new Point(this.x * scalar, this.y * scalar, this.z * scalar)

    public map = (mapper: (coord: number) => number) => new Point(mapper(this.x), mapper(this.y), mapper(this.z))

    public distance2D = (other: Point) => (Math.abs(this.x - other.x) + Math.abs(this.y - other.y) + Math.abs(this.x + this.y - other.x - other.y)) / 2

    public distance3D = (other: Point) => this.distance2D(other) + Math.abs(this.z - other.z)
}