import { gql } from "@urql/core";

export const sendFriendRequestGQL = {
    mutation: gql`
        mutation sendFriendRequest($receiveUserId: String!, $requestMessage: String!) {
            createFriendRequest(createFriendRequestData: {
                receiveUserId:$receiveUserId,
                requestMessage:$requestMessage
            }) {
                success
            }
        }
    `,

    mutationMaker: (accountId: String, message: String):[any, any] => {
        return [sendFriendRequestGQL.mutation, { receiveUserId: accountId, requestMessage: message }];
    }
}