// Like their main job is to hold data and do something with 
// that data
// I need more lol

import { Request, Response } from "express";

const getAllProducts = (req: Request, res: Response) => {
    try { 
        const { storeId } = req.params;

        const products = prisma.product.findMany({
            where: {
                storeId
            }
        })

        res.json(products).status(200);
    }
    catch (e) {
        res.json({"[ERROR_PRODUCTS]": e}).status(500);
    }
}

export {
    getAllProducts
}