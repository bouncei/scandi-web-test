import React, { PureComponent } from "react";
import Home from "../../components/body/layout/Home/Home";
import Header from "../../components/header/Header";

export class ParentComp extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: "all",
    };
  }

  render() {
    return (
      <>
        {/* Parent Home Component*/}
        <Header />
        <div className="mx">
          <Home title={this.state.title} />
        </div>
      </>
    );
  }
}

export default ParentComp;
