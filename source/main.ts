import { CONFIG } from "./config"
import { Hex } from "./hex"
import { loadChunk } from "./mapProvider"
import { Point } from "./point"
import { range } from "./utils"
import { applyOriginChangeCapability, applyPanCapability, applyRotateCapability, applyZoomCapability, preventContextMenuCapability } from "./viewCapabilities"

const map = new Map<string, Hex>()
const view = document.querySelector('#view')!

preventContextMenuCapability(view)
applyPanCapability(view)
applyZoomCapability(view, 0.2, 1.2, 0.05)
applyRotateCapability(view)
applyOriginChangeCapability(view, newOrigin => loadIntoMap(map, newOrigin))


loadIntoMap(map, CONFIG.ORIGIN_POINT)

function loadIntoMap(map: Map<string, Hex>, origin: Point) {
    return Promise.all(
        range(origin.x - CONFIG.RENDER_DISTANCE, origin.x + CONFIG.RENDER_DISTANCE + 1)
        .flatMap(x => range(origin.y - CONFIG.RENDER_DISTANCE, origin.y + CONFIG.RENDER_DISTANCE + 1).map(y => new Point(x, y)))
        .filter(chunk => chunk.distance3D(origin) <= CONFIG.RENDER_DISTANCE)
        .sort((p1, p2) => p1.distance3D(origin) - p2.distance3D(origin))
        .map(async chunk => {
            const result = await loadChunk(chunk)
            view.append(...result.map(h => h.draw()))
            result.forEach(h => map.set(h.position.toString(), h))
        })
    )
}