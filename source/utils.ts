import { Point } from "./point";

export const range = (start: number, stop: number) => [...Array(stop - start)].map((e, i) => i + start)
export const unique = (element: any, index: number, array: any[]) => array.indexOf(element) === index

export const HEX_MOVE = {
    RIGHT:          new Point(1, 0, 0),
    LEFT:           new Point(-1, 0, 0),
    UPPER_RIGHT:    new Point(1, -1, 0),
    UPPER_LEFT:     new Point(0, -1, 0),
    LOWER_RIGHT:    new Point(0, 1, 0),
    LOWER_LEFT:     new Point(-1, 1, 0),
    UP:             new Point(0, 0, 1),
    DOWN:           new Point(0, 0, -1),
}