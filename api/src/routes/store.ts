import { Router } from 'express'
import { 
    getStoreByUserId,  
    createStore
} from '../controllers/store';

import { authorizedUser } from '../middlewares/user/authorizedUser';

const router = Router();

// Make sure store routers have the userId
router.use(authorizedUser)

router.get("/", getStoreByUserId)

router.post("/create-store", createStore)

export default router;