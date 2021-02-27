import { CONFIG } from "./config"
import { Hex } from "./hex"
import { loadChunkDB, unloadChunk } from "./mapProvider"
import { Point } from "./point"
import { range, unique } from "./utils"
import { applyOriginChangeCapability, applyPanCapability, applyRotateCapability, applyZoomCapability, preventContextMenuCapability } from "./viewCapabilities"

const map = new Map<string, Hex>()
const view = document.querySelector('#view')!

preventContextMenuCapability(view)
applyPanCapability(view)
applyZoomCapability(view, 0.2, 1.2, 0.05)
applyRotateCapability(view)
applyOriginChangeCapability(view, async newOrigin => {
    await loadIntoMap(newOrigin)
    await unloadFromMap(newOrigin)
})


loadIntoMap(CONFIG.ORIGIN_POINT)


function loadIntoMap(origin: Point) {
    const chunkGroup = document.createDocumentFragment()
    return Promise.all(
        range(origin.x - CONFIG.RENDER_DISTANCE, origin.x + CONFIG.RENDER_DISTANCE + 1)
        .flatMap(x => range(origin.y - CONFIG.RENDER_DISTANCE, origin.y + CONFIG.RENDER_DISTANCE + 1).map(y => new Point(x, y)))
        .filter(chunk => chunk.distance3D(origin) <= CONFIG.RENDER_DISTANCE)
        .map(async chunkPosition => {
            const result = await loadChunkDB(chunkPosition)
            if (result.length !== 0) {
                result.forEach(h => map.set(h.position.toString(), h))
    
                const chunk = document.createElementNS("http://www.w3.org/2000/svg", 'g')
                chunk.id = `chunk ${chunkPosition}`
                chunk.append(...result.map(h => h.draw()))
                
                chunkGroup.append(chunk)
            }
        })
    ).then(() => view.append(chunkGroup))
}

function unloadFromMap(origin: Point) {
    return Promise.all(
        [...map.values()]
        .filter(hex => hex.chunkPosition.distance3D(origin) > CONFIG.RENDER_DISTANCE * 2)
        .map(hex => {
            const id = hex.position.toString()
            map.delete(id)
            return 'chunk ' + hex.chunkPosition
        })
        .filter(unique)
        .map(chunkId => {
            view.querySelector('#' + CSS.escape(chunkId))!.remove()
            const chunk = new Point(...chunkId
                .slice(6)
                .split(', ')
                .map(i => parseInt(i)) as [number, number])
            unloadChunk(chunk)
        })
    )
}