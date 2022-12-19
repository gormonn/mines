import {
  FC,
  PropsWithChildren,
  useState,
  useCallback,
  MouseEvent,
  useEffect
} from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { useSpring, animated } from "react-spring";
import { useMines, MinesContext } from "./useMines";
import { MinesMapProps } from "./types";
import { ItemComponent } from "./Items";
import { getCoordsKey } from "./utils";
import { gameConfig } from "./config";

type ContainerProps = {
  $width: number;
  $height: number;
  $isGameOver: boolean;
};
const Container = styled("div")<ContainerProps>`
  display: grid;
  grid-template-rows: repeat(${(p) => p.$height}, 24px);
  grid-template-columns: repeat(${(p) => p.$width}, 24px);
  /* gap: 1px; */
  /* cursor: none; */
  background: radial-gradient(#58fcec, #277069);
  pointer-events: ${(p) => (p.$isGameOver ? "none" : "all")};
`;

const ContainerComponent: FC<PropsWithChildren<
  MinesMapProps & { isGameOver: boolean }
>> = ({ children, width, height, isGameOver }) => {
  const [center, setCenter] = useState([0, 0]);

  const angleMouseHandler = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const ex = e.pageX;
    const ey = e.pageY;
    setCenter([ex, ey]);
  }, []);

  const spring = useSpring({
    background: `radial-gradient(at ${center[0]}px ${center[1]}px, #58fcec, #277069)`
  });

  return (
    <Container
      as={animated.div}
      $width={width}
      $height={height}
      $isGameOver={isGameOver}
      style={spring}
      // onMouseMove={debounce(angleMouseHandler, 300, {
      //   leading: true,
      //   trailing: false
      // })}
      // onMouseMove={debounce(angleMouseHandler, 100, {
      //   leading: true,
      //   trailing: false
      // })}
      // onMouseMove={debounce(angleMouseHandler, 100)}
      onMouseMove={angleMouseHandler}
    >
      {children}
    </Container>
  );
};

const Flex = styled("div")`
  display: flex;
  flex-direction: column;
`;

export const Grid: FC<MinesMapProps> = (props) => {
  // const [gameId, setGameID] = useState(() => nanoid());
  // const { gameField, minesSet } = useMines(props.width, props.height, gameId);
  // const { gameField, minesSet, gameId } = useMines(props.width, props.height);
  // const [openedItems, setOpenedItems] = useState(new Set<string>());
  // const [clickedMine, setClickedMine] = useState("");
  // const [isGameOver, setIsGameOver] = useState(false);

  // const newGame = useCallback(() => {
  //   console.log("resetAll");
  //   setOpenedItems(new Set());
  //   setClickedMine("");
  //   setGameID(() => nanoid());
  // }, []);

  // const openItem = useCallback(
  //   (coord: string) => {
  //     setOpenedItems((coords) => {
  //       const newSet = new Set(coords);
  //       newSet.add(coord);
  //       return newSet;
  //     });
  //   },
  //   [setOpenedItems]
  // );

  // useEffect(() => {
  //   const mineCoord = Array.from(openedItems).find((openedItem) =>
  //     minesSet.has(openedItem)
  //   );
  //   if (mineCoord) {
  //     // todo: bugged: openedItems
  //     if (gameConfig.showAllMines) {
  //       Array.from(minesSet).forEach((coord) => {
  //         openItem(coord);
  //       });
  //     }
  //     setClickedMine(mineCoord);
  //   }
  // }, [openedItems, minesSet, openItem]);

  // const isGameOver = Boolean(clickedMine);

  const {
    newGame,
    gameField,
    openItem,
    openedItems,
    clickedMine,
    isGameOver
  } = useMines(props.width, props.height);

  return (
    <Flex>
      <MinesContext.Provider value={gameField}>
        <ContainerComponent
          isGameOver={isGameOver}
          width={props.width}
          height={props.height}
        >
          {Object.keys(gameField).map((coord) => (
            <ItemComponent
              key={coord}
              coord={coord}
              isOpen={openedItems.has(coord)}
              isMine={Boolean(gameField[coord])}
              isClickedMine={clickedMine === coord}
              openItem={openItem}
            />
          ))}
        </ContainerComponent>
      </MinesContext.Provider>
      {clickedMine && <button onClick={() => newGame()}>New Game</button>}
    </Flex>
  );
};
