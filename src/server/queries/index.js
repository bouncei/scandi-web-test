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

export const GET_PRODUCTS_BY_ID = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query category($input: CategoryInput) {
    category(input: $input) {
      products {
        id
        brand
        name
        inStock
        gallery
        attributes {
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            symbol
          }
          amount
        }
      }
    }
  }
`;
