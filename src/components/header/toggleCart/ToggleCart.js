import React, { PureComponent, createRef } from "react";
import "./ToggleCart.css";
import { connect } from "react-redux";
import {
  removeProductFromCart,
  addProductToCart,
  checkout,
} from "../../../Redux/shop/actions";
import trolley from "../../../pics/trolley.png";
import Prices from "../Prices/Prices";
export class ToggleCart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      symbol: "",
    };
  }

  componentDidMount() {
    this.setState({ symbol: localStorage.getItem("symbol") });
  }

  box = createRef();

  removeFromCart = (product) => {
    this.props.removeProductFromCart(product);
  };

  addToCart = (product) => {
    this.props.addProductToCart(product);
  };

  getTotalPrice = () => {
    const totalPrice = this.props.cart.reduce((acc, item) => {
      if (item.prices && localStorage.getItem("symbol")) {
        let price = item.prices.find(
          (p) => p.currency.symbol === localStorage.getItem("symbol")
        );
        return acc + price.amount * item.qty;
      } else {
        let price = item.prices.find((p) => p.currency.symbol === "$");
        return acc + price.amount * item.qty;
      }
    }, 0);
    // console.log("Total Price in Mini Cart", totalPrice);
    return Math.round(totalPrice * 100) / 100;
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
  render() {
    const { cart } = this.props;
    return (
      <div className="toggle__cart">
        {/* Minit Cart Items */}
        {cart.map((item, index) => (
          <div key={index}>
            <div className="mini-cart-item">
              <div className="mini-cart-item__info">
                <p className="brand">{item.brand}</p>
                <p className="name">{item.name}</p>
                <p className="price_value">
                  <Prices
                    getPrice={() => this.getPriceByCurrency(item.prices)}
                    symbol={this.state.symbol}
                  />
                </p>
                <div className="mini-cart-item__attributes">
                  {item.attributes.map((a) => (
                    <div className="attributes" key={`${item.id} ${a.name}`}>
                      <p className="mini-cart-item__attributes-title">{`${a.name}:`}</p>
                      <div className="mini-cart-item__attributes-list">
                        {a.items.map((item) => (
                          <div key={`${item.id} ${item.id}`}>
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
                                    ? "mini-cart-item__attributes-text_" +
                                      item.selected
                                    : "mini-cart-item__attributes-color_" +
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
              </div>
              <div className="mini-cart-item__right">
                <div className="mini-cart-item__quantity">
                  <div className="btn-plus" onClick={() => this.plusItem(item)}>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="quantity">{item.qty}</div>
                  <div
                    className="btn-minus"
                    onClick={() => this.minusItem(item)}
                  >
                    <span></span>
                  </div>
                </div>
                <div className="mini-cart-item__gallery">
                  <img src={item.gallery[0]} alt="" />
                </div>
              </div>
            </div>
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
  setMiniCartIsOpen: () => dispatch(setMiniCartIsOpen()),
  checkout: () => dispatch(checkout()),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(ToggleCart);
