import { Request, Response } from "express"
import prisma from "../utils/prisma"
import bcrypt from "bcrypt"

import { User } from "@prisma/client";

import { MAX_AGE, createToken } from "../../lib/create-token";

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
            res.json({"error" : "User already exist"}).status(403)
            return 
        }
        
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        })

        const token = createToken({"userId": existingUser.id});
        res.cookie("Hello", "it's me")
        // add it to the cookies of the browser
        // console.log(token)
        res.cookie("authToken", token, { maxAge: MAX_AGE * 1000, httpOnly: true})
   
        res.status(200).json(user)

    }
    catch (e) {
        res.json({ "error": e }).status(500);
    }
}

export const login = async (req: Request, res: Response) => {
    try {

        // This makes it set the cookies lmao
        
        const { email, password } = req.body as User;
        
        const existingUser: User = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        
        if (!existingUser || !await bcrypt.compare(password, existingUser.password)) {
            res.status(401).json({ "error": "Invalid email or password" });
            return;
        }

      
        // Now create the token
        const token = createToken({ "userId": existingUser.id});
      
        res.cookie("authToken", token, { maxAge: MAX_AGE * 1000, httpOnly: true})

        res.status(200).json(
            {"id": existingUser.id, email: existingUser.email});
        
        return 
    } catch (error) {
        console.log("[AUTHENTICATION]", error)
    }
}

