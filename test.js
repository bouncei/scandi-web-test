import React from "react";
import "./PDP.css";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import DOMPurify from "dompurify";
import { addProductToCart } from "../../Redux/actions";
import { GET_PRODUCT_BY_ID } from "../../GraphQL/queries";

class PDP extends React.Component {
  state = {
    mainPic: "",
    attributes: [],
    warningMessage: "",
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

  setMainPic = (photo) => {
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
    if (isSelected.every((item) => item !== undefined)) {
      const newId = `${product.id} ${isSelected.map((i) => i.id).join(" ")}`;
      const updatedProduct = {
        ...product,
        attributes: this.state.attributes,
        qty: 1,
        id: newId,
      };
      this.props.addProductToCart(updatedProduct);
      this.setState({ warningMessage: "" });
    } else {
      this.setState({ warningMessage: "choose attribute first" });
    }
  };

  render() {
    return (
      <Query
        query={GET_PRODUCT_BY_ID}
        variables={{ id: this.props.match.params.id }}
        onCompleted={(data) =>
          this.setState({ attributes: data.product.attributes })
        }
        fetchPolicy="network-only"
      >
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(":(");
          if (data === undefined) return null;
          const product = data.product;
          const price = this.getPriceByCurrency(product.prices);
          const description = product.description;

          return (
            <div className="product-info">
              <div className="gallery">
                <div className="scroll-area">
                  <div className="gallery_mini-pics">
                    {product.gallery.map((photo) => (
                      <div className="mini-pic" key={photo}>
                        <img
                          src={photo}
                          alt=""
                          onClick={() => this.setMainPic(photo)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="gallery_main-pic">
                  <img
                    src={
                      this.state.mainPic === ""
                        ? product.gallery[0]
                        : this.state.mainPic
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="details">
                <h1 className="brand">{product.brand}</h1>
                <h2 className="name">{product.name}</h2>
                <div className="attributes-all">
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
                <div className="price">
                  <p className="price_title title">PRICE:</p>
                  <p className="price_value">
                    {price.currency.symbol + price.amount}
                  </p>
                </div>
                <div className="add-to-cart">
                  <button
                    className="btn-add"
                    disabled={product.inStock ? false : true}
                    onClick={() => this.addProductToCart(product)}
                  >
                    Add to cart
                  </button>
                  <p className="warning red">{this.state.warningMessage}</p>
                </div>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(description),
                  }}
                />
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
    symbol: state.symbol,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addProductToCart: (product) => dispatch(addProductToCart(product)),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(PDP);
