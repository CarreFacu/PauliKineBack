import {Router} from 'express';
import { getAllUser, newUser, logIn } from "../controllers/user";
import { validateToken } from '../middleware/authJTW';
const router = Router();

router.get("/getUsers", validateToken, getAllUser );
router.post("/newUser", newUser );
router.post('/login', logIn)

export { router } ;