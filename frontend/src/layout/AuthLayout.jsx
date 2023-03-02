import React from "react";
import { Outlet } from "react-router-dom";
export const AuthLayout = () => {
  return (
    <>
      <h2 className="font-black text-2xl text-center text-orange-400 p-20 bg-orange-900 mb-9">
        Bienvenido al ADMINISTRADOR DE REPUESTOS
      </h2>
      <main className="flex flex-col justify-center items-center">
        <Outlet></Outlet>
      </main>
    </>
  );
};
