import NextAuth from "next-auth"
import AmazonCognitoProvider from "next-auth/providers/cognito"

// export default NextAuth({
//     providers: [
//         AmazonCognitoProvider({
//             clientId: process.env.COGNITO_CLIENT_ID,
//             clientSecret: process.env.COGNITO_CLIENT_SECRET,
//             issuer: process.env.COGNITO_ISSUER
//         })
//     ],
//     session: {
//         strategy: "jwt"
//     },
//     pages: {
//         signIn: "/api/auth/signin",
//     },
// });

function helperRefreshToken(newRefreshToken) {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", "Basic "+process.env.NEXT_PUBLIC_BASICAUTH);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(process.env.NEXT_PUBLIC_POOLED_URL+`/oauth2/token?grant_type=refresh_token&client_id=${process.env.COGNITO_CLIENT_ID}&client_secret=${process.env.COGNITO_CLIENT_SECRET}&refresh_token=` + newRefreshToken, requestOptions)
        .then(response => response.text())
        .then(result => resolve(result))
        .catch(error => reject('error', error));
        });
}

function validateIdToken(idToken) {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", "Bearer " + idToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(process.env.NEXT_PUBLIC_ENDPOINTURL + "client/+11234567890", requestOptions)
        .then(response => response.status)
        .then(result => resolve(result))
        .catch(error => reject('error', error));
        });
}

    export const auth = NextAuth({
        providers: [
            AmazonCognitoProvider({
                clientId: process.env.COGNITO_CLIENT_ID,
                clientSecret: process.env.COGNITO_CLIENT_SECRET,
                issuer: process.env.COGNITO_ISSUER,
                idToken: true
            })
        ],
        secret:process.env.NEXT_PUBLIC_SECRET,
        session: {
            strategy: "jwt",
            jwt: true
        },
        debug: true,
        callbacks: {
            async redirect({ url, baseUrl }) {
                const ordersUrl = process.env.NEXTAUTH_URL

                return ordersUrl
            },
            // async jwt({ token, account, profile, session, user }) {
            //     console.log("Token:", JSON.stringify(token, null, 2))
            //     console.log("Account: " + JSON.stringify(account, null, 2))
            //     console.log("Profile: " + JSON.stringify(profile, null, 2))
            //     console.log("User: " + JSON.stringify(user, null, 2))
            //     console.log("Session in JWT: ", JSON.stringify(session, null, 2))
            //     if (account) {
            //         token.idToken = account.id_token
            //         token.accessToken = account.access_token
            //         token.refreshToken = account.refresh_token
            //         token.accessTokenExpires = Date.now() + 240000

            //         return token
            //     }

            //     // Return previous token if the access token has not expired yet
            //     console.log("Date now(): " + Date.now())
            //     console.log("Token accessTokenExpires: " + parseInt(token.accessTokenExpires))
            //     if (Date.now() < parseInt(token.accessTokenExpires)) {
            //         console.log("Previous token returned.")
            //         return token
            //     } else {
            //         console.log("New token entered")

            //         const refreshedTokens = await helperRefreshToken(token.refreshToken)

            //         console.log("refreshedToken: " + refreshedTokens)
    
            //         const newTokens = JSON.parse(refreshedTokens)
        
            //         console.log(newTokens.id_token)
            //         if (newTokens.id_token !== "undefined" && newTokens.id_token != null) {
            //             token.idToken = newTokens.id_token
            //             token.accessToken = newTokens.access_token
            //             token.accessTokenExpires = Date.now() + 240000

            //             console.log("Updated refreshed token in JWT: ", JSON.stringify(token));

            //             return token
            //         }
            //     }
            // },
            async jwt({ token, account }) {
                if (account) {
                    token.idToken = account.id_token
                    token.accessToken = account.access_token
                    token.refreshToken = account.refresh_token
                    console.log("Account: %s", account)

                    return token
                }

                // Check if id token is still valid
                //console.log("Token.id_token = ", JSON.stringify(token.idToken))
                const response = await validateIdToken(token.idToken)
                //console.log("Response in JWT Callback: ", JSON.stringify(response))

                // Return previous token if still valid
                if (response == 200) {
                    // Still valid
                    //console.log("JWT Token still valid")
                    return token
                } else {
                    // Refreshing id and access tokens
                    //console.log("Creating new JWT Token")
                    const refreshedTokens = await helperRefreshToken(token.refreshToken)
                    // console.log("refreshedToken: ", JSON.stringify(refreshedTokens, null, 2))

                    const newRefreshedTokens = JSON.parse(refreshedTokens)
                    // console.log("Refreshed ID Token: ", JSON.stringify(newRefreshedTokens.id_token))

                    // Checking if refresh process worked ok
                    if (newRefreshedTokens.id_token !== "undefined" || newRefreshedTokens.id_token != null) {
                        // Updating token with new refreshed tokens
                        token.idToken = newRefreshedTokens.id_token
                        token.accessToken = newRefreshedTokens.access_token
                        // console.log("Updated refreshed token in JWT: ", JSON.stringify(token))

                        return token
                    }

                }
            },
            async session({ session, token }) {
                // console.log("Session in session: " + JSON.stringify(session, null, 2))
                // console.log("Token in session: " + JSON.stringify(token))
                // console.log("Session expires: " + JSON.stringify(session.expires, null, 2))
                if (token) {
                    session.accessToken = token.idToken
                    // session.expires = new Date(token.accessTokenExpires).toString()
                    // console.log("Entro aqui!")
                }

                // console.log("After change: ", JSON.stringify(session))
                return session
            },

        },
        events: {
            async signOut({ session, token }) {
                // Delete auth cookie on signout so it doesn't persist past log out
                res.setHeader("Set-Cookie", "")
                res.setHeader("Set-Cookie","next-auth.session-token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT");
                res.setHeader("Set-Cookie","next-auth.session-token01=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT");

                // // Set token and session to {}, that would update the clientside token/session as well
                token = {}
                session = {}

                // console.log("Response after signout: " + res)

                return
            }
        }
    })

export { auth as GET, auth as POST }


//}





// import NextAuth, { NextAuthOptions } from 'next-auth';
// import CognitoProvider from 'next-auth/providers/cognito';

// // For more information on each option (and a full list of options) go to
// // https://next-auth.js.org/configuration/options
// export const authOptions = {
//   providers: [
//     CognitoProvider({
//       clientId: process.env.COGNITO_CLIENT_ID,
//       clientSecret: process.env.COGNITO_CLIENT_SECRET,
//       issuer: process.env.COGNITO_ISSUER,
//     }),
//   ],
// //   debug: process.env.NODE_ENV === 'development' ? true : false,
//   debug: true,
//   callbacks: {
//     jwt: async ({ token, user, account, profile, isNewUser }) => {
//       console.log('in jwt');
//       console.log(token);
//       console.log(user);
//       const isSignIn = (user) ? true : false
//       // Add auth_time to token on signin in
//       if (isSignIn) { token.auth_time = Math.floor(Date.now() / 1000) }
//       return Promise.resolve(token)
//     },
//     session: async ({ session, token }) => {
//       console.log('in session');
//       console.log(token);
//       console.log(session);
//       if (!session?.user || !token?.account) {
//         console.log("No session.user or no token.account")
//         return session;
//       }
//       console.log("Session.user and Token.account both exist")
//       session.user["id"] = token.account["id"];
//       session.accessToken = token.account["accessToken"];

//       return session;
//     },
//   },
// };

// export default NextAuth(authOptions);