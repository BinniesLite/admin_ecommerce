import { Router } from "express";

import passport from "passport";

import { 
    registration, 
    login 
} from '../controllers/authentication';

const router = Router();

router.post("/register", registration);
router.post("/login", passport.authenticate("local"), login)

export default router;