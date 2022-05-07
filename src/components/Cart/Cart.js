import React, { PureComponent } from "react";
import "./Cart.css";

export class Cart extends PureComponent {
  render() {
    const { cartItems } = this.props;

    console.log("passed props", cartItems);
    return (
      <div className="cart_component">
        <h2>Cart Items</h2>
        <div>
          {cartItems.length === 0 && <p className="empty">Cart Is Empty</p>}
        </div>
      </div>
    );
  }
}

export default Cart;
