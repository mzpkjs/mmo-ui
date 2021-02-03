import { CONFIG } from "./config"
import { Point } from "./point"

export class Hex {
    public position: Point

    public gameObjects: any[]

    constructor(x: number, y: number, z: number, gameObjects: any[] = []) {
        this.position = new Point(x, y, z)
        this.gameObjects = gameObjects
    }

    public draw = (): string => {
        const center = CONFIG.ORIGIN_POINT
            .translate(CONFIG.X_VERSOR.multiply(this.position.x))
            .translate(CONFIG.Y_VERSOR.multiply(this.position.y))
        const points = this.hexPoints(center, CONFIG.HEX_SIZE)

        return `
        <g id="${this.position.toString()}">
            <polygon points="${points.join(' ')}">
                <title>${JSON.stringify(this, null, 4)}</title>
            </polygon>
            <text x="${center.x}" y="${center.y}" text-anchor="middle">${this.position.distance2D(new Point(0, 0, 0))}</text>
            <text x="${center.x}" y="${center.y + 18}" text-anchor="middle" style="font-size:10px;fill:gray">(${new Point(this.position.x, this.position.y)})</text>
        </g>
        `
    }

    private hexPoints = (center: Point, size: number) => {
        return [...Array(6)].map((e, i) => {
            const angle_deg = 60 * i - 30
            const angle_rad = Math.PI / 180 * angle_deg
            return new Point(center.x + size * Math.cos(angle_rad), center.y + size * Math.sin(angle_rad))
        })
    }

    public distance = (other: Hex) => this.position.distance2D(other.position)

    public neighbours = () => [
        
    ]
}