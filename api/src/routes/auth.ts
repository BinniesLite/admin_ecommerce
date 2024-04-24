import { Router } from "express";

import { 
    register, 
    login,
    isValidJWT 
} from '../controllers/authentication';

const router = Router();

router.post("/register", register);
router.post("/login", login)
router.post("/isUser", isValidJWT)

export default router;