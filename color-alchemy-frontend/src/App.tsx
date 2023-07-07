import React from "react";
import MainView from "./views/mainView";
import { ThemeProvider, THEME_ID, createTheme } from "@mui/material/styles";
import ContextProvider from "./contexts/context";

const theme = createTheme({});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={{ [THEME_ID]: theme }}>
      <ContextProvider>
          <MainView />
      </ContextProvider>
    </ThemeProvider>
  );
};

export default App;
