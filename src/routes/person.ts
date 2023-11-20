import {Router} from 'express';
import { getAllPerson, newPerson, deletePerson } from "../controllers/person";
import { validateToken } from '../middleware/authJTW';
const router = Router();

router.get("/getPerson", validateToken, getAllPerson );
router.post("/newPerson", validateToken, newPerson );
router.delete("/deletePerson/:idPerson", validateToken, deletePerson );

export { router } ;