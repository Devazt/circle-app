import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraBaseProvider } from "@chakra-ui/react";
import theme from "./styles/theme.ts";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/rootReducer.ts";
import "@fontsource-variable/montserrat";
import "@fontsource/righteous";

const queryClient = new QueryClient();
const store = configureStore({
  reducer: rootReducer,
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Provider store={store}>
          <App />
          </Provider>
        </Router>
      </QueryClientProvider>
    </ChakraBaseProvider>
  </React.StrictMode>
);
