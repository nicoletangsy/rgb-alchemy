import React, { useCallback, useState } from "react";
import HomeView from "./homeView";
import GameView from "./gameView";
import InstructionView from "./instructionView";
import { PageType } from "types";

const MainView: React.FC = () => {
  const [page, setPage] = useState<PageType>("home"); //TODO: use react-router

  const onClickStartGame = useCallback(() => {
    setPage("game");
  }, []);

  const onClickInstruction = useCallback(() => {
    setPage("instruction");
  }, []);

  return page === "home" ? (
    <HomeView onClickStartGame={onClickStartGame} onClickInstruction={onClickInstruction}/>
  ) : page === "instruction" ? (
    <InstructionView onClickStartGame={onClickStartGame}/>
  ) : page === "game" ? (
    <GameView />
  ) : (
    <div>Loading...</div>
  );
};

export default MainView;
