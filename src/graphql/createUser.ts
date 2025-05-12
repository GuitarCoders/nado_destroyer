import { gql } from "@urql/core";

export const createUserGQL = {
    mutation: gql`
        mutation CreateUser($accountId: String!, $name: String!, $email: String!) {
            createUser(createUserData: {
                account_id: $accountId,
                name: $name,
                password: "1111",
                email: $email
            }) {
                _id,
                account_id,
                email
            }
        }
    `,

    mutationMaker: (accountId: String, name: String, email: String):[any, any] => {
        return [createUserGQL.mutation, { accountId: accountId, name: name, email: email }];
    }
}