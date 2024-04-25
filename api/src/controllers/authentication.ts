import { Request, Response } from "express"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


import { User } from "@prisma/client";

import { MAX_AGE, createToken } from "../../lib/create-token";

import prisma from "../utils/prisma"
import prismaDB from "../../lib/prisma";


export const isValidJWT = async (req: Request, res: Response) => {
    try {
        
        const token = req.headers.authorization.split(' ')[1]; // Get the token from the header
        
        const decoded: any = jwt.verify(token, process.env.AUTH_SECRET);

        // Use the userId from the token to query data
        const userId = decoded.userId;
        // Proceed with your logic, for example, querying user-specific data
        
        const isUserExist = await prismaDB.user.findFirst({
            where: {
                id: userId
            }
        })

        if (!isUserExist) {
            res.status(401).json({ message: 'Authentication failed' });
        }

        res.status(200).json({"success": "you slay btw"})
    } catch (error) {
        // Handle error (e.g., token is invalid or expired)
        res.status(401).json({ message: 'Authentication failed' });
    }
}

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

        console.log(existingUser);
        
        if (!existingUser || !await bcrypt.compare(password, existingUser.password)) {
            res.status(401).json({"error": "Invalid email or password" });
            return;
        }

        
        // Now create the token
        const token = createToken({ "userId": existingUser.id});
      
        res.cookie("jwt", token, { maxAge: MAX_AGE * 1000, httpOnly: true})

        res.status(200).json(
            {"id": existingUser.id, email: existingUser.email});
        
        return 
    } catch (error) {
        console.log("[AUTHENTICATION]", error)
    }
}

