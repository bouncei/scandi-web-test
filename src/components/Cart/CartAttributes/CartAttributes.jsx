import React, { PureComponent } from "react";
import "./CartAttributes.css";

export class CartAttributes extends PureComponent {
  render() {
    // console.log("cart details", this.props);
    const { index, id, attributes } = this.props;

    return (
      <div>
        {attributes.map((a) => (
          <div className="attributes" key={`${id} ${a.name}`}>
            <p className="cart-item__attributes-title attributes__title title">{`${a.name}:`}</p>
            <div className="attributes__list">
              {a.items.map((item) => (
                <div key={`${id} ${item.id}`}>
                  <input
                    type="radio"
                    id={`${a.id} ${item.id}`}
                    name={a.name + index}
                    value={item.value}
                    defaultChecked={item.selected}
                  />
                  <label htmlFor={`${a.id} ${item.id}`}>
                    <div
                      className={
                        a.type !== "swatch"
                          ? "attributes__text cart-item__attributes-text_" +
                            item.selected
                          : "attributes__color cart-item__attributes-color_" +
                            item.selected
                      }
                      style={
                        a.type === "swatch"
                          ? {
                              background: item.value,
                              border: `1px solid ${
                                item.id === "White" ? "black" : item.value
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
    );
  }
}

export default CartAttributes;
