import React, { DragEvent } from "react";
import { ColorType } from "types";
import styled from "styled-components"; //nictodo: fix styled-components macro
import Tooltip from "@mui/material/Tooltip";

export interface TileProps {
  color: ColorType;
  shape?: "circle" | "square";
  isClosest?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  draggable?: boolean;
  onDrag?: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: DragEvent<HTMLDivElement>) => void;
}

const StyledTile = styled.div<{
  $color: ColorType;
  $isCircle: boolean;
  $isPointer: boolean;
  $isClosest: boolean;
}>`
  width: 24px;
  height: 24px;
  background-color: ${({$color}) =>
    `rgb(${$color.r}, ${$color.g}, ${$color.b})`};
  border-radius: ${({ $isCircle }) => ($isCircle ? `50%` : `2px`)};
  border: 2px solid ${({ $isClosest }) => ($isClosest ? `#ff0000` : `#c0c0c0`)};
  cursor: ${({ $isPointer }) => ($isPointer ? `pointer` : `default`)};
  margin: 1px;
`;

const Tile: React.FC<TileProps> = ({
  color,
  shape = "square",
  isClosest = false,
  clickable = false,
  onClick = () => {},
  draggable = false,
  onDrag = () => {},
  onDragOver = () => {},
  onDrop = () => {},
}) => {
  const isCircle = shape === "circle";
  const tooltipText = `${color.r}, ${color.g}, ${color.b}`;
  
  return (
    <Tooltip title={tooltipText}>
      <StyledTile
        $color={color}
        $isCircle={isCircle}
        $isPointer={clickable || draggable}
        $isClosest={isClosest}
        onClick={onClick}
        draggable={draggable}
        onDrag={onDrag}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
    </Tooltip>
  );
};

export default Tile;
