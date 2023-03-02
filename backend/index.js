import express from "express";
import dotenv from "dotenv";
import conectarDb from "./config/db.js";
import cors from "cors";

//por mas que se exporte router se puede colocar el nombre del archivo
import usuarioRoutes from "./routes/usuarioRoutes.js";
import repuestoRoutes from "./routes/repuestoRoutes.js";

//CREACION DEL SERVIDOR EN EXPRESS
const app = express();

app.use(express.json());

//escanear y encontrar variables de entorno
dotenv.config();

//ejecucion de la bd
conectarDb();

//soluciona el error de cors al hacer peticiones en dominios cruzados
app.use(cors({ origin: '*' }))
//RUTAS
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/repuestos", repuestoRoutes);

//puerto para asignar al servidor,si en las variables de entorno(.env) no existe ese puerto se asigna automaticamente el 4000
const PORT = process.env.PORT || 4000;

//ESCUCHAR PUERTO localhost:4000
app.listen(PORT, () => {
  console.log(`SERVIDOR FUNCIONANDO CORRECTAMENTE EN EL PUERTO ${PORT}`);
});
