import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authorizedUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Get the token from the header
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    
        // Use the userId from the token to query data
        const userId = decoded.userId;
        // Proceed with your logic, for example, querying user-specific data
      } catch (error) {
        // Handle error (e.g., token is invalid or expired)
        res.status(401).json({ message: 'Authentication failed' });
      }

}