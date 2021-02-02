import { Hex } from "./hex";
import { Point } from "./point";
import { range } from "./utils";

export type Chunk = {
    minBound: Point
    maxBound: Point
}

export const loadChunk = async (chunk: Chunk) => {
    await new Promise(r => setTimeout(r, Math.random() * 2000 + 1000))
    return range(chunk.minBound.x, chunk.maxBound.x + 1).flatMap(x => 
        range(chunk.minBound.y, chunk.maxBound.y + 1).flatMap(y => 
            range(chunk.minBound.z, chunk.maxBound.z + 1).map(z => new Hex(x, y, z))
        )
    )
}