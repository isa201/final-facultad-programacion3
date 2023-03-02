import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Alerta } from "../components/Alerta";
import clienteAxios from "../config/axios.jsx";

export const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validaciones para el formulario al momento de enviarlo

    //revisar si estan los campos vacios
    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Hay campos vacios en el formulario", error: true });
      return;
    }
    //comparar contraseñas
    if (password !== repetirPassword) {
      setAlerta({ msg: "Las contraseñas no son iguales", error: true });
      return;
    }
    //largo de la contraseña
    if (password.length < 6) {
      setAlerta({
        msg: "Contraseña muy corta, debe poseer al menos 6 caracteres",
        error: true,
      });
      return;
    }
    setAlerta({});
    try {
      //url del backend, y por el metodo post le vooy a enviar los campos del formulario

      const respuesta = await clienteAxios.post("/usuarios", {
        nombre,
        email,
        password,
      });
      console.log(respuesta);
      setAlerta({
        msg: "El usuario ha sido creado existosamente, revisa tu email",
        error: false,
      });
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
      <div className="font-black text-2xl text-center text-orange-700 p-5 bg-orange-200 w-96 mb-1">
        Crea tu cuenta
      </div>

      <div>
        {" "}
        <form
          onSubmit={handleSubmit}
          className="p-7 text-center bg-orange-400 w-96"
        >
          <div>
            <label>Nombre</label>
            <br />
            <input
              className="p-1 mb-5"
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            />{" "}
            <br />
          </div>

          <div>
            <label>Email</label>
            <br />
            <input
              className="p-1 mb-5"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />{" "}
            <br />
          </div>

          <div>
            <label>Contraseña</label>
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
            <label>Repetir contraseña</label>
            <br />
            <input
              className="p-1 mb-5"
              type="password"
              value={repetirPassword}
              onChange={(e) => {
                setRepetirPassword(e.target.value);
              }}
            />{" "}
            <br />
          </div>

          <div>
            <input
              className="bg-orange-200 mt-3 p-2 hover:cursor-pointer hover:bg-orange-700"
              type="submit"
              value="Registrar"
            />
          </div>
        </form>
        <div>
          <div className="mt-5 text-center">
            <Link to="/">
              ¿Ya tienes una cuenta?{" "}
              <span className="font-bold hover:text-red-800">
                Inicia sesion
              </span>
            </Link>
            <br />
            <Link
              to="/olvide-password"
              className="hover:text-red-800 hover:font-bold"
            >
              Recuperar contraseña
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
