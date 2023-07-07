import React from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";

const SContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeView: React.FC<{
    onClickStartGame: () => void;
    onClickInstruction: () => void;
}> = ({
    onClickStartGame,
    onClickInstruction
}) => {
    return (
        <SContainer>
      <Button
        variant="outlined"
        onClick={onClickStartGame}
        sx={{ marginRight: "12px" }}
      >
        Start Game
      </Button>
      <Button variant="outlined" onClick={onClickInstruction}>
        Instruction
      </Button>
    </SContainer>
    )
}

export default HomeView;