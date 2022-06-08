import React, { PureComponent } from "react";
import "./Cart.css";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../Redux/shop/actions";
import { checkout } from "../../Redux/shop/actions";
import { connect } from "react-redux";
import Prices from "../header/Prices/Prices";
import { Link } from "react-router-dom";
class Cart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      symbol: "",
    };
  }
  removeProductFromCart = (product) => {
    this.props.removeProductFromCart(product);
  };

  addProductToCart = (product) => {
    this.props.addProductToCart(product);
  };

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

  componentDidMount() {
    this.setState({ symbol: localStorage.getItem("symbol") });
  }
  render() {
    const cartItems = this.props.cart;
    console.log("cart Items", cartItems);

    // let originId = cartItems.id.split(" ");
    return (
      <div className="cart_component">
        <h1 className="cart__title">Cart</h1>
        <div className="grey-line">
          <hr />
        </div>
        <div>
          {cartItems.length === 0 && <p className="empty">Cart Is Empty</p>}
        </div>

        {cartItems.map((item) => (
          <div key={item.id}>
            <div className="cart_item">
              {/* Left Hand side Details */}
              <div className="details_of_item">
                <Link
                  to={`/details/${item.id.split(" ")[0]}`}
                  style={{ color: "black", textDecorationLine: "none" }}
                >
                  <h2 className="product__name">{item.name}</h2>
                  <p className="product__brand">{item.brand}</p>
                </Link>
                <div className="price">
                  <Prices
                    getPrice={() => this.getPriceByCurrency(item.prices)}
                    symbol={this.state.symbol}
                  />
                </div>

                {item.attributes.map((a) => (
                  <div className="attributes" key={`${id} ${a.name}`}>
                    <p className="cart-item__attributes-title attributes__title title">{`${a.name}:`}</p>
                    <div className="attributes__list">
                      {a.items.map((item) => (
                        <div key={`${id} ${item.id}`}>
                          <input
                            type="radio"
                            id={`${a.id} ${item.id}`}
                            name={a.name + index}
                            value={item.value}
                          />
                          <label htmlFor={`${a.id} ${item.id}`}>
                            <div
                              className={
                                a.type !== "swatch"
                                  ? "attributes__text cart-item__attributes-text_" +
                                    item.selected
                                  : "attributes__color cart-item__attributes-color_" +
                                    item.selected
                              }
                              style={
                                a.type === "swatch"
                                  ? {
                                      background: item.value,
                                      border: `1px solid ${
                                        item.id === "White"
                                          ? "black"
                                          : item.value
                                      }`,
                                    }
                                  : null
                              }
                            >
                              {a.type === "swatch" ? "" : item.value}
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="images_of_item">
                <div className="activity">
                  <div
                    onClick={() =>
                      // onAdd(item)
                      {}
                    }
                    className="activity_button"
                  >
                    +
                  </div>

                  <div className="qty">
                    <span>{item.qty}</span>
                  </div>

                  <div
                    className="activity_button"
                    onClick={() =>
                      // onRemove(item)
                      {}
                    }
                  >
                    -
                  </div>
                </div>
                {/* Add Image Slider */}
                <div className="image_slider">
                  <img
                    src={item.gallery[0]}
                    alt="item_image"
                    className="item_image"
                    style={{
                      borderRadius: "8px",
                      maxWidth: "100%",
                      aspectRatio: "1 / 1",
                    }}
                  />
                </div>
                <img />
              </div>
            </div>

            <hr />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    totalQty: state.shop.totalQty,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeProductFromCart: (product) => dispatch(removeProductFromCart(product)),
  addProductToCart: (product) => dispatch(addProductToCart(product)),
  checkout: () => dispatch(checkout()),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(Cart);
