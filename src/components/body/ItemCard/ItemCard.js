import React, { PureComponent } from "react";
import "./ItemCard.css";

import { ALL_CATEGORY_SECTION } from "../../../server/queries";
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
      console.log("price", price);
      return price;
    } else {
      let price = prices.find((p) => p.currency.symbol === "$");
      console.log("price", price);

      return price;
    }
  };

  render() {
    // console.log("another one", this.state.symbol);
    console.log("arry of amount", this.state.arr__amount);
    return (
      <Query query={ALL_CATEGORY_SECTION}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.category === undefined) return null;

          // Getting all the infomation about products
          const products = data.category.products;
          console.log(products);
          console.log("array boss", products[0].prices[0]);

          return products.map((item, index) => (
            <Link
              key={index}
              className="ItemCard"
              to={`/details/${item.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img className="item__image" src={item.gallery[0]} />

              <div className="details">
                <p className="item__name">{item.name}</p>
                <div className="price">
                  <Prices
                    getPrice={() => this.getPriceByCurrency(item.prices)}
                    symbol={this.state.symbol}
                  />
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
