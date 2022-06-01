import { Query } from "@apollo/client/react/components";
import React, { PureComponent } from "react";
import "./Details.css";
import { GET_PRODUCTS_BY_ID } from "../../../../server/queries";
// import cartImg from "../../../../assets/cart.png";
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

  handleOnChange = ({ target }) => {
    const { attributes } = this.state;
    const nextState = attributes.map((a) => {
      if (a.name !== target.name) return a;

      return {
        ...a,
        items: a.items.map((item) => {
          const checked = item.value === target.value;
          // console.log("check", checked);

          return {
            ...item,
            selected: checked,
          };
        }),
      };
    });

    this.setState({
      attributes: nextState,
      warningMessage: "",
    });
  };

  addProductToCart = (product) => {
    const isSelected = this.state.attributes.map((a) =>
      a.items.find((i) => i.selected === true)
    );
    //testintg whether all elements in the isSellected array is not undefined
    if (isSelected.every((item) => item !== undefined)) {
      console.log("id check", isSelected.map((i) => i.id).join(" "));
      const newId = `${product.id} ${isSelected.map((i) => i.id).join(" ")}`;
      const updatedProduct = {
        ...product,
        attributes: this.state.attributes,
        qty: 1,
        id: newId,
      };

      console.log("updated item", updatedProduct);
      this.props.addProductToCart(updatedProduct);
      this.setState({ warningMessage: "" });
    } else {
      this.setState({ warningMessage: "Choose attribute first!" });
    }
  };

  render() {
    // const { onAdd, cartItems } = this.props;
    return (
      <Query
        query={GET_PRODUCTS_BY_ID}
        variables={{ id: window.location.pathname.slice(9) }}
        onCompleted={(data) =>
          this.setState({ attributes: data.product.attributes })
        }
        fetchPolicy="network-only"
      >
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.product === undefined) return null;

          const product = data.product;
          const price = this.getPriceByCurrency(product.prices);
          const description = product.description;
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

                <div className="attributes-all">
                  {/* product.attributes.map((item, index) => (
                    <Attributes
                      attributes={item}
                      product={product}
                      func={this.handleOnChange}
                    />
                  ))*/}

                  {product.attributes.map((a) => (
                    <div className="attributes" key={`${product.id} ${a.id}`}>
                      <p className="attributes__title title">{`${a.name}:`}</p>
                      <div className="attributes__list">
                        {a.items.map((item, i) => (
                          <div key={`${product.id} ${item.id}`}>
                            <input
                              type="radio"
                              id={`${a.id} ${item.id}`}
                              name={a.name}
                              value={item.value}
                              disabled={product.inStock ? false : true}
                              checked={item.selected}
                              onChange={this.handleOnChange}
                            />
                            <label htmlFor={`${a.id} ${item.id}`}>
                              <div
                                className={
                                  a.type !== "swatch"
                                    ? "attributes__text"
                                    : "attributes__color"
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

                <div className="details_price">
                  <div className="label">PRICE:</div>

                  {/* I've to Implement a new class component as I did for Attribute above */}
                  <div className="price__tag">
                    <div className="symbol">{price.currency.symbol}</div>
                    <div className="amount">{price.amount}</div>
                  </div>
                </div>

                <div className="button-block">
                  <div
                    onClick={() => {
                      this.addProductToCart(product);
                    }}
                    className="add_to_cart"
                  >
                    ADD TO CART
                  </div>
                  <p className="warning red">{this.state.warningMessage}</p>
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
