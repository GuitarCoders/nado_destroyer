import { gql } from "@urql/core";

export const getUsersGQL = {
    query: gql`
        query GetUsers {
            users(search: "") {
                Users {
                    _id
                }
            }
        }
    `,

    queryMaker: ():[any, any] => {
        return [getUsersGQL.query, {  }];
    }
}