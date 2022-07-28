export const AUTH_USER: string = `
    mutation authUser($username: String!, $password: String!) {
        tokenAuth(input: {username: $username, password: $password}) {
            token
        }
    }
`
