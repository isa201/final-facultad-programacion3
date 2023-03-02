import React from "react";
import useRepuestos from "../hooks/useRepuestos";

export const Repuesto = ({ repuesto }) => {

  const { nombre, codigoLocal, codigoProveedor, descripcion, _id } = repuesto;
  const { setEdicion, eliminarRepuesto } = useRepuestos();

  return (
    <>
      <div className="cursor-pointer">
        <p className="font-light bg-white hover:bg-orange-400  px-10 py-10 text-center mt-1 mb-1">
          NOMBRE: <span>{nombre}</span>
          <br />
          CODIGO LOCAL: <span>{codigoLocal}</span>
          <br />
          CODIGO PROVEEDOR: <span>{codigoProveedor}</span>
          <br />
          DESCRIPCION: <span>{descripcion}</span>
          <br />
          
          <button
            className="mr-5 mt-2 bg-blue-400  p-2 hover:bg-orange-800"
            onClick={() => setEdicion(repuesto)}
          >
            Modificar
          </button>

          <button
            className="  bg-red-400 p-2 hover:bg-orange-800"
            onClick={() => eliminarRepuesto(_id)}
          >
            Eliminar
          </button>
        </p>
      </div>
    </>
  );
  return <div>Desde repuesto</div>;
};
