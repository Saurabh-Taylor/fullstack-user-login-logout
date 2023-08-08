import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config()

import router from "./router/authRouter.js"
import {connectToDb} from "./config/dbConfig.js"
const app = express()

// init connect to DB
connectToDb()

app.use(express.json())
app.use(cookieParser())



app.use('/',router)

export default app
