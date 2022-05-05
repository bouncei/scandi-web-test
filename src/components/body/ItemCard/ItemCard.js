import React, { PureComponent } from "react";
import "./ItemCard.css";
import pixel from "../../../assets/pi.jpg";
import { ALL_CATEGORY_SECTION } from "../../../server/queries";
import { Query } from "@apollo/client/react/components";
import { Link } from "react-router-dom";

class ItemCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
    };
  }

  handleClick() {
    // alert("Page routing");
    return <Link to="/details">Hello mate</Link>;
  }

  render() {
    return (
      <Query query={ALL_CATEGORY_SECTION}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.category === undefined) return null;

          // Getting all the infomation about products
          const products = data.category.products;
          console.log(products);
          console.log("amount", products[0].prices[0].amount);

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
                <p
                  className="price"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  <div className="symbol"></div>
                  <div className="amount">{item.prices.amount}</div>
                </p>
              </div>
            </Link>
          ));
        }}
      </Query>
    );
  }
}

export default ItemCard;
