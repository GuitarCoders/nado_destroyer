import { gql } from "@urql/core";

const a = gql`
    query {
        todos {
            id
            title
        }
    }
`