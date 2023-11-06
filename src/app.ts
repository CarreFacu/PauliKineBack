import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import PersonRoute from "./routes/person"

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors())
app.use('/api/person', PersonRoute)
app.listen(PORT, ()=> console.log(`escuchando en el puerto ${PORT}`))