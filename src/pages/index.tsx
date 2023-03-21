import Layout from "@/components/layout";
import Navbar from '@/components/navbar'
import { useState, useRef } from "react";

import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import styles from '@/styles/Chats.module.css';

type Chat = { name: string, email: string, lastMessage: string, image: string };
type Chats = Array<Chat>;

export default function Home({ chats }: { chats: Chats }) {
  const [results, setResults] = useState<Array<string>>([]);
  const refTerm = useRef<any>('');
  const arr = ["Juan Alberto", "Miguel Rufas", "Alvaro Poblador"];

  const handleInputChange = () => {
    if (!refTerm.current.value) return setResults([]);

    const filteredResults = arr.filter((element) =>
      element.toLowerCase().includes(refTerm.current.value.toLowerCase())
    );
    console.log(filteredResults)
    setResults(filteredResults);
  };

  return (
    <Layout>
      <div className={styles['wrapper']}>
        <div className={styles['wrapcontent']}>
          <Navbar></Navbar>
          <div className={styles['wrapchats']}>
            <div className={styles['sidebarchats']}>
              <div>
                <input type="text" placeholder="Enter a search term..." ref={refTerm} onChange={handleInputChange} />

                {
                  <ul className={styles['result-list']}>
                    {results.map((result: string) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                }
              </div>

              {
                chats.map((chat: Chat, index: number) => (
                  <div key={index} className={styles['chat']}>
                    <img src={chat.image}></img>
                    <div className={styles['chattxtinfo']}>
                      <h4>{chat.name}</h4>
                      <p>{chat.lastMessage}</p>
                    </div>
                  </div>
                ))
              }
            </div>

            <div className={styles['currentchat']}>

            </div>
          </div>
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
      image: "https://i.pinimg.com/236x/9e/40/74/9e4074bbe7890cd245b51b9ff5c0e33c.jpg",
      lastMessage: "See you soon"
    },
    {
      name: "Juan",
      email: "test@gmail.com",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxPiFXD9LTft3Hcu5WsNhAy6m3n4jS_sZk4OKVGjtriA&s",
      lastMessage: "No please"
    },
    {
      name: "Alberto",
      email: "no@gmail.com",
      image: "https://i.pinimg.com/736x/93/98/96/9398969ef2d4810436b6c6ff70bd000c.jpg",
      lastMessage: "You should buy that"
    }
  ]

  return {
    props: { chats }
  }
}