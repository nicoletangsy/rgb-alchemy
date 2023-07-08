import { createContext, useEffect, useState } from "react";
import { FetchDataType, GameDataType, TileType } from "../types";
import {
  calcDelta,
  findAllSources,
  initSrcs,
  initTiles,
  findNewColorMultiSrc,
  updateGameGrid,
} from "utils";
import axios from "axios";

export interface IContext {
  userData: FetchDataType;
  setUserData: (fetch: FetchDataType) => void;
  colorSources: TileType[];
  setColorSources: (sources: TileType[]) => void;
  gameData: GameDataType;
  setGameData: (gameData: GameDataType) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  lastSrc: TileType | null;
  setLastSrc: (src: TileType | null) => void;
  draggingTile: TileType | null;
  setDraggingTile: (tile: TileType | null) => void;
  fetchNewGame: () => void;
  gameGrid: TileType[][];
  setGameGrid: (grid: TileType[][]) => void;
}

const initContext: IContext = {
  userData: {
    userId: "",
    width: 10,
    height: 4,
    maxMoves: 8,
    target: {
      r: 0,
      g: 0,
      b: 0,
    },
  },
  setUserData: () => {},
  colorSources: [],
  setColorSources: () => {},
  gameData: {
    moved: 0,
    closest: {
      x: 0,
      y: 0,
      color: {
        r: 0,
        g: 0,
        b: 0,
      },
    },
    delta: 100,
    tiles: [],
    isEndGame: false,
  },
  setGameData: () => {},
  loading: true,
  setLoading: () => {},
  lastSrc: null,
  setLastSrc: () => {},
  draggingTile: null,
  setDraggingTile: () => {},
  fetchNewGame: () => {},
  gameGrid: [],
  setGameGrid: () => {},
};

export const Context = createContext<IContext>(initContext);

const ContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userData, setUserData] = useState<FetchDataType>(initContext.userData);
  const [colorSources, setColorSources] = useState<TileType[]>([]);
  const [gameData, setGameData] = useState<GameDataType>(initContext.gameData);
  const [loading, setLoading] = useState<boolean>(initContext.loading);
  const [lastSrc, setLastSrc] = useState<TileType | null>(initContext.lastSrc);
  const [draggingTile, setDraggingTile] = useState<TileType | null>(
    initContext.draggingTile
  );
  const [gameGrid, setGameGrid] = useState<TileType[][]>(initContext.gameGrid);

  const fetchData = async (url: string) => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      const data = await res.data;
      const width = data?.width || 10;
      const height = data?.height || 4;
      const target = {
        r: data?.target[0] || 0,
        g: data?.target[1] || 0,
        b: data?.target[2] || 0,
      };
      const closest = {
        x: 0,
        y: 0,
        color: {
          r: 0,
          g: 0,
          b: 0,
        },
      };
      const srcs = initSrcs(width, height);
      const tiles = initTiles(width, height);
      const gameGrid = updateGameGrid(width, height, srcs, tiles);
      setUserData({
        userId: data?.userId || "",
        width,
        height,
        maxMoves: data?.maxMoves || 8,
        target,
      });
      setColorSources(srcs);
      setGameData({
        moved: 0,
        closest,
        delta: calcDelta(target, closest.color),
        tiles,
        isEndGame: false,
      });
      setLastSrc(null);
      setDraggingTile(null);
      setGameGrid(gameGrid);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNewGame = () => {
    const url = "http://localhost:9876/init/user/" + userData.userId;
    fetchData(url);
  };

  useEffect(() => {
    // fetch init data
    fetchData("http://localhost:9876/init");
  }, []);

  useEffect(() => {
    if (!gameData.isEndGame && lastSrc) {
      // update gameData when sources changes
      let newColorSources = colorSources.map((src) => {
        if (src.x === lastSrc.x && src.y === lastSrc.y) {
          return lastSrc;
        }
        return src;
      });
      // step 1. all affected tiles
      let newTiles = gameData.tiles.map((tile) => {
        const src = findAllSources(tile, newColorSources);
        const newColor = findNewColorMultiSrc(
          src,
          tile,
          userData.width,
          userData.height
        );
        return {
          ...tile,
          color: newColor,
        };
      });
      // step 2. find minimum delta and closest tile
      let closest: TileType = newTiles[0];
      let delta = calcDelta(userData.target, newTiles[0].color);
      for (let i = 1; i < newTiles.length; i++) {
        const newDelta = calcDelta(userData.target, newTiles[i].color);
        if (newDelta < delta) {
          closest = {
            x: newTiles[i].x,
            y: newTiles[i].y,
            color: newTiles[i].color,
          };
          delta = newDelta;
        }
      }
      // step 3: update game grid
      const newGameGrid = updateGameGrid(
        userData.width,
        userData.height,
        newColorSources,
        newTiles
      );

      setColorSources(newColorSources);
      setGameData({
        ...gameData,
        closest,
        delta,
        tiles: newTiles,
        moved: gameData.moved + 1,
      });
      setLastSrc(null);
      setGameGrid(newGameGrid);
    }
  }, [
    colorSources,
    gameData,
    lastSrc,
    userData.height,
    userData.target,
    userData.width,
  ]);

  return (
    <Context.Provider
      value={{
        userData,
        setUserData,
        colorSources,
        setColorSources,
        gameData,
        setGameData,
        loading,
        setLoading,
        lastSrc,
        setLastSrc,
        draggingTile,
        setDraggingTile,
        fetchNewGame,
        gameGrid,
        setGameGrid,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
