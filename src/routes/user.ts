import {Router} from 'express';
import { getAllUser, newUser } from "../controllers/user";
const router = Router();

router.get("/getPerson", getAllUser );
router.post("/newPerson", newUser );

export { router } ;