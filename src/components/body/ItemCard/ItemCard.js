import React, { PureComponent } from "react";
import "./ItemCard.css";
import pixel from "../../../assets/pi.jpg";
import { ALL_CATEGORY_SECTION } from "../../../server/queries";
import { Query } from "@apollo/client/react/components";

class ItemCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
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

          return products.map((item, index) => (
            <div className="ItemCard" onClick={() => {}}>
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
            </div>
          ));
        }}
      </Query>
    );
  }
}

export default ItemCard;
