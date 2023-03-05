// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as dotenv from 'dotenv'
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import connect from "../../../lib/database/database";
import db from "../../../lib/database/models/users";
import hashPassword from '../../../lib/utility/hashPassword';
import genTelephone from '../../../lib/utility/genTelephone';
import { setCookie } from 'cookies-next'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST') {
        const { username, password, confirm_password }: { username: string, password: string, confirm_password: string } = req.body;

        await connect();
        const user = await db.findOne({ username: username });

        if (user) {
            return res.redirect(`http://localhost:3000/register?error=Username+already+taken%21`)
        }

        if (password !== confirm_password) {
            return res.redirect(`http://localhost:3000/register?error=Passwords+do+not+match%21`)
        }
        const token = sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3, // 3 days
                username: username,
            },
            process.env.JWT_SECRET as string
        );

        await db.create({
            username: username,
            password: await hashPassword(password),
            telephone: genTelephone(34)
        })

        setCookie("sessionId", token, {
            req, res,
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 3,
            path: "/",
        });

        res.redirect("http://localhost:3000/chats")

    } else {
        res.redirect('/register')
    }
}