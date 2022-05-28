import React, { PureComponent } from "react";
import "./Cart.css";
import { addProductToCart } from "../../Redux/shop/actions";
import { removeProductFromCart } from "../../Redux/shop/actions";
import { checkout } from "../../Redux/shop/actions";
import { connect } from "react-redux";
export class Cart extends PureComponent {
  render() {
    // const { cartItems, onAdd, onRemove } = this.props;

    console.log("passed props", cartItems);
    return (
      <div className="cart_component">
        <h2>Cart Items</h2>
        <div>
          {cartItems.length === 0 && <p className="empty">Cart Is Empty</p>}
        </div>

        {cartItems.map((item) => (
          <div className="cart_item" key={item.id}>
            {/* Left Hand side Details */}
            <div className="details_of_item">
              <h2 className="product__name">{item.name}</h2>
              <p className="product__brand">{item.brand}</p>
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
              <img />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    symbol: state.symbol,
    cart: state.cart,
    totalQty: state.totalQty,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeProductFromCart: (product) => dispatch(removeProductFromCart(product)),
  addProductToCart: (product) => dispatch(addProductToCart(product)),
  checkout: () => dispatch(checkout()),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(Cart);
