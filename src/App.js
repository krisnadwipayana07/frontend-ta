import { BrowserRouter, Routes, Route } from "react-router-dom";
import { pageRoutes } from "./routes/Routes";
import { ThemeProvider } from "@emotion/react";
import { createTheme, responsiveFontSizes } from "@mui/material";
import GeneralContextProvider from "./context/GeneralContext";
import Authorize from "./middlewares/Authorize";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  let theme = createTheme({});
  theme = responsiveFontSizes(theme);
  return (
    <div className="App">
      <BrowserRouter basename="/admin">
        <GeneralContextProvider>
          <ThemeProvider theme={theme}>
            <Routes>
              {pageRoutes.map((item, index) =>
                item.isProtected ? (
                  <Route element={<Authorize />}>
                    <Route
                      path={item.link}
                      element={<item.component />}
                      key={`routes-${index}`}
                    />
                  </Route>
                ) : (
                  <Route
                    path={item.link}
                    element={<item.component />}
                    key={`routes-${index}`}
                  />
                )
              )}
            </Routes>
          </ThemeProvider>
        </GeneralContextProvider>
      </BrowserRouter>
      {/* <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<}>

          </Route>
        </Routes>
      </ChakraProvider>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
