import { CONFIG } from "./config"
import { loadChunk } from "./mapProvider"
import { Point } from "./point"
import { range } from "./utils"
import { applyPanCapability, applyRotateCapability, applyZoomCapability } from "./viewCapabilities"

const view = document.querySelector('#view')!
view.addEventListener('contextmenu', e => e.preventDefault())

applyPanCapability(view)
applyZoomCapability(view, 0.2, 1, 0.05)
applyRotateCapability(view)

// const hexGrid = range(-10, 11).flatMap(x => range(-10, 11).map(y => new Hex(x, y, 0)))
// hexGrid.forEach(hex => view.innerHTML += hex.draw())

range(-CONFIG.RENDER_DISTANCE, CONFIG.RENDER_DISTANCE).forEach(async (x) => {
    range(-CONFIG.RENDER_DISTANCE, CONFIG.RENDER_DISTANCE).forEach(async (y) => {
        
        const minBound = new Point(x * CONFIG.CHUNK_SIZE, y * CONFIG.CHUNK_SIZE, 0)
        const maxBound = minBound.translate(new Point(CONFIG.CHUNK_SIZE, CONFIG.CHUNK_SIZE))

        const hexes = await loadChunk({minBound: minBound, maxBound: maxBound})
        view.innerHTML += hexes.map(h => h.draw()).join()
    })
})
