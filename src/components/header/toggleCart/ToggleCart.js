import React, { PureComponent } from "react";
import "./ToggleCart.css";

export class ToggleCart extends PureComponent {
  // Toggle Drop Down of the Current Cart Details
  render() {
    return (
      <div className="toggle__cart">
        <div className="item">Cart Details</div>
        <div className="item">Cart Details</div>
        <div className="item">Cart Details</div>
        <div className="item">Cart Details</div>
      </div>
    );
  }
}

export default ToggleCart;
