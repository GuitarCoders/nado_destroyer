import { Client, TypedDocumentNode, cacheExchange, fetchExchange, gql } from "@urql/core";
import { readFile, readFileSync } from "fs";
import path from "path";
import { nadoUser } from "../types/nadoUser.js";
import { createUserGQL } from "../graphql/createUser.js";

export async function createUser(users: nadoUser[], url:string):Promise<void> {
    const client = new Client({
        url,
        exchanges: [cacheExchange, fetchExchange]
    });

    for (const user of users) {
        try {
            const result = await client.mutation(
                ...createUserGQL.mutationMaker(
                    user.account_id, 
                    user.name, 
                    user.email
                )
            );

            result.error ? console.log(result.error) : "";
        } catch (e) {
            console.error(e);
        }
    }
    
}