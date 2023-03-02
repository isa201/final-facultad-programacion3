import express from "express";
const router = express.Router();

//metodos del controlador
import {
  registrarUsuario,
  perfilUsuario,
  confirmarUsuario,
  autenticarUsuario,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
} from "../controllers/usuarioController.js";

import checkAuth from "../middleware/authMiddleware.js";

//RUTAS PARA LAS PETICIONES

//REGISTRAR USUARIO,CONFIRMAR CUENTA E INICIAR SESION
router.post("/", registrarUsuario);
//parametro dinamico(/:nombre_parametro) en la url,con este mismo nombre lo debo asginar a req.params.nombre_parametro
router.get("/confirmar/:token", confirmarUsuario);
router.post("/login", autenticarUsuario);
//Metodos para el Password
router.post("/olvide-password", olvidePassword); //validar email de usuario y verificar que exista y generar un nuevo token
/*
router.get("/olvide-password/:token", comprobarToken); //comprobar token si es valido cuando el usaurio cambia su password
router.post("/olvide-password/:token", nuevoPassword); //almacenar nuevo password

esto se simplifica asi, usando la misma ruta pero si cambia el tipo de peticion:
*/
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

//AUTENTICAR USUARIO Y MANEJO DEL PERFIL
//al visitar esta url ejecuta la funcion del middleware y luego la funcion del controlador
//sirve para verificar que el token del usaurio sea valido y crear la sesion del mismo
router.get("/perfil", checkAuth, perfilUsuario);

export default router;
