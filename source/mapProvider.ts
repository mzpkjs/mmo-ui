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
    
    const minBound = point.multiply(CONFIG.CHUNK_SIZE)
    const maxBound = minBound.translate(new Point(CONFIG.CHUNK_SIZE, CONFIG.CHUNK_SIZE, 1))

    loadedChunks.add(point.toString())

    return range(minBound.x, maxBound.x).flatMap(x => 
        range(minBound.y, maxBound.y).flatMap(y => 
            range(minBound.z, maxBound.z).map(z => new Hex(x, y, z))
        )
    )
}

export const unloadChunk = (point: Point) => {
    loadedChunks.delete(point.toString())
    console.log('unload', point.toString())
}

export const loadChunkDB = async (point: Point) => {
    if (loadedChunks.has(point.toString())) {
        return []
    }
    console.log('load', point.toString())

    const minBound = point.multiply(CONFIG.CHUNK_SIZE)
    const maxBound = minBound.translate(new Point(CONFIG.CHUNK_SIZE - 1, CONFIG.CHUNK_SIZE - 1, 0))

    const response = await fetch('http://localhost:3000', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            minBound: minBound,
            maxBound: maxBound
        })
    })
    const body = await response.json();

    loadedChunks.add(point.toString())
    return (body as unknown as Hex[]).map(h => new Hex(h.position.x, h.position.y, h.position.z, h.gameObjects))
}
