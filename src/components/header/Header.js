import React from "react";
import "./Header.css";
import down from "../../assets/down.svg";
// import an icon for direction-up too
import { PureComponent } from "react";
import ToggleCart from "./toggleCart/ToggleCart";
import CategorySwitch from "./CategorySwitch/CategorySwitch";
import Currency from "./Currency/Currency";

import { ReactComponent as HeaderLogo } from "../../pics/header-logo.svg";

export class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toggleCurr: false,
      toggleCart: false,

      symbol: "$",
      isOpen: false,
    };
  }
  refreshPage = () => {
    window.location.reload(false);
  };

  optionClickHandler = (symbol) => {
    this.setState({ symbol, isOpen: false });
    localStorage.setItem("symbol", symbol);
    // console.log("Selected Symbol", localStorage.getItem("symbol"));
  };

  render() {
    return (
      <div className="header">
        {/*<p>Header PureComponent for {this.props.name}!</p> */}

        {/* Left side
          Create a class component for switching categories  
        */}
        <div className="headerItems" onClick={this.refreshPage}>
          <CategorySwitch />
        </div>

        {/* Centered Element */}
        <HeaderLogo />

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
              <Currency value={this.optionClickHandler} />
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
