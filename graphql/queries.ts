export const USERS: string = `
    query users {
        users {
        edges {
            node {
            username
            role
            }
        }
        }
    }
    `