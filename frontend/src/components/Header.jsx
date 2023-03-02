import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

export const Header = () => {
  const { cerrarSesion } = useAuth();
  return (
    <>
      <header className="py-10  bg-orange-900">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
          <h1 className="text-orange-400  font-black text-2xl uppercase pl-10">
            Panel de administracion ✍
          </h1>

          <nav className="flex gap-4 text-xl pr-10">
            <Link
              className="text-orange-400 font-black hover:text-white "
              to="/admin"
            >
              Repuestos{" "}
            </Link>
         
            <button
              type="button"
              className=" hover:text-white font-black text-slate-500 cursor-pointer "
              onClick={cerrarSesion}
            >
              Cerrar sesion
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};
