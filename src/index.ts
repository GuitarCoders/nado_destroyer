import { Client, TypedDocumentNode, cacheExchange, fetchExchange, gql } from "@urql/core";
import { createUser } from "./automation/createUser.js";
import { nadoUser } from "./types/nadoUser.js";

const client = new Client({
    url: 'http://127.0.0.1:6378/graphql',
    exchanges: [cacheExchange, fetchExchange]
});

async function main() {
    if (process.argv.length < 3) {
        console.log("Please select mode")
        console.log("MODE:DELUGE  #Create the source that will overflow with data rippling at the edge of its limits.");
        return;
    }

    if (process.argv[2] === "MODE:DELUGE") {
        const data = await import('../data/users.json', {assert: {type: 'json'}});
        const usersData:nadoUser[] = data.default;
        
        await createUser(usersData);
    }
}

main();

