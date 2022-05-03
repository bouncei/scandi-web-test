import { gql } from "@apollo/client";

export const CATEGORY_NAMES = gql`
  {
    categories {
      name
    }
  }
`;

export const CURRENCY_DETIALS = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

// COMPLETE THE QUERY WHEN THE CATEGORY SWITCHING FUNCTION HAS BEEN COMPLETED
export const ALL_CATEGORY_SECTION = gql`
  {
    category {
      name
      products {
        id
        name
        prices {
          amount
          currency {
            symbol
          }
        }
        gallery
        inStock
        description
        category
        brand
      }
    }
  }
`;
