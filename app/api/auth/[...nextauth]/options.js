import AmazonCognitoProvider from "next-auth/providers/cognito";

export const options = {
    providers: [
        AmazonCognitoProvider({
        clientId: process.env.COGNITO_CLIENT_ID,
        clientSecret: process.env.COGNITO_CLIENT_SECRET,
        issuer: process.env.COGNITO_ISSUER,
        idToken: true
    })]
}