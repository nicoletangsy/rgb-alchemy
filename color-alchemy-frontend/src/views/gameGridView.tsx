import React, { useContext } from "react";
import styled from "styled-components";
import Tile from "../components/tile";
import { Context } from "contexts/context";
import { findNextPrimaryColor } from "utils";

const SGameGrid = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 12px;
`;

const SRow = styled.div`
  display: flex;
`;

const GameGrid: React.FC = () => {
  const { userData, colorSources, gameData, draggingTile, setLastSrc, setDraggingTile } =
    useContext(Context);
  const { height, width } = userData;
  const { tiles, moved, closest } = gameData;
  const clickable = moved < 3;
  const draggable = moved >= 3;
  const nextPrimaryColor = findNextPrimaryColor(moved);

  const Rows = [];
  Rows.push(
    <SRow key={0}>
      {colorSources
        .filter((tile) => tile.x === 0)
        .map((tile, i) => {
          return (
            <Tile
              key={i}
              color={tile.color}
              shape="circle"
              clickable={clickable}
              onClick={() => {
                const newLastSrc = {
                  x: tile.x,
                  y: tile.y,
                  color: nextPrimaryColor,
                };
                setLastSrc(newLastSrc);
              }}
              draggable={false}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (draggingTile) {
                  const newLastSrc = {
                    x: tile.x,
                    y: tile.y,
                    color: draggingTile?.color,
                  };
                  setLastSrc(newLastSrc);
                  setDraggingTile(null);
                }
              }}
            />
          );
        })}
    </SRow>
  );
  for (let i = 1; i <= height; i++) {
    const rowData = [];
    const leftSource = colorSources.find(
      (tile) => tile.x === i && tile.y === 0
    );
    const rightSource = colorSources.find(
      (tile) => tile.x === i && tile.y === width + 1
    );
    if (leftSource) {
      rowData.push(
        <Tile
          key={0}
          color={leftSource.color}
          shape="circle"
          clickable={clickable}
          onClick={() => {
            const newLastSrc = {
              x: leftSource.x,
              y: leftSource.y,
              color: nextPrimaryColor,
            };
            setLastSrc(newLastSrc);
          }}
          draggable={false}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (draggingTile) {
              const newLastSrc = {
                x: leftSource.x,
                y: leftSource.y,
                color: draggingTile?.color,
              };
              setLastSrc(newLastSrc);
              setDraggingTile(null);
            }
          }}
        />
      );
    }
    for (let j = 1; j <= width; j++) {
      const tile = tiles.find((tile) => tile.x === i && tile.y === j);
      if (tile) {
        const isClosest = closest.x === i && closest.y === j;
        rowData.push(
          <Tile
            key={j}
            color={tile.color}
            shape="square"
            isClosest={isClosest}
            clickable={false}
            draggable={draggable}
            onDrag={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDraggingTile(tile);
            }}
          />
        );
      }
    }
    if (rightSource) {
      rowData.push(
        <Tile
          key={width + 1}
          color={rightSource.color}
          shape="circle"
          clickable={clickable}
          onClick={() => {
            const newLastSrc = {
              x: rightSource.x,
              y: rightSource.y,
              color: nextPrimaryColor,
            };
            setLastSrc(newLastSrc);
          }}
          draggable={false}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (draggingTile) {
              const newLastSrc = {
                x: rightSource.x,
                y: rightSource.y,
                color: draggingTile?.color,
              };
              setLastSrc(newLastSrc);
              setDraggingTile(null);
            }
          }}
        />
      );
    }
    Rows.push(<SRow key={i}>{rowData}</SRow>);
  }
  Rows.push(
    <SRow key={height + 1}>
      {colorSources
        .filter((tile) => tile.x === height + 1)
        .map((tile, i) => (
          <Tile
            key={i}
            color={tile.color}
            shape="circle"
            clickable={clickable}
            onClick={() => {
              const newLastSrc = {
                x: tile.x,
                y: tile.y,
                color: nextPrimaryColor,
              };
              setLastSrc(newLastSrc);
            }}
            draggable={false}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (draggingTile) {
                const newLastSrc = {
                  x: tile.x,
                  y: tile.y,
                  color: draggingTile?.color,
                };
                setLastSrc(newLastSrc);
                setDraggingTile(null);
              }
            }}
          />
        ))}
    </SRow>
  );

  return <SGameGrid>{Rows}</SGameGrid>;
};

export default GameGrid;
