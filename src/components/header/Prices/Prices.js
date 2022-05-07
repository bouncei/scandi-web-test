import React, { PureComponent } from "react";
import "./Prices.css";

export class Prices extends PureComponent {
  render() {
    const { getPrice, symbol } = this.props;

    let price = getPrice();

    return (
      <div className="price">
        <p className="symbol">{symbol}</p>
        <p className="amount">{price.amount}</p>
      </div>
    );
  }
}

export default Prices;
