import { gql } from "@urql/core";

export const acceptFriendRequestGQL = {
    mutation: gql`
        mutation acceptFriendRequest($friendRequestId: String!) {
            acceptFriendRequest(acceptFriendRequestData: {
                friendRequestId: $friendRequestId
            }) {
                success
            }
        }
    `,

    mutationMaker: (friendRequestId: string):[any, any] => {
        return [acceptFriendRequestGQL.mutation, { friendRequestId }];
    }
}