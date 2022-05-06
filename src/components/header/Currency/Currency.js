import { Query } from "@apollo/client/react/components";
import React, { PureComponent } from "react";
import { CURRENCY_DETIALS } from "../../../server/queries";
import "./Currency.css";

export class Currency extends PureComponent {
  render() {
    return (
      <Query query={CURRENCY_DETIALS}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.currencies === undefined) return null;

          return data.currencies.map((item, index) => (
            <div
              className="currency__details"
              key={index}
              onClick={() => {
                this.props.value(item.symbol);
                window.location.reload(false);
              }}
            >
              <div className="symbol">{item.symbol}</div>
              <div className="label__">{item.label}</div>
            </div>
          ));
        }}
      </Query>
    );
  }
}

export default Currency;
