import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import Layout from "@/components/layout";
import stylebtn from "@/styles/Buttons.module.css";
import styles from "@/styles/Signin.module.css";

export default function SignIn() {
    return (
        <Layout>
            <div className={styles['wrap']}>
                <div className={styles['box']}>
                    <h1>Sign in with Google</h1>
                    <button className={stylebtn['button-3']} onClick={() => signIn("google")}>
                        Sign in
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session) {
        return { redirect: { destination: "/" } };
    }

    return {
        props: {},
    }
}