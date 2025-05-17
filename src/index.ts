import { Client, TypedDocumentNode, cacheExchange, fetchExchange, gql } from "@urql/core";
import { createUser } from "./automation/createUser.js";
import { nadoUser } from "./types/nadoUser.js";
import { sendFriendRequest } from "./automation/sendFriendRequest.js";
import { acceptFriendRequest } from "./automation/acceptFriendRequest.js";

const client = new Client({
    url: 'http://127.0.0.1:6378/graphql',
    exchanges: [cacheExchange, fetchExchange]
});

async function main() {
    if (process.argv.length < 3) {
        console.log("Please select mode")
        console.log("MODE:DELUGE      #Create the source that will overflow with data rippling at the edge of its limits.");
        console.log("MODE:EVANGELIZE  #Extend a hand at random to the departed who walk the path of the same beliefs.");
        console.log("MODE:ACCEPTANCE  #Submit to the radiant light that devours you in brilliance.")

        return;
    }

    if (process.argv[2] === "MODE:DELUGE") {
        const data = await import('../data/users_half.json', {assert: {type: 'json'}});
        const usersData:nadoUser[] = data.default;
        
        await createUser(usersData);
    }

    if (process.argv[2] === "MODE:EVANGELIZE") {
        const data = await import('../data/users_half.json', {assert: {type: 'json'}});
        const usersData:nadoUser[] = data.default;

        await sendFriendRequest(usersData);
    }

    if (process.argv[2] === "MODE:ACCEPTANCE") {
        const data = await import('../data/users_half.json', {assert: {type: 'json'}});
        const usersData:nadoUser[] = data.default;

        await acceptFriendRequest(usersData);
    }
}

main();

