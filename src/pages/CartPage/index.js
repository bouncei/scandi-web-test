import React, { PureComponent } from "react";
import Cart from "../../components/Cart/Cart";
import Header from "../../components/header/Header";

export class CartPage extends PureComponent {
  render() {
    return (
      <>
        <Header />
        <Cart />
      </>
    );
  }
}

export default CartPage;
