import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import connect from "../../../../lib/database/connect"
import UsersDB from "../../../../lib/database/models/users"

export const authOptions = {
    // Configure one or more authentication providers
    secret: process.env.NEXTAUTH_SECRET as string,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async signIn({ account, profile }: any) {
            console.log(profile);
            connect();
            if (!UsersDB.findOne({ email: profile.email })) {
                UsersDB.create({ email: profile.email, name: profile.name, avatar: profile.picture })
            }

            return true
        }
    },
    pages: {
        signIn: '/auth/signin',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
}
export default NextAuth(authOptions)