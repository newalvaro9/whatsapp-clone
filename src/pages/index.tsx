import Layout from "@/components/layout";
import Navbar from '@/components/navbar'
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import styles from '@/styles/Chats.module.css';

type Chat = { name: string, email: string, lastMessage: string };
type Chats = Array<Chat>;

export default function Home({ chats }: { chats: Chats }) {
  console.log(chats)
  return (
    <Layout>
      <div className={styles['wrapper']}>
        <Navbar></Navbar>
        <div className={styles['sidebarchats']}>

          {
            chats.map((chat: Chat, index: number) => (
              <div key={index} className={styles['chat']}>
                <h4>{chat.name}</h4>
                <p>{chat.lastMessage}</p>
              </div>
            ))
          }

        </div>

        <div className={styles['currentchat']}>

        </div>
      </div>
    </Layout>
  )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return { redirect: { destination: "/api/auth/signin" } };
  }

  const chats: Chats = [
    {
      name: "Alvaro",
      email: "vfxalv@gmail.com",
      lastMessage: "See you soon"
    },
    {
      name: "Juan",
      email: "test@gmail.com",
      lastMessage: "No please"
    },
    {
      name: "Alberto",
      email: "no@gmail.com",
      lastMessage: "You should buy that"
    }
  ]

  return {
    props: { chats }
  }
}