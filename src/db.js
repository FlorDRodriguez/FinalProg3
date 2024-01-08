import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect("mongodb://127.0.0.1/prog3DB");
        console.log(">>>>>>>>>>Base de Datos Conectada");
    } catch (error) {
        console.log(error);
    }
};