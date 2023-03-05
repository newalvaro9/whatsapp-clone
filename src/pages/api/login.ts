// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as dotenv from 'dotenv'
import { sign } from "jsonwebtoken";
import bcrypt from 'bcrypt'
import connect from "../../../lib/database/database";
import db from "../../../lib/database/models/users";
import { setCookie } from 'cookies-next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.redirect('http://localhost:3000/login')

    const { username, password }: { username: string, password: string } = req.body;

    await connect();
    const user = await db.findOne({ username: username });
    if (!user) {
        return res.redirect(`http://localhost:3000/login?user=${username}&error=${"Invalid+credentials%21"}`)
    }

    if (await bcrypt.compare(password, user.password)) {
        const token = sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3, // 3 days
                username: username,
            },
            process.env.JWT_SECRET as string
        );

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
        res.redirect(`http://localhost:3000/login?user=${username}&error=Invalid+credentials%21`)
    }
}