import { Router } from "express";

import { 
    getStoreByUserId, 
    getAllStore 
} from '../controllers/store';

import { getAllProducts } from "../controllers/product";

const router = Router();

router.get("/:storeId/products", getAllProducts);

export default router;