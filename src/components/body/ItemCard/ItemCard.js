import React, { PureComponent } from "react";
import "./ItemCard.css";

import {
  ALL_CATEGORY_SECTION,
  GET_PRODUCTS_BY_CATEGORY,
} from "../../../server/queries";
import { Query } from "@apollo/client/react/components";
import { Link } from "react-router-dom";
import Prices from "../../header/Prices/Prices";

class ItemCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      symbol: "",
    };
  }

  componentDidMount() {
    this.setState({ symbol: localStorage.getItem("symbol") });
  }

  getPriceByCurrency = (prices) => {
    if (prices && localStorage.getItem("symobol")) {
      let price = prices.find(
        (p) => p.currency.symbol == localStorage.getItem("symbol")
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

export default ItemCard;
