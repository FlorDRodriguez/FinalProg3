import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';

import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));//Para decirle que todos los domimios se pueden comunicar y no salte error

app.use(morgan('dev'));

app.use(express.json()); //sirve para convertir los req body en objeto de js

app.use(cookieParser());

app.use("/api", authRoutes); 

app.use("/api", tasksRoutes); 


export default app;