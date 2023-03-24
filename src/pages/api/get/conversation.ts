// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../../../lib/database/connect';
import ConversationDB from '../../../../lib/database/models/conversation';
import MessageDB from '../../../../lib/database/models/message';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.body) {
        connect();
        try {
            const conversation: any = await ConversationDB.findOne({
                participants: {
                    $all: req.body.participants,
                    $size: req.body.participants.length
                }
            })

            if (!conversation) {
                console.log("Conversation not found, created one")

                const newconvers = await ConversationDB.create({
                    participants: req.body.participants,
                    updatedAt: Date.now(),
                    createdAt: Date.now()
                })
                return res.status(201).json(newconvers)
            } else {
                console.log("Conversation found")
                
                const messages = await MessageDB.find({
                    $or: [
                        { sender: req.body.participants[0], receiver: req.body.participants[1] },
                        { sender: req.body.participants[1], receiver: req.body.participants[0] }
                    ]
                });
                
                console.log(messages)
                return res.status(200).json({
                    conversation: conversation,
                    messages: messages
                })
            }
        } catch (error) {
            return res.status(500)
        }
    }

}