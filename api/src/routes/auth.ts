import { Router } from "express";

import passport from "passport";

import { 
    register, 
    login 
} from '../controllers/authentication';

const router = Router();

router.post("/register", register);
router.post("/login", passport.authenticate("local"), login)

export default router;