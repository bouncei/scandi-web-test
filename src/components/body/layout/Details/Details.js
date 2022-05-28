import { Query } from "@apollo/client/react/components";
import React, { PureComponent } from "react";
import "./Details.css";
import { GET_PRODUCTS_BY_ID } from "../../../../server/queries";
// import cartImg from "../../../../assets/cart.png";
import Attributes from "../../Attributes/Attributes";
import { connect } from "react-redux";
import { addProductToCart } from "../../../../Redux/shop/actions";

export class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mainPic: "",
      attributes: [],
      warningMessage: "",
    };
  }

  getPriceByCurrency = (prices) => {
    if (prices && localStorage.getItem("symbol")) {
      let price = prices.find(
        (p) => p.currency.symbol === localStorage.getItem("symbol")
      );
      return price;
    } else {
      let price = prices.find((p) => p.currency.symbol === "$");
      return price;
    }
  };

  setMainPic = (photo) => {
    // alert("accepted image");
    this.setState({ mainPic: photo });
  };

  handleOnChange = ({ attr }) => {
    const attributes = this.state.attributes;

    const nextState = attributes.map((item) => {
      if (item.id !== attr.name) return item;
      return {
        ...item,
        items: item.items.map((i) => {
          const checked = i.value === attr.value;
          return {
            ...i,
            selected: checked,
          };
        }),
      };
    });

    this.setState({
      attributes: nextState,
      warningMessage: "",
    });

    console.log(this.state.attributes);
  };

  render() {
    // const { onAdd, cartItems } = this.props;
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

          const price = this.getPriceByCurrency(product.prices);

          // console.log("Cart Items", cartItems);

          return (
            <div className="detailed_details">
              {/* Images Section */}
              <div className="images__section">
                <div className="SmallImg">
                  {product.gallery.map((item, index) => (
                    <img
                      key={item.id}
                      className="iSmall"
                      onClick={() => this.setMainPic(item)}
                      src={item}
                    />
                  ))}
                </div>
                <img
                  src={
                    this.state.mainPic ? this.state.mainPic : product.gallery[0]
                  }
                  className="LargeImg"
                />
              </div>

              {/* Cart Details Section */}
              <div className="cart__details">
                <h2 className="product__name">{product.name}</h2>
                <p className="product__brand">{product.brand}</p>
                <br />

                <div className="attributes">
                  {product.attributes.map((item, index) => (
                    <Attributes
                      attributes={item}
                      product={product}
                      func={this.handleOnChange}
                    />
                  ))}
                </div>

                <div className="details_price">
                  <div className="label">PRICE:</div>

                  {/* I've to Implement a new class component as I did for Attribute above */}
                  <div className="price__tag">
                    <div className="symbol">{price.currency.symbol}</div>
                    <div className="amount">{price.amount}</div>
                  </div>
                </div>

                <div
                  onClick={() => {
                    onAdd(product);
                  }}
                  className="add_to_cart"
                >
                  ADD TO CART
                </div>

                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addProductToCart: (product) => dispatch(addProductToCart(product)),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(Details);
