import { Client, TypedDocumentNode, cacheExchange, fetchExchange, gql } from "@urql/core";
import { readFile, readFileSync } from "fs";
import path from "path";
import { nadoUser } from "../types/nadoUser.js";
import { createUserGQL } from "../graphql/createUser.js";

export async function createUser(users: nadoUser[]):Promise<void> {
    const client = new Client({
        url: 'http://127.0.0.1:6378/graphql',
        exchanges: [cacheExchange, fetchExchange]
    });

    users.forEach(async (user) => {
        await client.mutation(...createUserGQL.mutationMaker(user.account_id, user.name, user.email));
    })
}