import React, { Component } from "react";
import { Route } from "react-router-dom";
import HomeComp from "./pages/HomeComp";
import "./style.css";
import client from "./server";

// Page Components
// import Header from "./components/header/Header";
// import HomePage from "./pages/HomePage";

import { ApploProvider, useQuery, gql } from "@apollo/client";

class App extends Component {
  render() {
    client
      .query({
        query: gql`
          query GetRates {
            rates(currency: "USD") {
              currency
            }
          }
        `,
      })
      .then((result) => console.log(result));

    return (
      <div className="App">
        <HomeComp />
        <h1>This is my ScandiWeb Project</h1>
      </div>
    );
  }
}

export default App;
