import Usuario from "../models/Usuario.js";
import generarJWT from "../helper/generarJWT.js";
import generarId from "../helper/generarId.js";
import emailRegistro from "../helper/emailRegistro.js";
import emailOlvidePassword from "../helper/emailOlvidePassword.js";

//controladores para implementar en el routing

//REGISTRAR
const registrarUsuario = async (req, res) => {
  const { email, nombre } = req.body;

  //evistar registros duplicados accediendo por email
  const usuarioExiste = await Usuario.findOne({ email }); //es lo mismo que {email:email}
  if (usuarioExiste) {
    const error = new Error("Error..!! Este Usuario ya esta registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    //Guardar un nuevo usuario con los datos pasados por req para ello creo una instancia del objeto Usuario
    const usuario = new Usuario(req.body);
    const usuarioGuardado = await usuario.save(); //.save es un metodo de mongoose que almacena un nuevo registro en la BD
    //Envio de email
    emailRegistro({ email, nombre, token: usuarioGuardado.token });
    res.json(usuarioGuardado); //me muestra que el json guardado con su datos
    //La siguiente linea se ejecutara solo si se guardo el usuario correctamente ya que posee el await
    console.log("UN NUEVO USUARIO A SIDO REGISTRADO CORRECTAMENTE");
  } catch (error) {
    console.log(error);
  }
};
const perfilUsuario = (req, res) => {
  //obtengo la sesion que sale del middleware
  const { usuario } = req;
  res.json(usuario);
};
const confirmarUsuario = async (req, res) => {
  // console.log(req.params.token); //se coloca el mismo nombre del parametro que se envia por la url en el routing
  //obtengo token por destructuracion
  const { token } = req.params;
  console.log("Token usado: " + token);
  //busco el usuario
  const usuarioAConfirmar = await Usuario.findOne({ token }); //es lo mismo que {token:token}

  //si no encuentra ninguno envia un error
  if (!usuarioAConfirmar) {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    //si lo encuentra se restablece a null el parametro token y cumple la funcion de expirar
    //y por ultimo la cuenta queda confirmada
    usuarioAConfirmar.token = null;
    usuarioAConfirmar.confirmado = true;
    await usuarioAConfirmar.save(); //se guarda nuevamente el usaurio con los parametros ya modificados

    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log("Error al confirmar cuenta de usuario");
  }
};
const autenticarUsuario = async (req, res) => {
  //para autenticar se puede realizar por email y password
  //destructurando obtengo el email y password del formulario o postman cuando sea enviado
  const { email, password } = req.body;

  //encuentra el usuario,lo almacena y comprueba si existe este usuario a traves del email
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  //comprueba si esta confirmado este usuario
  if (!usuario.confirmado) {
    const error = new Error(
      "El usuario no esta confirmado, revisa tu email hemos enviado un correo para que confirmes tu cuenta"
    );
    return res.status(400).json({ msg: error.message });
  }

  //autenticar usuario, comprobar si el password que inicio el usuario es correcto o no
  //utiliza el metodo exclusivo del modelo(comprobarPassword) para comprobar y comparar los password ,verifica si el password que se envia al momento de ingresar coincide con el password que ya esta haseado en la Base de datos
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario.id),
    });
  } else {
    const error = new Error("La contraseña es incorrecta");
    return res.status(400).json({ msg: error.message });
  }
};
//METODOS PARA EL PASSWORD
const olvidePassword = async (req, res) => {
  const { email } = req.body;

  //Busca el usuario a traves del email
  const existeUsuario = await Usuario.findOne({ email });

  //Si existe un usuario le genera un nuevo token al azar y lo vuelve a guardar para que quede almacenado con ese token
  if (!existeUsuario) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeUsuario.token = generarId();
    await existeUsuario.save();
    emailOlvidePassword({
      email,
      nombre: existeUsuario.nombre,
      token: existeUsuario.token,
    });
    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log("error");
  }
};
const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const tokenValido = await Usuario.findOne({ token });

  if (tokenValido) {
    res.json({ msg: "Token valido y el usuario existe" });
  } else {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }
};
const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const usuario = await Usuario.findOne({ token });
  if (!usuario) {
    const error = new Error("Error al crear nueva contraseña");
    return res.status(400).json({ msg: error.message });
  }
  try {
    usuario.token = null;
    usuario.password = password;
    await usuario.save();
    res.json({ msg: "Contraseña modificada correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export {
  registrarUsuario,
  perfilUsuario,
  confirmarUsuario,
  autenticarUsuario,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
};
