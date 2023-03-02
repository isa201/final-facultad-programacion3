import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth.jsx";

const RepuestosContext = createContext();

const RepuestosProvider = ({ children }) => {
  const [repuestos, setRepuestos] = useState([]);
  const [repuesto, setRepuesto] = useState({});

  const {auth} = useAuth();

  useEffect(() => {
    const obtenerRepuestos = async () => {
      try {
        const usuarioToken = localStorage.getItem("usuario_token");
        if (!usuarioToken) {
          return;
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuarioToken}`,
          },
        };
        const { data } = await clienteAxios("/repuestos", config);
        setRepuestos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerRepuestos();
  }, [auth]);

  const guardarRepuesto = async (repuesto) => {
    const usuarioToken = localStorage.getItem("usuario_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usuarioToken}`,
      },
    };

    //verifica si modifcar o agregar a traves del id
    if (repuesto.id) {
      try {
        const { data } = await clienteAxios.put(
          `/repuestos/${repuesto.id}`,
          repuesto,
          config
        );

        const repuestosActualizado = repuestos.map((repuestoState) =>
          repuestoState._id === data._id ? data : repuestoState
        );
        setRepuestos(repuestosActualizado);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await clienteAxios.post(
          "/repuestos",
          repuesto,
          config
        );
        //aplicar operador rest asigna a un arreglo los parametros no usados en este caso del objeto repuesto
        const { createdAt, updatedAt, __v, ...repuestoAlmacenado } = data;
        //aplicar spread operator y unir valores
        setRepuestos([repuestoAlmacenado, ...repuestos]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const setEdicion = (repuesto) => {
    setRepuesto(repuesto);
  };

  const eliminarRepuesto = async (id) => {
    const confirmar = confirm("Desea elminar este repuesto?");

    if (confirmar) {
      try {
        const usuarioToken = localStorage.getItem("usuario_token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuarioToken}`,
          },
        };

        const { data } = await clienteAxios.delete(`/repuestos/${id}`, config);
        //sacar repuestos iguales/diferentes
        //trae todos los repeustos diferentes al id que se elimino
        const repuestosActualizado = repuestos.filter(
          (repuestosState) => repuestosState._id !== id
        );
        setRepuestos(repuestosActualizado);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <RepuestosContext.Provider
      value={{
        repuestos,
        guardarRepuesto,
        setEdicion,
        repuesto,
        eliminarRepuesto,
      }}
    >
      {children}
    </RepuestosContext.Provider>
  );
};
export { RepuestosProvider };
export default RepuestosContext;
