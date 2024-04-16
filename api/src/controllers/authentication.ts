import { Request, Response } from "express"
import prisma from "../utils/prisma"
import bcrypt from "bcrypt"
import { v4 } from "uuid";

interface User {
    id: string,
    email: string,
    password: string
    createdAt: string,
    updatedAt: string
}

export let users: User[] = []

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


    }
    catch (e) {
        res.json({ "error": e }).status(500);
    }
}

export const login = (req: Request, res: Response) => {
    try {

    } catch (error) {

    }
}

