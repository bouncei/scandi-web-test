import React from "react";
import "./Header.css";
import down from "../../assets/down.svg";

import { PureComponent } from "react";

export class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
  }
  render() {
    {
      console.log(this.state.toggle);
    }
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
            <div
              className="link"
              onClick={() => {
                this.setState({ toggle: !this.state.toggle });
              }}
            >
              CurrencyIcon
            </div>
            <img src={down} alt="" height={15} width={20} />
            <div
              className={`dropdown-menu ${this.state.toggle && "active-menu"}`}
            >
              <div className="currency">USD</div>
              <div className="currency">EUR</div>
              <div className="currency">NAIRA</div>
            </div>
          </div>
          <div className="headerItem dropdown">
            <div className="link">CartIcon</div>
            <img src={down} alt="" height={15} width={20} />

            <div className="dropdown-menu">CART DETAILS</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
