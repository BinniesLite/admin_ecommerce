import { Request, Response, NextFunction } from "express"
import prismaDB from "../../lib/prisma";


export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const user = await prismaDB.store.findFirst({
        where: {
            userId: userId
        }
    })

    // Attach userId to the request object
    if (user) {
        next(); // Continue to the next middleware or route handler
    } else {
        // Handle the case where userId is not provided in the headers
        res.status(401).send("Unauthorized Accessed");
    }


}