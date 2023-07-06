import { ColorType, TileType } from "types";

export const calcDelta = (target: ColorType, closest: ColorType) => {
  const distance = Math.sqrt(
    (target.r - closest.r) ** 2 +
      (target.g - closest.g) ** 2 +
      (target.b - closest.b) ** 2
  );
  const delta = (distance / Math.sqrt(3) / 255) * 100;
  return delta;
};

const calcOneColor = (
  gradient: number,
  relativeDist: number,
  divisor: number
) => {
  return Math.round((gradient * relativeDist) / divisor);
};

export const findNewColorOneSrc = (
  source: ColorType,
  length: number,
  distance: number
) => {
  // length can be width or height
  const divisor = length + 1;
  const relativeDist = Math.abs(divisor - distance);
  const newColor: ColorType = {
    r: calcOneColor(source.r, relativeDist, divisor),
    g: calcOneColor(source.g, relativeDist, divisor),
    b: calcOneColor(source.b, relativeDist, divisor),
  };
  return newColor;
};

export const findNewColorMultiSrc = (
  sources: TileType[],
  target: TileType,
  width: number,
  height: number
) => {
  const newColors: ColorType[] = sources.map((source) => {
    let length = source.x === target.x ? width : height;
    let distance =
      source.x === target.x
        ? Math.abs(source.y - target.y)
        : Math.abs(source.x - target.x);
    return findNewColorOneSrc(source.color, length, distance);
  });
  const r = newColors.reduce((acc, cur) => acc + cur.r, 0);
  const g = newColors.reduce((acc, cur) => acc + cur.g, 0);
  const b = newColors.reduce((acc, cur) => acc + cur.b, 0);
  const f = 255 / Math.max(r, g, b, 255);
  const result: ColorType = {
    r: Math.round(r * f),
    g: Math.round(g * f),
    b: Math.round(b * f),
  };
  return result;
};

export const findAllSources = (target: TileType, allSources: TileType[]) => {
  const sources: TileType[] = [];
  for (const source of allSources) {
    const isColored =
      source.color.r !== 0 || source.color.g !== 0 || source.color.b !== 0;
    if (isColored && (source.x === target.x || source.y === target.y)) {
      sources.push(source);
    }
  }
  return sources;
};

export const findNextPrimaryColor = (moved: number) => {
  let newColor: ColorType = {
    r: 0,
    g: 0,
    b: 0,
  };
  switch (moved) {
    case 0:
      newColor.r = 255;
      break;
    case 1:
      newColor.g = 255;
      break;
    case 2:
      newColor.b = 255;
      break;
    default:
      break;
  }
  return newColor;
}

export const initSrcs = (width: number, height: number) => {
  const srcs: TileType[] = [];
  // top
  for (let i = 1; i <= width; i++) {
    const tile: TileType = {
      x: 0,
      y: i,
      color: {
        r: 0,
        g: 0,
        b: 0,
      },
    };
    srcs.push(tile);
  }
  // bottom
  for (let i = 1; i <= width; i++) {
    const tile: TileType = {
      x: height + 1,
      y: i,
      color: {
        r: 0,
        g: 0,
        b: 0,
      },
    };
    srcs.push(tile);
  }
  // left
  for (let i = 1; i <= height; i++) {
    const tile: TileType = {
      x: i,
      y: 0,
      color: {
        r: 0,
        g: 0,
        b: 0,
      },
    };
    srcs.push(tile);
  }
  // right
  for (let i = 1; i <= height; i++) {
    const tile: TileType = {
      x: i,
      y: width + 1,
      color: {
        r: 0,
        g: 0,
        b: 0,
      },
    };
    srcs.push(tile);
  }
  return srcs;
};

export const initTiles = (width: number, height: number) => {
  const tiles: TileType[] = [];
  for (let i = 1; i <= height; i++) {
    for (let j = 1; j <= width; j++) {
      const tile: TileType = {
        x: i,
        y: j,
        color: {
          r: 0,
          g: 0,
          b: 0,
        },
      };
      tiles.push(tile);
    }
  }
  return tiles;
};