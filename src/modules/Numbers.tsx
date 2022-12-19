import { FC, useEffect, useMemo } from "react";
import { ItemCoord, WithItemOpener } from "./types";
import { useMinesContext } from "./useMines";
import { getBroCoords, getClosestBros } from "./bro";
import "./numbers.scss";

export const Numbers: FC<ItemCoord & WithItemOpener> = ({
  coord,
  openItem
}) => {
  const minesMap = useMinesContext();

  const minesAroundCount = useMemo(() => {
    const broCoords = getBroCoords({ coord });
    // console.log("broCoords", broCoords);
    return broCoords.reduce(
      (acc, coordsKey) =>
        minesMap[coordsKey] ? acc + minesMap[coordsKey] : acc,
      0
    );
  }, [minesMap, coord]);

  useEffect(() => {
    if (!minesAroundCount) {
      // getClosestBros({ coord });
      const broCoords = getBroCoords({ coord });
      broCoords.forEach((broCoord) => {
        openItem(broCoord);
      });
    }
  }, [minesAroundCount, openItem, coord]);

  return minesAroundCount ? (
    <div className={`num_${minesAroundCount}`} />
  ) : null;
};
