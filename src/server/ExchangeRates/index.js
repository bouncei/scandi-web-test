import { useQuery } from "@apollo/client";
import React, { PureComponent } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

const EXCHANGE_RATES = gql`
  {
    category {
      name
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message}`;

  console.log(data);

  return (
    <Query query={EXCHANGE_RATES}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return console.log(error);
        if (data.categories === undefined) return null;

        console.log(data);
        return <div></div>;
      }}
    </Query>
  );

  // return data.categories.map(({ name }, index) => (
  //   <div key={index}>
  //     <p>{name}</p>
  //   </div>
  // ));
}

export default ExchangeRates;
