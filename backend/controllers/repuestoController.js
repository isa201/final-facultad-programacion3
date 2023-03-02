import Repuesto from "../models/Repuesto.js";

const agregarRepuesto = async (req, res) => {
  const repuesto = Repuesto(req.body);
  repuesto.usuario = req.usuario._id;
  try {
    const repuestoAlmacenado = await repuesto.save();
    res.json(repuestoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};
const obtenerRepuestos = async (req, res) => {
  const repuesto = await Repuesto.find().where("usuario").equals(req.usuario);
  res.json(repuesto);
};
const obtenerRepuesto = async (req, res) => {
  const { id } = req.params;
  const repuesto = await Repuesto.findById(id);

  if (!repuesto) {
    res.json({ msg: "Repuesto no encontrado" });
  }

  //comparar id de la sesion con el almacenado en el objeto
  if (repuesto.usuario._id.toString() !== req.usuario._id.toString()) {
    res.json({ msg: "accion no valida" });
  }

  res.json(repuesto);
};

const actualizarRepuesto = async (req, res) => {
  const { id } = req.params;
  const repuesto = await Repuesto.findById(id);

  if (!repuesto) {
    res.json({ msg: "Repuesto no encontrado" });
  }
  //comparar id de la sesion con el almacenado en el objeto
  if (repuesto.usuario._id.toString() !== req.usuario._id.toString()) {
    res.json({ msg: "accion no valida" });
  }

  repuesto.nombre = req.body.nombre || repuesto.nombre;
  repuesto.codigoLocal = req.body.codigoLocal || repuesto.codigoLocal;
  repuesto.codigoProveedor =
    req.body.codigoProveedor || repuesto.codigoProveedor;
  repuesto.descripcion = req.body.descripcion || repuesto.descripcion;

  try {
    const repuestoActualizado = await repuesto.save();
    res.json(repuestoActualizado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarRepuesto = async (req, res) => {
  const { id } = req.params;
  const repuesto = await Repuesto.findById(id);

  if (!repuesto) {
    res.json({ msg: "Repuesto no encontrado" });
  }
  //comparar id de la sesion con el almacenado en el objeto
  if (repuesto.usuario._id.toString() !== req.usuario._id.toString()) {
    res.json({ msg: "accion no valida" });
  }

  try {
    await repuesto.deleteOne();
    res.json({msg: "Repuesto eliminado"});
  } catch (error) {}
};
export {
  agregarRepuesto,
  obtenerRepuestos,
  obtenerRepuesto,
  actualizarRepuesto,
  eliminarRepuesto,
};
