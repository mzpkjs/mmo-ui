import { CONFIG } from "./config"
import { Point } from "./point"

export class Hex {
    public position: Point
    public chunkPosition: Point
    public gameObjects: any[]

    constructor(x: number, y: number, z: number, gameObjects: any[] = []) {
        this.position = new Point(x, y, z)
        this.chunkPosition = this.position.map(coord => Math.floor(coord / CONFIG.CHUNK_SIZE))
        this.gameObjects = gameObjects
    }

    public draw = () => {
        const center = CONFIG.ORIGIN_POINT
            .translate(CONFIG.X_VERSOR.multiply(this.position.x))
            .translate(CONFIG.Y_VERSOR.multiply(this.position.y))
        const points = this.hexPoints(center, CONFIG.HEX_SIZE)

        const g = document.createElementNS("http://www.w3.org/2000/svg", 'g')
        g.id = this.position.toString()
        g.innerHTML = `
            <polygon points="${points.join(' ')}">
                <title>${JSON.stringify(this, null, 4)}</title>
            </polygon>
            <text x="${center.x}" y="${center.y}" text-anchor="middle">${this.position.distance2D(new Point(0, 0, 0))}</text>
            <text x="${center.x}" y="${center.y + 18}" text-anchor="middle" style="font-size:10px;fill:gray">(${this.position})</text>
        `
        return g
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