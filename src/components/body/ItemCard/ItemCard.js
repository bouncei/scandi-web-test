import React, { PureComponent } from "react";
import "./ItemCard.css";
import pixel from "../../../assets/pi.jpg";
import { ALL_CATEGORY_SECTION } from "../../../server/queries";
import { Query } from "@apollo/client/react/components";
import { Link } from "react-router-dom";
import { throwServerError } from "@apollo/client";

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

  render() {
    console.log("another one", this.state.symbol);
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
                  <p className="symbol">{this.state.symbol}</p>
                  <p className="amount">
                    {item.prices.map((i, index) => {
                      {
                        localStorage.getItem("symbol") === i.currency.symbol ? (
                          <p>{i.amount}</p>
                        ) : (
                          console.log("Not yet boss")
                        );
                      }
                    })}
                  </p>
                  <p className="amount"> </p>
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
