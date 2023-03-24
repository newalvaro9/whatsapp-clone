// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../../../lib/database/connect';
import MessageDB from '../../../../lib/database/models/message';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.body) {
        connect();
        try {
            await MessageDB.create({
                content: req.body.content,
                sender: req.body.sender,
                receiver: req.body.receiver,
                createdAt: Date.now()
            })
            return res.status(200)
        } catch (error) {
            return res.status(500)
        }
    }

}