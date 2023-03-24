import Layout from "@/components/layout";
import Navbar from '@/components/navbar'

import { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import styles from '@/styles/Chats.module.css';
import connect from "../../lib/database/connect";
import users from "../../lib/database/models/users";
import axios from "axios";


type Chat = { name: string, email: string, lastMessage: string, avatar: string };
type Chats = Array<Chat>;

export default function Home({ allChats, currentChats }: { currentChats: Chats, allChats: Chats }) {
  const [results, setResults] = useState<any>([]);
  const refSearch = useRef<any>('');
  const refNewMessage = useRef<any>('')
  const [focusedChat, setFocusedChat] = useState<any>({})
  const [messages, setMessages] = useState<any>([])

  const { data: session, status } = useSession()

  const handleInputChange = () => {
    if (!refSearch.current.value) return setResults([]);

    const filteredResults = allChats.filter((element) =>
      element.name.toLowerCase().includes(refSearch.current.value.toLowerCase())
    );
    console.log(filteredResults)
    setResults(filteredResults);
  };

  const focusChat = (chat: Chat) => {
    setFocusedChat(chat)
  }

  const startConversation = (chat: Chat) => {
    if (!session?.user || !chat) return null
    axios.post('/api/get/conversation', {
      participants: [session.user.email, chat.email]
    }).then((response) => {
      console.log(response.data)
      setMessages(response.data.messages)
    })
  }

  const newMessage = () => {
    const messageContent = refNewMessage.current.value
    if (!messageContent || !session?.user || !focusedChat) return null
    if (status === 'authenticated') {
      axios.post('/api/new/message', {
        content: messageContent,
        sender: session.user.email,
        receiver: focusedChat.email
      })
    }
  }

  return (
    <Layout>
      <div className={styles['wrapper']}>
        <div className={styles['wrapcontent']}>
          <Navbar></Navbar>
          <div className={styles['wrapchats']}>
            <div className={styles['sidebarchats']}>
              <div>
                <input type="text" placeholder="Start new chat with..." ref={refSearch} onChange={handleInputChange} />

                {
                  results.slice(0, 5).map((chat: Chat, index: number) => (
                    <div key={index} onClick={() => { focusChat(chat); startConversation(chat) }} className={styles['chat']}>
                      <img src={chat.avatar}></img>
                      <div className={styles['chattxtinfo']}>
                        <h4>{chat.name}</h4>
                      </div>
                    </div>
                  ))
                }
              </div>

              {
                currentChats.map((chat: Chat, index: number) => (
                  <div key={index} onClick={() => { focusChat(chat); startConversation(chat); }} className={styles['chat']}>
                    <img src={chat.avatar}></img>
                    <div className={styles['chattxtinfo']}>
                      <h4>{chat.name}</h4>
                      <p>{chat.lastMessage}</p>
                    </div>
                  </div>
                ))
              }
            </div>

            <div className={styles['currentchat']}>
              {
                Object.keys(focusedChat).length === 0 ? (
                  null
                ) : (
                  <div className={styles['viewer']}>
                    {
                      messages.map((message: any, index: any) => (
                        <div key={message._id}>
                          <p>{message.content}</p>
                        </div>
                      ))
                    }
                    <div className={styles['sendinput']}>
                      <input type="text" id="newmessage-id" ref={refNewMessage} placeholder="Type a message..."></input>
                      <FontAwesomeIcon className={styles['sendicon']} icon={faPaperPlane} onClick={newMessage}></FontAwesomeIcon>
                    </div>
                  </div>
                )
              }
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

  connect();
  const allChats: any = await users.find();

  const currentChats: any = [ // Will be changed to pseudo: conversations model find({participants some of === session.user.email})
    {
      "name": "Nicholas Wilson",
      "email": "nicholas.wilson@example.com",
      "avatar": "https://randomuser.me/api/portraits/men/17.jpg",
      "lastMessage": "Let's talk later."
    },
    {
      "name": "Melanie Turner",
      "email": "melanie.turner@example.com",
      "avatar": "https://randomuser.me/api/portraits/women/88.jpg",
      "lastMessage": "How was your day?"
    }
  ]

  return {
    props: { allChats: JSON.parse(JSON.stringify(allChats)), currentChats }
  }
}