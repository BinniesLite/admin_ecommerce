import { Request, Response } from 'express';
import prismaDB from "../../lib/prisma";


const getStoreByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body

        const stores = await prismaDB.store.findMany({
            where: {
                userId
            }
        })

        res.status(200).json(stores)
    } catch (error) {
        console.log("[ERROR]")
        res.status(500).json()
    }
}


const createStore = async (req: Request, res: Response) => {
    const { name, userId } = req.body;

    try {
        const store = await prismaDB.store.create({
            data: {
                name: name,
                userId: userId
            }
        })

        res.status(200).json(store)
    } catch (error) {
        console.log(error)
        res.status(500).json({})
    }
}


const getAllStore = async (req: Request, res: Response) => {
    try {
        const stores = await prismaDB.store.findMany();

        res.send(stores).status(200)
    } catch (error) {

    }
}

export {
    getStoreByUserId,
    getAllStore,
    createStore
};
