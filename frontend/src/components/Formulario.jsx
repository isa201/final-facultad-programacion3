import React, { useEffect } from "react";
import { useState } from "react";
import { Alerta } from "./Alerta.jsx";
import useRepuestos from "../hooks/useRepuestos.jsx";

export const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [codigoLocal, setCodigolocal] = useState("");
  const [codigoProveedor, setCodigoProveedor] = useState("");
  const [descripcion, setDescripcion] = useState("");
  //sirve para saber si se esta modificando o no a traves del id
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  const { guardarRepuesto, repuesto } = useRepuestos();

  //espera algun cambio en el state repuesto
  //las variables se asignan segun como las trae el state
  useEffect(() => {
    if (repuesto?.nombre) {
      setNombre(repuesto.nombre);
      setCodigolocal(repuesto.codigoLocal);
      setCodigoProveedor(repuesto.codigoProveedor);
      setDescripcion(repuesto.descripcion);
      setId(repuesto._id);
    }
  }, [repuesto]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, codigoLocal, codigoProveedor, descripcion].includes("")) {
      setAlerta({
        msg: "Formulario con campos vacios",
        error: true,
      });
      return;
    }

    guardarRepuesto({ nombre, codigoLocal, codigoProveedor, descripcion, id });
    setAlerta({
      msg: "Repuesto guardado correctamente",
    });
    setNombre("");
    setCodigolocal("");
    setCodigoProveedor("");
    setDescripcion("");
  };

  const { msg } = alerta;
  return (
    <>
      <div className="px-20">
        <h1 className="font-black text-2xl text-center text-orange-700 p-5 bg-orange-200 mb-1 mt-5">
          Registro de repuestos:
        </h1>

        <form
          onSubmit={handleSubmit}
          className="font-light text-xl bg-orange-400 mb-5 py-10 px-5"
        >
          <div>
            <label>Nombre:</label>
            <br />
            <input
              id="nombre"
              className="p-1 mb-5 w-full"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />{" "}
            <br />
          </div>

          <div>
            <label>Codigo local:</label>
            <br />
            <input
              id="codigoLocal"
              className="p-1 mb-5 w-full"
              type="text"
              value={codigoLocal}
              onChange={(e) => setCodigolocal(e.target.value)}
            />{" "}
            <br />
          </div>

          <div>
            <label>Codigo proveedor:</label>
            <br />
            <input
              id="codigoProveedor"
              className="p-1 mb-5 w-full"
              type="text"
              value={codigoProveedor}
              onChange={(e) => setCodigoProveedor(e.target.value)}
            />{" "}
            <br />
          </div>

          <div>
            <label>Descripcion</label>
            <br />
            <textarea
              className="p-1 mb-5 w-full"
              name=""
              id="descripcion"
              cols="30"
              rows="5"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
            <br />
          </div>

          <div>
            <input
              className="bg-orange-200  w-full mt-3 p-2 hover:cursor-pointer hover:bg-orange-700"
              type="submit"
              value={id ? "Actualizar repuestos" : "Agregar repuesto"}
            />
          </div>
        </form>
        <div className="mt-5 mb-5">{msg && <Alerta alerta={alerta} />}</div>
      </div>
    </>
  );
};
