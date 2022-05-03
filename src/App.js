import React, { Component } from "react";
import { Route } from "react-router-dom";
import HomeComp from "./pages/HomeComp";
import "./style.css";

import client from "./server";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import ExchangeRates from "./server/ExchangeRates";

const CurrencyNames = gql`
  {
    categories {
      name
    }
  }
`;
// import ExchangeRate from "./server/ExchangeRate";

class App extends Component {
  render() {
    console.log(client);
    return (
      <div className="App">
        <HomeComp />
        <h1>This is my ScandiWeb Project</h1>
        <ExchangeRates />
      </div>
    );
  }
}

export default App;
