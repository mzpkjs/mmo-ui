import { CONFIG } from "./config";
import { Hex } from "./hex";
import { Point } from "./point";
import { range } from "./utils";

export type Chunk = {
    minBound: Point
    maxBound: Point
}

export const loadChunk = async (point: Point) => {
    await new Promise(r => setTimeout(r, 1000))
    
    const minBound = point.multiply(CONFIG.CHUNK_SIZE)
    const maxBound = minBound.translate(new Point(CONFIG.CHUNK_SIZE, CONFIG.CHUNK_SIZE, 1))

    return range(minBound.x, maxBound.x).flatMap(x => 
        range(minBound.y, maxBound.y).flatMap(y => 
            range(minBound.z, maxBound.z).map(z => new Hex(x, y, z))
        )
    )
}

export const loadChunks = async (startPoint: Point, endPoint: Point) => {
    await new Promise(r => setTimeout(r, 1000))

    const minBound = startPoint.multiply(CONFIG.CHUNK_SIZE)
    const maxBound = endPoint
    .multiply(CONFIG.CHUNK_SIZE)
    .translate(new Point(CONFIG.CHUNK_SIZE, CONFIG.CHUNK_SIZE, 1))

    return range(minBound.x, maxBound.x).flatMap(x => 
        range(minBound.y, maxBound.y).flatMap(y => 
            range(minBound.z, maxBound.z).map(z => new Hex(x, y, z))
        )
    )
}