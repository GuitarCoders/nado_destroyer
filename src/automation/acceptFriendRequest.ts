import { cacheExchange, createClient, fetchExchange } from "@urql/core";
import { nadoUser } from "../types/nadoUser.js";
import { loginGQL } from "../graphql/login.js";
import { getFriendRequestGQL } from "../graphql/getFriendRequest.js";
import { acceptFriendRequestGQL } from "../graphql/acceptFriendRequest.js";

export async function acceptFriendRequest(users:nadoUser[], url:string): Promise<void> {

    let c = 0;

    for (const user of users) {
        let bearerKey = '';
        
        const client = createClient({
            url,
            exchanges: [cacheExchange, fetchExchange],
            fetchOptions: () => {
                return {
                    headers: {
                        'Authorization': bearerKey ? `Bearer ${bearerKey}` : '',
                    }
                };
            }
        });
    
        const loginResult = await client.query(
            ...loginGQL.queryMaker(
                user.account_id,
            )
        )

        if (loginResult.error) {
            console.error(loginResult.error);
            return;
        }

        bearerKey = loginResult.data.login.jwt_token;

        const friendRequestsQueryResult = await client.query(
            ...getFriendRequestGQL.queryMaker()
        );
        const fetchedFriendRequests: string[]
            = friendRequestsQueryResult.data.getReceiveFriendRequests.friendRequests.map(
                (friendRequest: { _id:string, __typename:string}) => {
                    return friendRequest._id;
                }
            );

        c++;
        console.log(`${c} : ${fetchedFriendRequests.length}`);

        for (const friendRequest of fetchedFriendRequests) {
            if (Math.random() < 0.9) {
                await client.mutation(
                    ...acceptFriendRequestGQL.mutationMaker(friendRequest)
                );
            }
        }
    }
}