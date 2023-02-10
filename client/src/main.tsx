import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import client from "./gql/client";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
