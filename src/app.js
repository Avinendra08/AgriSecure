import express from "express"
import cookieParser from "cookie-parser"

const app = express()


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
//ex: import .......anyRouter from './routes/..........'


//routes declaration
//ex: app.use("/api/any", anyRouter)

export { app }