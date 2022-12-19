import { FC } from "react";
import styled from "styled-components";
import { ItemCoord, WithItemOpener } from "./types";
import { Numbers } from "./Numbers";

const ItemClosed = styled("div")`
  border: outset;
  border-color: #4bd6c8;
  &:hover {
    border-color: #54f0e0;
    background: rgba(255, 255, 255, 0.2);
  }
  &:active {
    border: solid;
    background: rgba(255, 255, 255, 0.1);
    border-color: #277069;
  }
`;

const ItemOpened = styled("div")`
  border: solid;
  border-color: #8a9fb5;
  background: #a7c0db;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const ItemMine = styled("div")<{ clicked?: boolean }>`
  width: 100%;
  height: 100%;
  background: ${(p) => (p?.clicked ? "red" : undefined)};
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: "";
    border: solid;
    border-color: ${(p) => (p?.clicked ? "red" : "#8a9fb5")};
    border-radius: 100%;
    width: 65%;
    height: 65%;
    background: black;
  }
`;

export const ItemComponent: FC<
  {
    isMine: boolean;
    isClickedMine: boolean;
    isOpen: boolean;
  } & ItemCoord &
    WithItemOpener
> = ({ isOpen, isMine, isClickedMine, openItem, coord }) => {
  return isOpen ? (
    <ItemOpened>
      {isMine ? (
        <ItemMine clicked={isClickedMine} />
      ) : (
        <Numbers coord={coord} openItem={openItem} />
      )}
    </ItemOpened>
  ) : (
    <ItemClosed onClick={() => openItem(coord)} />
  );
};
