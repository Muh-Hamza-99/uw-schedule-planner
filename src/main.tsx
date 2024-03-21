import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  styles: {
    global: {
      "#root": {
        maxHeight: "100vh",
      },
    },
  },
  // ...other theme customisations
})

import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
