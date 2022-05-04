import React, { Component } from "react";
// import { Route } from "react-router-dom";
import HomeComp from "./pages/HomeComp";
import "./style.css";

// React-Router-Config
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

class App extends Component {
  render() {
    // console.log(client);
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/all" element={<HomeComp />}></Route>
            <Route index element={<HomeComp />}></Route>
            <Route path="/tech"></Route>
          </Routes>
        </BrowserRouter>

        <h1>This is my ScandiWeb Project</h1>
      </div>
    );
  }
}

export default App;
