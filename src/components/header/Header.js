import React from "react";
import "./Header.css";

import { PureComponent } from "react";

export class Header extends PureComponent {
  render() {
    return (
      <div className="header">
        {/*<p>Header PureComponent for {this.props.name}!</p> */}

        {/*Left side*/}

        <div className="headerItems">
          <div className="headerItem">WOMEN</div>
          <div className="headerItem">MEN</div>
          <div className="headerItem">KIDS</div>
        </div>

        {/*Right side*/}
        <div className="endItems">
          <div className="headerItem">CurrencyIcon</div>
          <div className="headerItem">CartIcon</div>
        </div>
      </div>
    );
  }
}

export default Header;
