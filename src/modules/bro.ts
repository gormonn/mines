import { ItemCoord } from "./types";
import { getCoordsKey, setCoordsKey } from "./utils";

/*
lt | t | tr
lm | m | mr
lb | b | br

x , y|x, y|x, y
-1,-1|0,-1|+1,-1
-1, 0|0, 0|+1, 0
-1,+1|0,+1|+1,+1
*/
export const getBroCoords = ({ coord }: ItemCoord): string[] => {
  const [x, y] = getCoordsKey(coord);
  const lt = setCoordsKey([x - 1, y - 1]);
  const lm = setCoordsKey([x - 1, y]);
  const lb = setCoordsKey([x - 1, y + 1]);

  const t = setCoordsKey([x, y - 1]);
  // const m = [ x,  y ];
  const b = setCoordsKey([x, y + 1]);

  const tr = setCoordsKey([x + 1, y - 1]);
  const mr = setCoordsKey([x + 1, y]);
  const br = setCoordsKey([x + 1, y + 1]);

  return [lt, lm, lb, t, b, tr, mr, br];
};

export const getClosestBros = (props: ItemCoord) => {
  const bros = getBroCoords(props);

  console.log("bros", bros);
};
