import React, { useState, useContext, useCallback, useEffect } from "react";
import Tile from "../components/tile";
import SDialog from "../components/SDialog";
import styled from "styled-components";
import { Context } from "contexts/context";
import GameGrid from "./gameGridView";

const SContainer = styled.div`
  width: fit-content;
  margin: auto;
`;

const SDiv = styled.div`
  margin: 12px;
`;

const SRow = styled.div`
  display: flex;
  margin: 12px 0;

  > span {
    margin: 0 12px;
  }
`;

const GameView: React.FC = () => {
  const { userData, gameData, fetchNewGame, loading } = useContext(Context);
  const { closest, delta } = gameData;
  const [open, setOpen] = useState(false);
  const movesLeft = userData.maxMoves - gameData.moved;
  const isWin = delta < 10;

  const onCloseDialog = () => {
    setOpen(false);
  };

  const onPlayAgain = useCallback(() => {
    fetchNewGame();
    setOpen(false);
  }, [fetchNewGame]);

  useEffect(() => {
    if (movesLeft <= 0 || isWin) {
      setOpen(true);
    }
  }, [movesLeft, isWin, delta]);

  if (loading) {
    return <SDiv>Loading...</SDiv>;
  }

  //TODO: add i18n support
  return  (
    <SContainer>
      <SDiv>
        <b>RGB Alchemy</b>
      </SDiv>
      <SDiv>User ID: {userData.userId} </SDiv>
      <SDiv>Moves left: {movesLeft}</SDiv>
      <SRow>
        <span>Target Color</span>
        <Tile color={userData.target} />
      </SRow>
      <SRow>
        <span>Closest Color</span>
        <Tile color={closest.color} />
        <span>Δ={delta.toFixed(2)}%</span>
      </SRow>
      <GameGrid />
      <SDialog
        open={!loading && open}
        onClose={onCloseDialog}
        onConfirm={onPlayAgain}
        isWin={isWin}
      />
    </SContainer>
  );
};

export default GameView;
