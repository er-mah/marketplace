import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client";

import registerServiceWorker from "./registerServiceWorker";
import App from "./App";
import {client} from "./apollo";


render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();

