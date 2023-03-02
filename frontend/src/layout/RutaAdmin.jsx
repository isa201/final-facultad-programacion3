import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer";

export const RutaAdmin = () => {
  const { auth, cargando } = useAuth();

  if (cargando) {
    return "cargando.....";
  }
  return (
    <>
      <Header></Header>
      {/*si el usuario esta autenticado se muestra la ruta principal de admin sino se redirige al login*/}
          {auth?._id ? <Outlet /> : <Navigate to="/" />}
      <Footer></Footer>
    </>
  );
};
