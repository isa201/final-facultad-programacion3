import React from "react";
import useRepuestos from "../hooks/useRepuestos";
import { Repuesto } from "./Repuesto.jsx";

export const ListaRepuestos = () => {

  const { repuestos } = useRepuestos();
  
  return (
    <>
      {repuestos.length ? (
        <>
          {" "}
          <div className="px-20">
            <h1 className="font-black text-2xl text-center text-orange-700 p-5 bg-orange-200 mb-1 mt-5">
              Listado de repuestos:
            </h1>
            {repuestos.map((repuesto) => (
              <Repuesto key={repuesto._id} repuesto={repuesto}></Repuesto>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="mt-5 font-bold text-orange-200">No hay repuestos</h1>
          <p>Registra tus repuestos para poder verlos aqui...</p>
        </>
      )}
    </>
  );
};
