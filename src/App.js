import React, { Component } from "react";
// import { BrowserRouter, Route } from "react-router-dom";
// import Header from "./components/header/Header";
import { Route } from "react-router-dom";
import HomeComp from "./pages/HomeComp";
// import logo from "./logo.svg";
import "./style.css";
// Page Components
// import Header from "./components/header/Header";
// import HomePage from "./pages/HomePage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeComp />
        <h1>This is my ScandiWeb Project</h1>
      </div>
    );
  }
}

export default App;
