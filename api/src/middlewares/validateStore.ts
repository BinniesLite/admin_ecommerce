import { Request, Response, NextFunction } from "express"
import prismaDB from "../../lib/prisma";


export const validateStoreMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { storeId } = req.params;

    const store = await prismaDB.store.findFirst({
        where: {
            id: storeId
        }
    })

    // Attach userId to the request object
    if (store) {
        next(); // Continue to the next middleware or route handler
    } else {
        // Handle the case where userId is not provided in the headers
        res.status(401).send("Unauthorized Accessed");
    }


}