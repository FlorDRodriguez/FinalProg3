import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAccessToken } from '../libs/jwt.js';
import { tokenSecret } from "../config.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        
        const userFound = await User.findOne({ email });

        if (userFound)
        
            //return res.status(400).json(["El email ya esta registrado"])

            return res.status(400).json({
                message: ["El email ya esta registrado"],
            });

        const passwordHash = await bcrypt.hash(password, 10); //ejecuta 10 veces el algoritmo de encriptacion 

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });
    
        const userSaved = await newUser.save();
        const token = await createAccessToken({id: userSaved._id});
        
        res.cookie('token', token); //si creo el token, guardala en una cookie llamada token con el 
        //valor del token
        res.json({
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const userFound = await User.findOne({email});
        if(!userFound) return res.status(400).json({message: "Usuario no encontrado"});

        const isMatch = await bcrypt.compare(password, userFound.password); 
        //compara las contraseñas
        if(!isMatch) return res.status(400).json({message: "Contraseña incorrecta"});

        const token = await createAccessToken({id: userFound._id});
        
        res.cookie('token', token); //si creo el token, guardala en una cookie llamada token con el 
        //valor del token
        res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updateAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({message: "Uusuario no encontrado"});

    return res.json ({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updateAt,
    })
    res.send("Perfil");
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    
    if (!token) return res.status(401).json({message: "No autorizado."});

    jwt.verify(token, tokenSecret, async (err, user) => {
        if (err) return res.status(401).json({message: "No autorizado."});

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({message: "No autorizado."});

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};

export const logout = async (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });
    return res.sendStatus(200);
};