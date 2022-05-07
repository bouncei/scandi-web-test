import React, { PureComponent } from "react";
import Details from "../../components/body/layout/Details/Details";
import Header from "../../components/header/Header";

export class ProductDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onAdd, cartItems } = thos.props;
    return (
      <>
        {/* Product Details Page */}
        <Header />
        <Details />
        <div></div>
      </>
    );
  }
}

export default ProductDetails;
