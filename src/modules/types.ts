export type MinesMapProps = { width: number; height: number };
export type MinesCoord = [number, number];
// export type ItemCoord = { x: number; y: number };
export type ItemCoord = { coord: string };
export type MinesMap = Record<string, number>;
export type ItemOpener = (coord: string) => void;
export type WithItemOpener = { openItem: ItemOpener };
