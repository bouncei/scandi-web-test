import React, { PureComponent } from "react";
import "./Layout.css";
// import styled from "styled-components";
import ItemCard from "../ItemCard/ItemCard";

// const Image = styled.img`
//   height: 338px;
//   object-fit: contain;
// `;

export class Layout extends PureComponent {
  render() {
    return (
      <div className="layout">
        <h2 className="category__title">{this.props.title}</h2>

        {/* Array of products in CardComponents using .map() */}
        <ItemCard />
      </div>
    );
  }
}

export default Layout;
