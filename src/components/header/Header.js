import React from "react";
import "./Header.css";
import down from "../../assets/down.svg";
// import an icon for direction-up too
import { PureComponent } from "react";
import ToggleCart from "./toggleCart/ToggleCart";
// import CartegorySwitch from "./CategorySwitch/CartegorySwitch";

import { CATEGORY_NAMES } from "../../server/queries";
import { Query } from "@apollo/client/react/components";
import CategorySwitch from "./CategorySwitch/CategorySwitch";
import Currency from "./Currency/Currency";

export class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toggleCurr: false,
      toggleCart: false,
    };
  }

  render() {
    return (
      <div className="header">
        {/*<p>Header PureComponent for {this.props.name}!</p> */}

        {/* Left side
          Create a class component for switching categories  
        */}
        <div className="headerItems">
          <CategorySwitch />
        </div>

        {/*Right side*/}
        <div className="endItems">
          {/* Currency Tab */}
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
              <Currency />
            </div>
          </div>

          {/* Cart Tab */}

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
