import React, { PureComponent } from "react";
import { CATEGORY_NAMES } from "../../../server/queries";
import { Query } from "@apollo/client/react/components";
import "./CategorySwitch.css";

export class CategorySwitch extends PureComponent {
  render() {
    return (
      <Query query={CATEGORY_NAMES}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.categories === undefined) return null;

          return data.categories.map((item, index) => (
            <div className="CategoryItem" key={index}>
              {item.name}
            </div>
          ));
        }}
      </Query>
    );
  }
}

export default CategorySwitch;