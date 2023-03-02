import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alerta } from "../components/Alerta";
import clienteAxios from "../config/axios";

export const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setAlerta({ msg: "El email es obligatorio", error: true });
      return;
    }
    try {
      const { data } = await clienteAxios.post("/usuarios/olvide-password", {
        email,
      });
      setAlerta({ msg: data.msg });
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
      <div className="font-black text-2xl text-center text-orange-700 p-5 bg-orange-200 w-96 mb-1">
        <h1>Recuperacion de acceso:</h1>
        <p className="text-sm font-normal">
          Por favor revisa tu correo electronico , en breve recibiras un mail
          con las instrucciones para recuperar tu cuenta
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        action=""
        className="p-7 text-center bg-orange-400 w-96"
      >
        <div>
          <label>Email</label>
          <br />
          <input
            className="p-1 mb-5"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <br />
        </div>

        <div>
          <input
            className="bg-orange-200 mt-3 p-2 hover:cursor-pointer hover:bg-orange-700"
            type="submit"
            value="Aceptar"
          />
        </div>
      </form>
      {msg && <Alerta alerta={alerta}></Alerta>}
      <div className="mt-5 text-center">
        <Link to="/">
          ¿Ya tienes una cuenta?{" "}
          <span className="font-bold hover:text-red-800">Inicia sesion</span>
        </Link>
        <br />
      </div>
    </>
  );
};
