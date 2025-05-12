import { cacheExchange, Client, createClient, fetchExchange } from "@urql/core";
import { nadoUser } from "../types/nadoUser.js";
import { loginGQL } from "../graphql/login.js";
import { sendFriendRequestGQL } from "../graphql/sendFriendRequest.js";

export async function sendFriendRequest(users: nadoUser[]): Promise<void> {
    
    let bearerKey = '';

    for (const user of users) {


        const client = createClient({
            url: 'http://127.0.0.1:6378/graphql',
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
        
        console.log(loginResult.data);
        bearerKey = loginResult.data.login.jwt_token;

        await client.mutation(
            ...sendFriendRequestGQL.mutationMaker(
                '68217a43a7127a1444b3dae7',
                'test'
            )
        );
    }
}