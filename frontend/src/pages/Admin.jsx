import React from "react";
import { useState } from "react";
import { Formulario } from "../components/Formulario.jsx";
import { ListaRepuestos } from "../components/ListaRepuestos.jsx";

export const Admin = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="text-center ">
          <button
            type="button"
            className="mt-5 font-black text-2xl text-orange-700 px-24 py-2 bg-orange-200 hover:cursor-pointer hover:text-white hover:bg-orange-700 md:hidden"
            onClick={() => {
              setMostrarFormulario(!mostrarFormulario);
            }}
          >
            {mostrarFormulario ? "Mostrar formulario" : "Ocultar formulario"}
          </button>
        </div>

        <div
          className={`${
            !mostrarFormulario ? "block" : "hidden"
          } md:w-1/2 lg:w-2/5`}
        >
          <Formulario></Formulario>
        </div>

        <div className="md:w-1/2 lg:w-3/5">
          <ListaRepuestos></ListaRepuestos>
        </div>
      </div>
    </>
  );
};
