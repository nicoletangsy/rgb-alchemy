import React, { useContext, DragEvent } from "react";
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
  const {
    gameData,
    draggingTile,
    setLastSrc,
    setDraggingTile,
    gameGrid,
  } = useContext(Context);
  const { moved, closest } = gameData;
  const nextPrimaryColor = findNextPrimaryColor(moved);

  return (
    <SGameGrid>
      {gameGrid.map((row, rowIndex) => {
        return (
          <SRow key={rowIndex}>
            {row.map((tile, tileIndex) => {
              const shape = tile.isSource ? "circle" : "square";
              const clickable = tile.isSource && moved < 3;
              const draggable = !tile.isSource && moved >= 3;
              const isClosest = closest.x === tile.x && closest.y === tile.y;
              const onClick = () => {
                const newLastSrc = {
                  x: tile.x,
                  y: tile.y,
                  color: nextPrimaryColor,
                };
                setLastSrc(newLastSrc);
              };
              const onDrag = (e: DragEvent<HTMLDivElement>) => {
                if (draggable) {
                  e.preventDefault();
                  e.stopPropagation();
                  setDraggingTile(tile);
                }
              };
              const onDragOver = (e: DragEvent<HTMLDivElement>) => {
                e.preventDefault();
              };
              const onDrop = (e: DragEvent<HTMLDivElement>) => {
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
              };
              return (
                <Tile
                  key={tileIndex}
                  color={tile.color}
                  shape={shape}
                  clickable={clickable}
                  draggable={draggable}
                  isClosest={isClosest}
                  onClick={onClick}
                  onDrag={onDrag}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                />
              );
            })}
          </SRow>
        );
      })}
    </SGameGrid>
  );
};

export default GameGrid;
