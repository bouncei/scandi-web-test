import React, { PureComponent } from "react";
import "./Home.css";
// import styled from "styled-components";
import ItemCard from "../../ItemCard/ItemCard";

// const Image = styled.img`
//   height: 338px;
//   object-fit: contain;
// `;

export class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      categoryName: "",
    };
  }

  componentDidMount() {
    this.setState({ categoryName: window.location.pathname.slice(1) });
  }

  render() {
    return (
      <div className="layout">
        <h2 className="category__title">
          {this.state.categoryName ? this.state.categoryName : this.props.title}
        </h2>

        {/* Array of products in CardComponents using .map() */}
        <div className="products">
          <ItemCard />
        </div>
      </div>
    );
  }
}

export default Home;
