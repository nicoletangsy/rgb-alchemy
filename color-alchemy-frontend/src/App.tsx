import React from "react";
import GameView from "./views/mainView";
import { ThemeProvider, THEME_ID, createTheme } from "@mui/material/styles";
import ContextProvider from "./contexts/context";

const theme = createTheme({});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={{ [THEME_ID]: theme }}>
      <ContextProvider>
          <GameView />
      </ContextProvider>
    </ThemeProvider>
  );
};

export default App;
