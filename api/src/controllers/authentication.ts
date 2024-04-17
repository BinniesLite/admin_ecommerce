import { Request, Response } from "express"
import prisma from "../utils/prisma"
import bcrypt from "bcrypt"
import { v4 } from "uuid";

import { User } from "@prisma/client";

import passport from "passport"



export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as User;

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser: User = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        
        if (existingUser) {
            res.json({ "error" : "User already exist"})
        }
        
        await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        })
   
        res.json({ "success": "User created"}).status(200)
    }
    catch (e) {
        res.json({ "error": e }).status(500);
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as User;
        
        const existingUser: User = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!existingUser) {
            res.json({ "error": "User doesn't exist"}).status(403)
        }
        

        


        return res.json("Login Successfully").status(200);

    } catch (error) {

    }
}

