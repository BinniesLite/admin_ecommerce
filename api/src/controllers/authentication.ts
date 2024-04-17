import { Request, Response } from "express"
import prisma from "../utils/prisma"
import bcrypt from "bcrypt"
import { v4 } from "uuid";

import passport from "passport"
interface User {
    id?: string,
    email: string,
    password: string
    createdAt?: string,
    updatedAt?: string
}

export let users: User[] = [{
    "email": "khongbiet1145@gmail.com",
    "password": "123456"
}]

export const registration = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)

        users.push({
            id: v4(),
            email: email,
            password: hashedPassword,
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        })  

        console.log(users)

        res.json("[LOGIN SUCCESSFULLY]")
    }
    catch (e) {
        res.json({ "error": e }).status(500);
    }
}

export const login = (req: Request, res: Response) => {
    try {
        console.log(req);
        console.log(users);
        return res.json("Login Successfully").status(200);

    } catch (error) {

    }
}

