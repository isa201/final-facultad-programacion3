import jwt from "jsonwebtoken";
const generarJWT = (id) => {
    //al generar se usa sign({datos_a_transformar} , secret_key(importada de las variables de entorno) , {opciones_de_expiracion})
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d",
    });
};
export default generarJWT;
