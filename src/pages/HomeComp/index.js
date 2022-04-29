import React, { Component } from "react";
import Layout from "../../components/body/layout/Layout";
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
        <Header name={this.state.name} />
        <div className="mx">
          <Layout title={this.state.title} />
        </div>
      </>
    );
  }
}

export default ParentComp;
