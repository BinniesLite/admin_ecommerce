import { Router } from 'express';

import storeRouter from "./store";
import productRouter from "./products"
import authRouter from "./auth"

import { authorizedUser } from '../middlewares/user/authorizedUser';

const router = Router();

storeRouter.use(authorizedUser)

const appRoutes = [
    {
        path: "/store",
        route: storeRouter
    },
    {
        path: "/product",
        route: productRouter
    },
    {
        path: "/auth",
        route: authRouter
    },
]

appRoutes.forEach((route) => router.use(route.path, route.route))

export default router;