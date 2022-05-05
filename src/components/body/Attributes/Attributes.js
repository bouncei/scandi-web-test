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

  //   componentDidMount() {}

  render() {
    // console.log("HEHEHE", this.state.attributes);
    return (
      <div className="attributes">
        <div className="label__sizes">
          <div className="label">
            {this.state.attributes.name.toUpperCase()}:{" "}
          </div>
          {this.state.attributes.name.toUpperCase() !== "COLOR" ? (
            <div className="sizes">
              {this.state.items.map((item, index) => (
                <p className="size" key={index}>
                  {item.value}
                </p>
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
