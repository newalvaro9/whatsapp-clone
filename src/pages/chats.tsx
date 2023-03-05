import Layout from "@/components/layout"
import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from 'cookies-next'
import jwt from 'jsonwebtoken'

export default function Chats() {
    return (
        <Layout>
            <div>

            </div>
        </Layout>
    )
}

export const getServerSideProps = async ({ req, res }: { req: NextApiRequest, res: NextApiResponse }) => {
    const jwt_token = getCookie('sessionId', { req, res })?.toString()
    if (!jwt_token) return {
        redirect: {
            permanent: false,
            destination: "/login",
        },
        props: {},
    };

    try {
        const decoded = jwt.verify(jwt_token, process.env.JWT_SECRET as string)
        
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: {},
        };
    }

    return { props: {} }
}