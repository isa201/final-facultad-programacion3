import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alerta } from "../components/Alerta.jsx";
import useAuth from "../hooks/useAuth.jsx";
import clienteAxios from "../config/axios.jsx";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos del formulario son obligatorios",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post("/usuarios/login", {
        email,
        password,
      });
      
      localStorage.setItem("usuario_token", data.token);
      setAuth(data);
      navigate("/admin");
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
        INICIAR SESION:
      </div>

      <div>
        {msg && <Alerta alerta={alerta} />}
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
            <input
              className="bg-orange-200 mt-3 p-2 hover:cursor-pointer hover:bg-orange-700"
              type="submit"
              value="Ingresar"
            />
          </div>
        </form>
        <div>
          <div className="mt-5 text-center">
            <Link to="/registrar">
              ¿No posees una cuenta?
              <span className="font-bold hover:text-red-800">
                {" "}
                Registrate aqui
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
