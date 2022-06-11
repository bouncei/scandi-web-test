import React from "react";
import "./Header.css";
import { ReactComponent as Down } from "../../pics/down.svg";
import trolley from "../../pics/trolley.png";

// import an icon for direction-up too
import { PureComponent } from "react";
import ToggleCart from "./toggleCart/ToggleCart";
import CategorySwitch from "./CategorySwitch/CategorySwitch";
import Currency from "./Currency/Currency";

import { ReactComponent as HeaderLogo } from "../../pics/header-logo.svg";
import { connect } from "react-redux";

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
    const { totalQty, cart } = this.props;

    console.log(totalQty);
    return (
      <div className="header">
        {/*<p>Header PureComponent for {this.props.name}!</p> */}

        {/* Left side
          Create a class component for switching categories  
        */}
        <div className="headerItems" onClick={this.refreshPage}>
          <CategorySwitch length={cart.length} qty={totalQty} />
        </div>

        {/* Centered Element */}
        <div className="" onClick={() => {}}>
          <HeaderLogo />
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    paddingRight: 5,
                  }}
                >
                  {localStorage.getItem("symbol")}
                </p>
                <Down />
              </div>
            </div>
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    paddingRight: 5,
                  }}
                >
                  <img
                    src={trolley}
                    alt=""
                    height={23}
                    // width={20}
                    style={{ objectFit: "contain" }}
                  />
                  {cart.length !== 0 && (
                    <div className="mini-cart__quantity">{totalQty}</div>
                  )}
                </div>
                <Down />
              </div>
            </div>

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

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    totalQty: state.shop.totalQty,
  };
};

const functionFromConnect = connect(mapStateToProps, null);

export default functionFromConnect(Header);
