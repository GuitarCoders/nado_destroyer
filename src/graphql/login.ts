import { gql } from "@urql/core";

export const loginGQL = {
    query: gql`
        query login($username: String!) {
            login(username: $username, password: "1111") {
                jwt_token
            }
        }
    `,

    queryMaker: (username: String):[any, any] => {
        return [loginGQL.query, { username }];
    }
}