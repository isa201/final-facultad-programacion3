//CREACION de la conexion DE LA BASE DE DATOS

import mongoose from "mongoose";
const conectarDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`MONGO DB CONECTADO EN: ${url}`);
  } catch (error) {
    console.log("ERROR AL CONECTAR LA BASE DE DATOS: ");
    console.log(error.message);
  }
};

export default conectarDb;
