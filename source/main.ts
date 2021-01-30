import { Hex } from "./hex"
import { range } from "./utils"

const view = document.querySelector('#viewport')!

const hexGrid = range(-10, 11).flatMap(x => range(-10, 11).map(y => new Hex(x, y, 0)))
hexGrid.forEach(hex => view.innerHTML += hex.draw())
