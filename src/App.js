import styled, { ThemeProvider } from "styled-components";
import {darkTheme,lightTheme} from "./utils/Themes";
import Navbar from "./components/Navbar";
import { BrowserRouter, Router } from "react-router-dom";

function App() {
  return <ThemeProvider theme={darkTheme}>
    <BrowserRouter>
      <Navbar/>
    </BrowserRouter>
  </ThemeProvider>
}

export default App;
