import {Router, Request, Response} from 'express';

const router = Router();

router.get("/getPerson", (req: Request, res:Response)=>{
    console.log('entro aca')
    res.send('soy una nueva ruta get')
    }
)
export default router ;