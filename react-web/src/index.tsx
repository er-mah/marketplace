import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client";

import registerServiceWorker from "./registerServiceWorker";
import App from "./App";
import {client} from "./graphql";


render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();

