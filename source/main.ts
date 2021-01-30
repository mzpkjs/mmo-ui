import { Hex } from "./hex"
import { range } from "./utils"
import { applyPanCapability, applyZoomCapability } from "./viewCapabilities"

const view = document.querySelector('#view')!

applyPanCapability(view)
applyZoomCapability(view, 0.1, 1, 0.05)

const hexGrid = range(-10, 11).flatMap(x => range(-10, 11).map(y => new Hex(x, y, 0)))
hexGrid.forEach(hex => view.innerHTML += hex.draw())
