import { CONFIG } from "./config";
import { Hex } from "./hex";
import { Point } from "./point";
import { range } from "./utils";

export type Chunk = {
    minBound: Point
    maxBound: Point
}

const loadedChunks = new Set<string>()

export const loadChunk = async (point: Point) => {
    if (loadedChunks.has(point.toString())) {
        return []
    }
    await new Promise(r => setTimeout(r, 100))
    
    const minBound = point.multiply(CONFIG.CHUNK_SIZE)
    const maxBound = minBound.translate(new Point(CONFIG.CHUNK_SIZE, CONFIG.CHUNK_SIZE, 1))

    loadedChunks.add(point.toString())

    return range(minBound.x, maxBound.x).flatMap(x => 
        range(minBound.y, maxBound.y).flatMap(y => 
            range(minBound.z, maxBound.z).map(z => new Hex(x, y, z))
        )
    )
}
