import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import { Alerta } from "../components/Alerta.jsx";

export const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setAlerta({ msg: "Coloca tu nuevo password" });
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: "Error en el enlace",
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe contener mas de 6 caracteres",
        error: true,
      });
      return;
    }
    try {
      const url = `/usuarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg,
      });
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      {msg && <Alerta alerta={alerta}></Alerta>}
      {tokenValido && (
        <div>
          <form onSubmit={handleSubmit} action="">
            <div>Crea una nueva contraseña:</div>
            <div>
              <label>Nueva Contraseña</label>
              <br />
              <input
                className="p-1 mb-5"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />{" "}
              <br />
            </div>

            <div>
              <input
                className="bg-orange-200 mt-3 p-2 hover:cursor-pointer hover:bg-orange-700"
                type="submit"
                value="Guardar"
              />
            </div>
          </form>
        </div>
      )}

      {passwordModificado && (
        <Link to="/">
          ¿Ya tienes una cuenta?{" "}
          <span className="font-bold hover:text-red-800">Inicia sesion</span>
        </Link>
      )}
    </>
  );
};
