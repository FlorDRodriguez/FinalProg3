import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();

app.use(morgan('dev'));

app.use(express.json()); //sirve para convertir los req body en objeto de js

app.use(cookieParser());

app.use("/api", authRoutes); 

app.use("/api", tasksRoutes); 


export default app;