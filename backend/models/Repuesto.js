import mongoose from "mongoose";

const repuestoSchema = mongoose.Schema(
  {
    //a medida que se agrega un registro se asigna el id automaticamente por mongoDb
    nombre: {
      type: String,
      required: true,
      trim: true, //elimina los espacios en blanco del comienzo y fin
    },
    codigoLocal: {
      type: String,
      required: true,
      trim: true,
    },
    codigoProveedor: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      default: null,
      trim: true,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  {
    timestamps: true,
  }
);

const Repuesto = mongoose.model("Repuesto", repuestoSchema);
export default Repuesto;
