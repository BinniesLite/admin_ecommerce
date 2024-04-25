import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prismaDB from "../../../lib/prisma";

export const authorizedUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const token = req.headers.authorization.split(' ')[1]; // Get the token from the header
        console.log(token)
        const decoded: any = jwt.verify(token, process.env.AUTH_SECRET);
        // Use the userId from the token to query data
        const userId = decoded.userId;
        // Proceed with your logic, for example, querying user-specific data
        
        const user = prismaDB.user.findUnique({
          where: {
            id: userId
          }
        })

        if (!user) {
          res.status(401).json({})
        }
        
        req.body.userId = userId
        next()
      } catch (error) {
        // Handle error (e.g., token is invalid or expired)
        res.status(401).json({ message: 'Authentication failed' });
      }

}