import React, { Component } from "react";
// import { Route } from "react-router-dom";
import HomeComp from "./pages/HomeComp";
import "./style.css";
import ProductDetails from "./pages/ProductDetails";

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
            <Route path="/:id" element={<HomeComp />}></Route>
            <Route path="/tech" element={<HomeComp />}></Route>
            <Route path="/clothes" element={<HomeComp />}></Route>

            <Route index element={<HomeComp />}></Route>
            <Route path="/details/:id" element={<ProductDetails />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
