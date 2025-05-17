import { gql } from "@urql/core";

// export const getUsersGQL = {
//     query: gql`
//         query GetUsers {
//             users(search: "") {
//                 Users {
//                     _id
//                 }
//             }
//         }
//     `,

//     queryMaker: ():[any, any] => {
//         return [getUsersGQL.query, {  }];
//     }
// }

export const getFriendRequestGQL = {
    query: gql`
        query getReceivedFriendRequest {
            getReceiveFriendRequests {
                friendRequests {
                    _id
                }
            }
        }
    `,

    queryMaker: ():[any, any] => {
        return [getFriendRequestGQL.query, {   }]
    }
}