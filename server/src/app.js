import express from "express";
import dotenv  from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

dotenv.config({
    path: "./.env"
})

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

if(process.env.NODE_ENV === "development"){
   app.use(morgan("dev"));
}else{
    app.use(morgan("combined"));
}

app.get("/",(req, res)=>{
    res.send("API is running...");
})

import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users", userRouter)

export { app }