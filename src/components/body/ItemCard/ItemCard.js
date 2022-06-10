import React, { PureComponent } from "react";
import "./ItemCard.css";
import { connect } from "react-redux";
import { addProductToCart } from "../../../Redux/shop/actions";

import { GET_PRODUCTS_BY_CATEGORY } from "../../../server/queries";
import { Query } from "@apollo/client/react/components";
import { Link } from "react-router-dom";
import Prices from "../../header/Prices/Prices";
import { ReactComponent as CartIcon } from "../../../pics/green-cart-icon.svg";

class ItemCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      symbol: "",
    };
  }

  addToCart = (product) => {
    let updatedProduct = {};
    if (product.attributes.length === 0) {
      updatedProduct = {
        ...product,
        qty: 1,
        id: `${product.id} `,
      };
      this.props.addProductToCart(updatedProduct);
    } else {
      const updatedAttributes = product.attributes.map((a) => {
        return {
          ...a,
          items: a.items.map((item, index) => {
            return index === 0
              ? { ...item, selected: true }
              : { ...item, selected: false };
          }),
        };
      });
      const selectedAttribute = updatedAttributes.map((a) =>
        a.items.find((i) => i.selected === true)
      );
      updatedProduct = {
        ...product,
        attributes: updatedAttributes,
        qty: 1,
        id: `${product.id} ${selectedAttribute.map((i) => i.id).join(" ")}`,
      };
      this.props.addProductToCart(updatedProduct);
      window.location.replace("/cart");
    }
    console.log("Add to cart function", product);
  };

  componentDidMount() {
    this.setState({ symbol: localStorage.getItem("symbol") });
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

  render() {
    return (
      <Query
        key={"yes"}
        query={GET_PRODUCTS_BY_CATEGORY}
        variables={{ input: { title: window.location.pathname.slice(1) } }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.category === undefined) return null;

          // Getting all the infomation about products
          const products = data.category.products;

          return products.map((item, index) => (
            <Link
              key={index}
              className={`ItemCard ${!item.inStock && "disable"}`}
              to={`/details/${item.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className={`item_container ${!item.inStock && "stockImg"}`}>
                <div className="imgContainer">
                  <img
                    className={`item__image `}
                    src={item.gallery[0]}
                    style={{
                      borderRadius: "8px",
                      maxWidth: "100%",
                      aspectRatio: "1 / 1",
                    }}
                  />
                  {!item.inStock && <div className="stock">OUT OF STOCK</div>}
                </div>

                <div className="green-cart">
                  <CartIcon onClick={() => this.addToCart(item)} />
                </div>

                <div className="details">
                  <p className="item__name">{item.name}</p>
                  <div className="price">
                    <Prices
                      getPrice={() => this.getPriceByCurrency(item.prices)}
                      symbol={this.state.symbol}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ));
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

export default functionFromConnect(ItemCard);
