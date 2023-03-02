import express from "express";
const router = express.Router();
import checkAuth from "../middleware/authMiddleware.js";

import {
  agregarRepuesto,
  obtenerRepuestos,
  obtenerRepuesto,
  actualizarRepuesto,
  eliminarRepuesto,
} from "../controllers/repuestoController.js";

router.route("/").post(checkAuth, agregarRepuesto).get(checkAuth,obtenerRepuestos);
router
  .route("/:id")
  .get(checkAuth, obtenerRepuesto)
  .put(checkAuth, actualizarRepuesto)
  .delete(checkAuth, eliminarRepuesto);
export default router;
