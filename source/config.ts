import { Point } from "./point"

const SIZE = 40

export const CONFIG = {
    CHUNK_SIZE: 5,
    RENDER_DISTANCE: 4,
    HEX_SIZE: SIZE,
    ORIGIN_POINT: new Point(0, 0),
    X_VERSOR: new Point(SIZE * Math.sqrt(3), 0),
    Y_VERSOR: new Point(SIZE * Math.sqrt(3) / 2, SIZE * 3 / 2),
}