import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraBaseProvider } from "@chakra-ui/react";
import theme from "./styles/theme.ts";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <ChakraBaseProvider theme={theme}>
        <App />
      </ChakraBaseProvider>
    </Router>
  </React.StrictMode>
);
