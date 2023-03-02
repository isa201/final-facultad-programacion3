import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const checkAuth = async (req, res, next) => {
  let token;
  //comprobar si se esta enviando un token por la cabecera y comprobar tambien que tenga el Bearer al comienzo
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //separa cuando haya un espacio y me devuelve un arreglo con las dos  palabras separadas, asigno la posicion 1 para que quede el valor que no tiene el bearer y queda el token solo
      token = req.headers.authorization.split(" ")[1];

      //comprobar el token y verificarlo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //crear una sesion del usuario y almacena el usuario que esta autenticado
      req.usuario = await Usuario.findById(decoded.id).select(
        "-password -token -confirmado"
      );

      return next();
    } catch (error) {
      const err = new Error("token no valido");
      return res.status(403).json({ message: err.message });
    }
  }

  if (!token) {
    const err = new Error("token no valido o inexistente");
    res.status(403).json({ message: err.message });
  }

  next();
};
export default checkAuth;
