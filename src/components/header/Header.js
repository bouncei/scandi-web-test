import React from "react";
import "./Header.css";
import down from "../../assets/down.svg";

import { PureComponent } from "react";
import ToggleCart from "./toggleCart/ToggleCart";

export class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toggleCurr: false,
      toggleCart: false,
    };
  }
  render() {
    {
      console.log(this.state.toggleCurr);
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
                if (this.state.toggleCart === true) {
                  this.setState({ toggleCart: !this.state.toggleCart });
                }
                this.setState({ toggleCurr: !this.state.toggleCurr });
              }}
            >
              CurrencyIcon
            </div>
            <img src={down} alt="" height={15} width={20} />
            <div
              className={`dropdown-menu ${
                this.state.toggleCurr && "active-menu"
              }`}
            >
              <div className="currency">USD</div>
              <div className="currency">EUR</div>
              <div className="currency">NAIRA</div>
            </div>
          </div>
          <div className="headerItem dropdown">
            <div
              className="link"
              onClick={() => {
                if (this.state.toggleCurr === true) {
                  this.setState({ toggleCurr: !this.state.toggleCurr });
                }
                this.setState({ toggleCart: !this.state.toggleCart });
              }}
            >
              CartIcon
            </div>
            <img src={down} alt="" height={15} width={20} />

            <div
              className={`dropdown ${this.state.toggleCart && "active-menu"}`}
            ></div>
            {this.state.toggleCart ? <ToggleCart /> : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
