import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { isAuth, role } = useSelector((state) => state.auth);
  return isAuth && role === "admin" ? children : <Navigate to="/" />;
};
export default AdminRoute;
