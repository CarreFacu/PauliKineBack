import express from 'express'
import cors from 'cors'
import 'dotenv/config'



import {router} from "./routes"
import db from "./config/mongo"

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors())
//import all ruotes , no need user other app.use
app.use(router)
db.then(()=>console.log("Successfully connected to MongoDB."))
app.listen(PORT, ()=> console.log(`escuchando en el puerto ${PORT}`))