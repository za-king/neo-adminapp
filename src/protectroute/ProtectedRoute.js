import { Navigate, Outlet } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const useAuth =() =>{
  
}


const ProtectedRoute = ({ children }) => {
  const auth = cookies.get("token");

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
