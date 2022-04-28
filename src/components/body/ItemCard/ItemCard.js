import React, { PureComponent } from "react";
import "./ItemCard.css";
import pixel from "../../../assets/pi.jpg";

export class ItemCard extends PureComponent {
  render() {
    return (
      <div
        onClick={() => {}}
        style={{
          textAlign: "start",
          margin: "20px",
        }}
      >
        <img className="item__image" src={pixel} alt="Pixel Image" />

        <div className="details">
          <p className="item__name">Apollo Running Short</p>
          <p
            className="price"
            style={{
              fontWeight: "bold",
            }}
          >
            $50.00
          </p>
        </div>
      </div>
    );
  }
}

export default ItemCard;
