import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "../swagger-setup";

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import passport from 'passport';

import routers from './routes';

import { initPassport } from "./passport-config";


import { users } from './controllers/authentication';



dotenv.config();

const app = express();
const port = process.env.PORT || 4000; // Provide a default port if not specified in .env

app.get("/", (req: Request, res: Response) => {
    res.json({"messages": "Hello world"});
});

app.use("/api", routers)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

