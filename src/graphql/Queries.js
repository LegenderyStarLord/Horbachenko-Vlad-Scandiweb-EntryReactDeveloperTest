import {gql} from "@apollo/client";

export const GET_REQUESTED_CATEGORY_PRODUCTS = gql`
          query($categoryName: String!){
           category(input: {title: $categoryName}){
             name
             products {
                id
                name
                gallery
                brand
                gallery
                inStock
                attributes {
                  id
                  name
                  type
                  items {
                    displayValue
                    value
                    id
                  }
                }
                prices{
                    currency{
                        label
                        symbol
                    }
                    amount
                   }
                }
             }
          }
`;


export const GET_REQUESTED_PRODUCT = gql `
            query($productId: String!){
             product(id: $productId){
                id
                name
                gallery
                description
                brand
                gallery
                inStock
                attributes {
                  id
                  name
                  type
                  items {
                    displayValue
                    value
                    id
                  }
                }
                prices{
                    currency{
                        label
                        symbol
                    }
                    amount
                    }
                }
              
            }
`;

export const GET_CATEGORIES_LIST = gql `
              query{
                 categories {
                     name,
                     products {
                        name
                     }
                }
              }
`;

export const GET_CURRENCIES_LIST = gql`
             query{
                currencies {
                    label
                    symbol
                }  
             }

`;