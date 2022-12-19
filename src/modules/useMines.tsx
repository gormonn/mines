import React, { useState, useEffect, useContext, useCallback } from "react";
import { nanoid } from "nanoid";
import { getMines } from "./mines";
import { MinesMap } from "./types";
import { gameConfig } from "./config";

export const useMines = (width: number, height: number) => {
  const [gameId, setGameID] = useState(() => nanoid());
  const [openedItems, setOpenedItems] = useState(new Set<string>());
  const [clickedMine, setClickedMine] = useState("");

  const [{ gameField, minesSet }, setMinesMap] = useState(() =>
    getMines(width, height)
  );

  const newGame = useCallback(() => {
    console.log("resetAll");
    setClickedMine("");
    setGameID(() => nanoid());
    setOpenedItems(new Set());
    setMinesMap(getMines(width, height));
  }, [width, height]);

  useEffect(() => {
    function createNewGame() {
      newGame();
    }
    createNewGame();
  }, [newGame]);

  const openItem = useCallback(
    (coord: string) => {
      setOpenedItems((coords) => {
        const newSet = new Set(coords);
        newSet.add(coord);
        return newSet;
      });
    },
    [setOpenedItems]
  );

  useEffect(() => {
    const mineCoord = Array.from(openedItems).find((openedItem) =>
      minesSet.has(openedItem)
    );
    if (mineCoord) {
      // todo: bugged: openedItems
      if (gameConfig.showAllMines) {
        Array.from(minesSet).forEach((coord) => {
          openItem(coord);
        });
      }
      setClickedMine(mineCoord);
    }
  }, [openedItems, minesSet, openItem]);

  const isGameOver = Boolean(clickedMine);

  return {
    newGame,
    gameField,
    openItem,
    openedItems,
    clickedMine,
    isGameOver,
    minesSet,
    gameId
  };
};

export const MinesContext = React.createContext<MinesMap>({});
export const useMinesContext = () => {
  return useContext(MinesContext);
};
