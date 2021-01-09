import { Container, ThemeProvider } from "@material-ui/core";
import { theme } from "./muiTheme";
import { BrowserRouter as BrowserRouterProvider } from "react-router-dom";
import { Nav } from "./Nav";
import { Router } from "./Router";

function App() {
  return (
    <BrowserRouterProvider>
      <ThemeProvider theme={theme}>
        <Nav />
        <main style={{ paddingTop: 16 }}>
          <Container>
            <Router />
          </Container>
        </main>
      </ThemeProvider>
    </BrowserRouterProvider>
  );
}

export default App;
