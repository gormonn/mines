import { createNoise2D } from "simplex-noise";
import { MinesMap } from "./types";
import { setCoordsKey } from "./utils";

// Trying to implement fractal noise: (just copy paste)
// https://www.redblobgames.com/maps/terrain-from-noise/#trees
export function getMines(
  width: number,
  height: number,
  R = 2
): { gameField: MinesMap; minesSet: Set<string> } {
  const noise = createNoise2D();
  const gameField: MinesMap = {};
  const minesSet = new Set<string>();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let nx = x / width - 0.5,
        ny = y / height - 0.5;
      const val = noise(50 * nx, 50 * ny) > 0.5 ? 1 : 0;
      const keyCoord = setCoordsKey([x, y]);
      gameField[keyCoord] = val;
      if (val) minesSet.add(keyCoord);
    }
  }
  return { gameField, minesSet };

  // for (let yc = 0; yc < height; yc++) {
  //   for (let xc = 0; xc < width; xc++) {
  //     let max = 0;
  //     // there are more efficient algorithms than this
  //     for (let yn = yc - R; yn <= yc + R; yn++) {
  //       for (let xn = xc - R; xn <= xc + R; xn++) {
  //         if (0 <= yn && yn < height && 0 <= xn && xn < width) {
  //           // let e = bluenoise[yn][xn];
  //           let e = bluenoise.get({ x: xn, y: yn });
  //           if (e > max) {
  //             max = e;
  //           }
  //         }
  //       }
  //     }
  //     const coordKey = { x: xc, y: yc };
  //     // if (bluenoise[yc][xc] == max) {
  //     if (bluenoise.get(coordKey) == max) {
  //       mines.set(coordKey, 1);
  //       // place tree at xc,yc
  //     } else {
  //       mines.set(coordKey, 0);
  //     }
  //   }
  // }
}
