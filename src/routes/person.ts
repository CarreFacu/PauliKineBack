import {Router} from 'express';
import { getAllPerson, newPerson } from "../controllers/person";
const router = Router();

router.get("/getPerson", getAllPerson );
router.post("/newPerson", newPerson );

export { router } ;