import React from "react";
import "./Header.css";
import down from "../../assets/down.svg";

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
          <div className="headerItem dropdown">
            <div className=".link">CurrencyIcon</div>
            <img src={down} alt="" height={15} width={20} />
            <div className="dropdown-menu">USD</div>
          </div>
          <div className="headerItem dropdown">
            <div className="link">CartIcon</div>
            <img src={down} alt="" height={15} width={20} />

            <div className="dropdown-menu"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
