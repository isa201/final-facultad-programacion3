import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios.jsx";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const autenticarUsuario = async () => {
      const usuarioToken = localStorage.getItem("usuario_token");
      if (!usuarioToken) {
        setCargando(false);
        return;
      }

      const config = {
        //esto emula lo que postman envia en authorization
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuarioToken}`,
        },
      };

      try {
        const { data } = await clienteAxios("usuarios/perfil", config);
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSesion =()=>{
    localStorage.removeItem("usuario_token");
    setAuth({});
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, cargando ,cerrarSesion}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
