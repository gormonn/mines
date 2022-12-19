import { MinesCoord } from "./types";

export function getAngle(cx: number, cy: number, ex: number, ey: number) {
  const dy = ey - cy;
  const dx = ex - cx;
  let theta = Math.atan2(dy, dx); // range (-PI, PI]
  // theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

export function getCenterElement(element: HTMLDivElement): [number, number] {
  const box = element.getBoundingClientRect();
  const xCenter = (box.left + box.right) / 2;
  const yCenter = (box.top + box.bottom) / 2;

  return [xCenter, yCenter];
}

export const getCoordsKey = (key: string): MinesCoord =>
  key.split("-").map((e) => Number(e)) as MinesCoord;

export const setCoordsKey = (coord: MinesCoord) => coord.join("-");
