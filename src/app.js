import express from "express"
import cookieParser from "cookie-parser"

const app = express()


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
//ex: 
import checkRouter from './routes/check.routes.js'


//routes declaration
//ex: 
app.use("/api/check", checkRouter)

export { app }