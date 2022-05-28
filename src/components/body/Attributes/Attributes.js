import { isTypeNode } from "graphql";
import React, { PureComponent } from "react";
import "./Attributes.css";

export class Attributes extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      attributes: this.props.attributes,
      items: this.props.attributes.items,
    };
  }

  render() {
    console.log("HEHEHE", this.state.attributes);
    return (
      <div className="attributes">
        <div className="label__sizes">
          <div className="label__">
            {this.state.attributes.name.toUpperCase()}:{" "}
          </div>
          {this.state.attributes.name.toUpperCase() !== "COLOR" ? (
            <div className="sizes">
              {this.state.items.map((item, index) => (
                <div
                  className="size"
                  key={index}
                  onChange={() => this.props.func(item)}
                >
                  {item.value}
                </div>
              ))}
            </div>
          ) : (
            <div className="colors">
              {this.state.items.map((item, index) => (
                <p
                  key={index}
                  className="color"
                  style={{
                    backgroundSize: "contain",
                    backgroundColor: `${item.value}`,
                    border: `${item.value}`,
                  }}
                  onChange={() => this.props.func(item)}
                ></p>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Attributes;
