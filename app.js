import express from "express"
import dotenv from "dotenv"
dotenv.config()

import router from "./router/authRouter.js"
import {connectToDb} from "./config/dbConfig.js"
const app = express()

// init connect to DB
connectToDb()

app.use(express.json())




app.use('/',router)

export default app
