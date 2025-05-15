import { cacheExchange, Client, createClient, fetchExchange } from "@urql/core";
import { nadoUser } from "../types/nadoUser.js";
import { loginGQL } from "../graphql/login.js";
import { sendFriendRequestGQL } from "../graphql/sendFriendRequest.js";
import { getUsersGQL } from "../graphql/getUsers.js";

export async function sendFriendRequest(users: nadoUser[]): Promise<void> {
    let c = 0;
    for (const user of users) {
        let bearerKey = '';
        
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

        bearerKey = loginResult.data.login.jwt_token;

        const usersQueryResult = await client.query(
            ...getUsersGQL.queryMaker()
        )
        const fetchedUsers:{_id: string, __typename: string}[] = usersQueryResult.data.users.Users;

        c++;
        const randomNum = Math.random();
        const requestQuantity = Math.round((fetchedUsers.length*0.1*randomNum) + (Math.pow(randomNum,7)*fetchedUsers.length*0.9));
        console.log(`${c} : ${requestQuantity}`);

        for (const num of pickRandomIndex(fetchedUsers.length, requestQuantity)) {

            if (!fetchedUsers[num]) continue;
            try {
                await client.mutation(
                    ...sendFriendRequestGQL.mutationMaker(
                        fetchedUsers[num]._id,
                        `REACH FOR MY HAND, you who questions.`
                    )
                );
            } catch (e) {
                console.error(e);
            }
            
        }
    }
}

function pickRandomIndex (maxValue: number, length: number): number[] {

    // 0 ~ maxValue in array
    const numberArray = Array.from({ length:maxValue }, (_, i) => i);

    for (let i = numberArray.length; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random()*numberArray.length-1)
        const temp = numberArray[randomIndex]
        numberArray[randomIndex] = numberArray[i];
        numberArray[i] = temp;
    }
    
    return numberArray.slice(0, length);
}