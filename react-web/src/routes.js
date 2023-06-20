import { Navigate } from "react-router-dom";
import { NotFoundPage, HomePage } from "./pages";
import { Dashboard } from "./pages/Dashboard.jsx";
import { VerifyAccountPage } from "./pages/user/VerifyAccount.tsx";
import { LoginPage } from "./pages/auth/Login";
import { RegisterPage } from "./pages/auth/Register";
import { RecoverPasswordPage } from "./pages/user/RecoverPassword";
import { SetNewPasswordPage } from "./pages/user/SetNewPassword";
import { AddUserAdditionalInfoPage } from "./pages/user/AddAdditionalInfo";
import { ProtectedRoute } from "./components/ProtectedRoute";
import {UserPublications} from "./pages/dashboard/UserPublications";
import {Profile} from "./pages/dashboard/Profile";
import {CreatePublication} from "./pages/dashboard/CreatePublication";

const routes = [
  { path: "/", element: <HomePage /> },
  {
    path: "/auth/*",
    children: [
      { path: "", element: <Navigate to="/auth/login" /> },
      { path: "login", element: <LoginPage /> },
      { path: "registro", element: <RegisterPage /> },
      { path: "*", element: <Navigate to="/auth" replace /> },
    ],
  },
  {
    path: "/dashboard/*",
    children: [
      { path: "", element: <Navigate to="/dashboard/mis-publicaciones" /> },
      { path: "mis-publicaciones", element: <Dashboard ChildComponent={UserPublications} /> },
      { path: "mi-perfil", element: <Dashboard ChildComponent={Profile} /> },
      {
        path: "crear-publication",
        element: <Dashboard ChildComponent={CreatePublication} />,
      },
      { path: "*", element: <Navigate to="/auth" replace /> },
    ],
  },
  { path: "/cuenta/verificar", element: <VerifyAccountPage /> },
  { path: "/cuenta/recuperar", element: <RecoverPasswordPage /> },
  { path: "/cuenta/nuevas-credenciales", element: <SetNewPasswordPage /> },
  {
    path: "/cuenta/agregar-informacion-adicional",
    element: <ProtectedRoute component={AddUserAdditionalInfoPage} />,
  },
  { path: "/not-found", element: <NotFoundPage /> },
  { path: "*", element: <Navigate to={"/not-found"} replace /> },
  { path: "/terminos-y-condiciones", element: <NotFoundPage /> },
];

export default routes;
