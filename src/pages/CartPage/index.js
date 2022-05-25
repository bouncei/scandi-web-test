import React, { PureComponent } from "react";
import Cart from "../../components/Cart/Cart";
import Header from "../../components/header/Header";

export class CartPage extends PureComponent {
  render() {
    // const { onAdd, cartItems } = this.props;
    return (
      <>
        <Header />
        <Cart
        // cartItems={cartItems}
        // onAdd={onAdd}
        />
      </>
    );
  }
}

export default CartPage;
