// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../../lib/database/connect';
import UsersDB from '../../../lib/database/models/users';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.query;

    if (email) {
        connect();
        const fuser: any = UsersDB.findOne({
            email: email
        })
        if(!fuser) return
        res.json({
            name: fuser.name,
            email: fuser.email,
            avatar: fuser.avatar,
        })
    } else {
        res.status(404).send('You must provide an user')
    }
}
