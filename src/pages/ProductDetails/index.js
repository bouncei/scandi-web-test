import React, { PureComponent } from "react";
import Details from "../../components/body/layout/Details/Details";
import Header from "../../components/header/Header";

export class ProductDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onAdd, cartItems } = this.props;
    return (
      <>
        {/* Product Details Page */}
        <Header />
        <Details onAdd={onAdd} cartItems={cartItems} />
        <div></div>
      </>
    );
  }
}

export default ProductDetails;
