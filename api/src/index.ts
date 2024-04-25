import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "../swagger-setup";

import session from "express-session";

import 'dotenv/config'

// import session from "express-session"

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// import passport from 'passport';

import routers from './routes';

import cookieParser from 'cookie-parser';

import cors from "cors";

import { corsOptions } from "../config/cors.config";
import jwt from 'jsonwebtoken';


dotenv.config();


const app = express();
const port = process.env.PORT || 4000; // Provide a default port if not specified in .env




// Trust Proxy for Proxies (Heroku, Render.com, etc)
// https://stackoverflow.com/questions/40459511/in-express-js-req-protocol-is-not-picking-up-https-for-my-secure-link-it-alwa
app.enable("trust proxy")

app.use(express.json());
app.use(express.urlencoded());



app.use(cookieParser());


app.use(cors(corsOptions))

app.get("/", (req: Request, res: Response) => {
    res.json({ "messages": "Hello world" });
});

app.use("/api/v1", routers)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/set-cookie", (req: Request, res: Response) => {
    res.cookie("newUser", false, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.cookie("user-token", false, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

    res.send("Get some cookie y'all")
})

app.get("/read-cookie", (req: Request, res: Response) => {
    const cookies = req.cookies
    console.log(cookies)
    res.json(cookies)
})

app.get("/test-jwt", (req: Request, res: Response) => {
    try {
        
        const token = req.headers.authorization.split(' ')[1]; // Get the token from the header
        
        const decoded: any = jwt.verify(token, process.env.AUTH_SECRET);

        // Use the userId from the token to query data
        const userId = decoded.userId;
        // Proceed with your logic, for example, querying user-specific data
        console.log(userId)
        res.status(200).json({"success": "you slay btw"})
    } catch (error) {
        // Handle error (e.g., token is invalid or expired)
        res.status(401).json({ message: 'Authentication failed' });
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

