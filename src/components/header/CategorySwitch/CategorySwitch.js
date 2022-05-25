import React, { PureComponent } from "react";
import { CATEGORY_NAMES } from "../../../server/queries";
import { Query } from "@apollo/client/react/components";
import "./CategorySwitch.css";
import { Link } from "react-router-dom";
// import { categoriesSwitcher } from "../../../Redux/actions";

export class CategorySwitch extends PureComponent {
  handleClick = () => {};
  render() {
    return (
      <Query key={"key"} query={CATEGORY_NAMES}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.categories === undefined) return null;

          // window.location.reload(false);

          return data.categories.map((item, index) => (
            <Link
              to={`/${item.name}`}
              key={index}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="CategoryItem"
                // onClick={() => {
                //   window.location.reload(false);
                // }}
                // onClick={this.handleClick}
              >
                {item.name}
              </div>
            </Link>
          ));
        }}
      </Query>
    );
  }
}

export default CategorySwitch;
