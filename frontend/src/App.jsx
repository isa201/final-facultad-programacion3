import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layout/AuthLayout.jsx";
import { RutaAdmin } from "./layout/RutaAdmin.jsx";
import { Login } from "./pages/Login.jsx";
import { OlvidePassword } from "./pages/OlvidePassword.jsx";
import { ConfirmarCuenta } from "./pages/ConfirmarCuenta.jsx";
import { Registrar } from "./pages/Registrar.jsx";
import { NuevoPassword } from "./pages/NuevoPassword.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { Admin } from "./pages/Admin.jsx";
import { RepuestosProvider } from "./context/RepuestosProvider.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RepuestosProvider>
          <Routes>
            //rutas para el manejo del login
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />}></Route>
              <Route path="registrar" element={<Registrar />}></Route>
              <Route
                path="confirmar-cuenta/:id"
                element={<ConfirmarCuenta />}
              ></Route>
              <Route
                path="olvide-password"
                element={<OlvidePassword />}
              ></Route>
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword />}
              ></Route>
            </Route>
            //proteger ruta para que sde pueda acceder solo si se ha autenticado
            correctamente el usuario
            <Route path="/admin" element={<RutaAdmin />}>
              <Route index element={<Admin />}></Route>
            </Route>
          </Routes>
        </RepuestosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
