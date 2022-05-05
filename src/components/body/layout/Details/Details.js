import { Query } from "@apollo/client/react/components";
import React, { PureComponent } from "react";
import "./Details.css";
import { GET_PRODUCTS_BY_ID } from "../../../../server/queries";
import cartImg from "../../../../assets/cart.png";
import Attributes from "../../Attributes/Attributes";
import Home from "../Home/Home";

export class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mainPic: "",
      attributes: [],
      warningMessage: "",
    };
  }

  setMainPic = (photo) => {
    this.setState({ mainPic: photo });
  };

  render() {
    return (
      <Query
        query={GET_PRODUCTS_BY_ID}
        variables={{ id: window.location.pathname.slice(9) }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.product === undefined) return null;

          const product = data.product;
          //   const price = ...

          console.log("product", product);

          return (
            <div className="details">
              {/* Images Section */}
              <div className="images__section">
                <div className="SmallImg">
                  {product.gallery.map((item, index) => (
                    <img className="iSmall" src={item} />
                  ))}
                </div>
                <img src={product.gallery[0]} className="LargeImg" />
              </div>

              {/* Cart Details Section */}
              <div className="cart__details">
                <h2 className="product__name">{product.name}</h2>
                <p className="product__brand">{product.brand}</p>
                <br />

                <div className="attributes">
                  {product.attributes.map((item, index) => (
                    <Attributes attributes={item} />
                  ))}
                </div>

                <div className="price">
                  <div className="label">PRICE:</div>

                  {/* I've to Implement a new class component as I did for Attribute above */}
                  <div className="amount">{product.prices.amount}</div>
                </div>

                <div className="add_to_cart">ADD TO CART</div>

                <div className="descripton">{product.description}</div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Details;
