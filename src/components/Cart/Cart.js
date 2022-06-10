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
import CartAttributes from "./CartAttributes/CartAttributes";
class Cart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      symbol: "",
    };
  }
  removeProductFromCart = (product) => {
    console.log(product);
    this.props.removeProductFromCart(product);
  };

  addProductToCart = (product) => {
    console.log("product", product);
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
    return Math.round(totalPrice * 100) / 100;
  };

  getTax = () => {
    const tax = (this.getTotalPrice() / 100) * 12;
    return Math.round(tax * 10) / 10;
  };

  componentDidMount() {
    this.setState({ symbol: localStorage.getItem("symbol") });
  }
  render() {
    const cartItems = this.props.cart;

    return (
      <div className="cart_component">
        <h1 className="cart__title">Cart</h1>
        <div className="grey-line">
          <hr width="auto" color="#E5E5E5" size="1" />
        </div>
        <div>
          {cartItems.length === 0 && <p className="empty">Cart Is Empty</p>}
        </div>

        {cartItems.map((item, index) => {
          return (
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

                  <CartAttributes {...item} index={index} />
                </div>

                <div className="images_of_item">
                  <div className="activity">
                    <div
                      onClick={() => {
                        this.addProductToCart(item);
                      }}
                      className="activity_button"
                    >
                      +
                    </div>

                    <div className="qty">
                      <span>{item.qty}</span>
                    </div>

                    <div
                      className="activity_button"
                      onClick={() => {
                        this.removeProductFromCart(item);
                      }}
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

              <hr width="auto" color="#E5E5E5" size="1" />
            </div>
          );
        })}

        {/* Cart Arithemetics */}
        <div className="cart__result">
          <div className="tax">
            <div>Tax 21%:</div>
            <p>
              {localStorage.getItem("symbol")
                ? localStorage.getItem("symbol")
                : "$"}
              {this.getTax()}
            </p>
          </div>
          <div className="qty">
            <div>Qty:</div>
            <p>{this.props.totalQty}</p>
          </div>
          <div className="total">
            <div>Total:</div>
            <p>
              {localStorage.getItem("symbol")
                ? localStorage.getItem("symbol")
                : "$"}
              {this.getTotalPrice()}
            </p>
          </div>
        </div>
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
