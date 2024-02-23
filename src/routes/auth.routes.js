import { Router } from "express";
import { login, register, logout, verifyToken } from '../controllers/auth.controller.js'
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
//import { verifyTokenRequest } from "../../client/src/api/auth.js";

const router = Router();

router.post('/register', validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login );

router.post('/logout', logout );

router.get('/verify', verifyToken );

export default router;