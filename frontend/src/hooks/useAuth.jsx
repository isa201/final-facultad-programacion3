import { useContext } from 'react';
import AuthContext from "../context/AuthProvider.jsx";

const useAuth = () => {
  //use context hace posible utilizar los valores del provider
  return useContext(AuthContext);
};

export default useAuth;
