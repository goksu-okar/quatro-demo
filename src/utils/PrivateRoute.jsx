import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./helpers.js";

export default function PrivateRoute () {
  return (
    isAuthenticated() ? <Outlet /> : <Navigate to="/"/>
  )
}
