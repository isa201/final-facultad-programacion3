//modelo usuario
import mongoose from "mongoose";
//hasear password
import bcrypt from "bcrypt";
//importar generador de id
import generarId from "../helper/generarId.js";

const usuarioSchema = mongoose.Schema({
  //a medida que se agrega un registro se asigna el id automaticamente por mongoDb
  nombre: {
    type: String,
    required: true,
    trim: true, //elimina los espacios en blanco del comienzo y fin
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // asegurar que solo se usa un email por cuenta de usuario
    trim: true,
  },
  telefono: {
    type: String,
    default: null,
    trim: true,
  },
  //verificaciones para el usuario
  token: {
    type: String,
    default: generarId(), //genera un token unico para el usuario
  },
  //si se registra el usuario recibe un email y si visita el enlace se confirma el usuario finalmente
  confirmado: {
    type: Boolean,
    default: false,
  },
});

//antes de almacenar el registro se podra hashear password
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //rondas de hasheo
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// methods sirve para ejecutar funciones del modelo solamente
//.compare compara los dos password el haseado y el que no
usuarioSchema.methods.comprobarPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password);
};

//registrar en moongose como un modelo para poder interactuar con la base de datos
//recibe el nombre y el schema creado
const Usuario = mongoose.model("Usuario", usuarioSchema);

//importarlo para poder realizar las interaciones de la base de datos
export default Usuario;
