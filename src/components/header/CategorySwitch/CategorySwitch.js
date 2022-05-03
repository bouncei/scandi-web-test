import React, { PureComponent } from "react";
import { CATEGORY_NAMES } from "../../../server/queries";
import { Query } from "@apollo/client/react/components";
import "./CategorySwitch.css";
import { Link } from "react-router-dom";
// import { categoriesSwitcher } from "../../../Redux/actions";

export class CategorySwitch extends PureComponent {
  render() {
    return (
      <Query query={CATEGORY_NAMES}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.categories === undefined) return null;

          return data.categories.map((item, index) => (
            <Link
              to={`/${item.name}`}
              key={item.name}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="CategoryItem">{item.name}</div>
            </Link>
          ));
        }}
      </Query>
    );
  }
}

export default CategorySwitch;
