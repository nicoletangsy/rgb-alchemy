import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Tile from "components/tile";
import demo from "assets/demo.gif";

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 12px;
`;

const SList = styled.ol`
  max-width: 600px;

  > li {
    margin: 4px 0;
  }
`;

const DemoGif = styled.img``;

const InstructionView: React.FC<{
  onClickStartGame: () => void;
}> = ({ onClickStartGame }) => {
  //TODO: add i18n support
  return (
    <SContainer>
      <h1>Game Instructions</h1>
      <h2>Game Goal</h2>
      <p>Mix and match colors to create new colors in limited moves</p>
      <h2>How to Play</h2>
      <SList>
        <li>
          For the first 3 moves, click on the color source (the circle tiles).
          <br />
          The color source will be the primary color:
          <div>
            <Tile color={{ r: 255, g: 0, b: 0 }} />
            Red (255, 0, 0)
          </div>
          <div>
            <Tile color={{ r: 0, g: 255, b: 0 }} />
            Green (0, 255, 0)
          </div>
          <div>
            <Tile color={{ r: 0, g: 0, b: 255 }} />
            Blue (0, 0, 255)
          </div>
          The first click will place red color source, the second click will
          place green color source and the third click will place blue color
          source.
        </li>
        <li>
          After the first 3 moves, drag any square tiles to color source to mix
          new colors.
          <DemoGif src={demo} />
        </li>
        <li>
          You win the game if you can match exactly the target color or color
          difference less than 10% in limited moves
        </li>
      </SList>
      <Button variant="outlined" onClick={onClickStartGame}>
        Start Game
      </Button>
    </SContainer>
  );
};

export default InstructionView;
