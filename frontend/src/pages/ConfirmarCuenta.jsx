import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../config/axios.jsx";
import { Alerta } from "../components/Alerta";
import { Link } from "react-router-dom";

export const ConfirmarCuenta = () => {
  const params = useParams();
  const { id } = params;
  const [cuentaConfirmada, setCuentaConfirmada] = useState("");
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clienteAxios(url); //peticion get por defecto
        setCuentaConfirmada(true);
        setAlerta({ msg: data.msg });
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }

      setCargando(false);
    };

    confirmarCuenta();
  }, []);

  return (
    <>
      <div>{!cargando && <Alerta alerta={alerta} />}</div>
      {cuentaConfirmada && (
        <Link to="/" className="font-bold text-orange-300 hover:text-white">
          Iniciar sesion
        </Link>
      )}
    </>
  );
};
