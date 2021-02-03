import { CONFIG } from "./config"
import { loadChunk, loadChunks } from "./mapProvider"
import { Point } from "./point"
import { range } from "./utils"
import { applyPanCapability, applyRotateCapability, applyZoomCapability } from "./viewCapabilities"

const view = document.querySelector('#view')!
view.addEventListener('contextmenu', e => e.preventDefault())

applyPanCapability(view)
applyZoomCapability(view, 0.2, 1, 0.05)
applyRotateCapability(view)

const start = CONFIG.ORIGIN_POINT
loadChunk(start).then(draw).then(() =>
    range(0, CONFIG.RENDER_DISTANCE).forEach(async d => {
        console.log(d)
        let min, max

        min = new Point(start.x - d, start.y - d)
        max = min.translate(new Point(d * 2 - 1, 0))
        await loadChunks(min, max).then(draw)
        
        min = new Point(start.x + d, start.y - d)
        max = min.translate(new Point(0, d * 2 - 1))
        await loadChunks(min, max).then(draw)

        max = new Point(start.x + d, start.y + d)
        min = max.translate(new Point(- d * 2 + 1, 0))
        await loadChunks(min, max).then(draw)

        max = new Point(start.x - d, start.y + d)
        min = max.translate(new Point(0, - d * 2 + 1))
        await loadChunks(min, max).then(draw)
    })
)

function draw(result: import("c:/Users/pguzek/IdeaProjects/mmo-ui/source/hex").Hex[]) {
    view.innerHTML += result.map(h => h.draw()).join()
}
