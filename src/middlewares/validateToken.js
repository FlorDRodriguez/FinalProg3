//Fciones que se van a ejecutar antes que lleguen a una ruta
import jwt from "jsonwebtoken";
import { tokenSecret } from "../config.js";

export const authRequired = (req, res, next) => {
    const {token} = req.cookies;
    if (!token) return res.status(401).json ({message: "No existe token. Autorizacion denegada"});

    //si hay un token, hay que verificarlo...
    jwt.verify(token, tokenSecret, (err, user) => {
        if (err) return res.status(401).json({message: "Token invalido"}); 

        req.user = user;

        next();
    })
}