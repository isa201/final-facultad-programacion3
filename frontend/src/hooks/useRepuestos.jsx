import { useContext } from "react";
import RepuestosContext from "../context/RepuestosProvider.jsx";

const useRepuestos = () => {
  return useContext(RepuestosContext);
};

export default useRepuestos;
