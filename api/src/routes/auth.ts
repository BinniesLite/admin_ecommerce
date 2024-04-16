import { Router } from "express";

import { 
    registration, 
    login 
} from '../controllers/authentication';

const router = Router();

router.post("/register", registration);
router.post("/login", login)

export default router;