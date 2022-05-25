import React, { PureComponent } from "react";
// import { Route } from "react-router-dom";
import HomeComp from "./pages/HomeComp";
import "./style.css";
import ProductDetails from "./pages/ProductDetails";

// React-Router-Config

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: new Array(),
    };
  }

  // On Add Functionality to Cart
  // onAdd = (product) => {
  //   const exist = this.state.cartItems.find((p) => p.id === product.id);

  //   if (exist) {
  //     this.setState({
  //       cartItems: this.state.cartItems.map((p) =>
  //         p.id === product.id ? { ...exist, qty: exist.qty + 1 } : p
  //       ),
  //     });
  //   } else {
  //     this.setState({
  //       cartItems: [...this.state.cartItems, { ...product, qty: 1 }],
  //     });
  //   }

  //   // localStorage.setItem("cart", JSON.stringify(this.state.cartItems));
  // };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/:id" element={<HomeComp />}></Route>
            <Route
              path="/cart"
              element={
                <CartPage
                // onAdd={this.onAdd}
                // cartItems={this.state.cartItems}
                />
              }
            ></Route>
            <Route index element={<HomeComp />}></Route>
            <Route
              path="/details/:id"
              element={
                <ProductDetails
                // onAdd={this.onAdd}
                // cartItems={this.state.cartItems}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
