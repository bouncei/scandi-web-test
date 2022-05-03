import React, { Component } from "react";
import Home from "../../components/body/layout/Home/Home";
// import Layout from "../../components/body/layout/Layout";
import Header from "../../components/header/Header";

export class ParentComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Boss",
      title: "Category Name",
    };
  }

  // componentDidMount() {
  //   setInterval(() => {
  //     this.setState = {
  //       name: "Bouncey",
  //     };
  //   }, 2000);
  // }

  render() {
    // console.log();
    return (
      <>
        {/* ParentComp*/}
        <Header />
        <div className="mx">
          <Home title={this.state.title} />
        </div>
      </>
    );
  }
}

export default ParentComp;
