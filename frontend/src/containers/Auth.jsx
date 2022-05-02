import { useLocation, Navigate } from "react-router-dom";
import useStore from "../store";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const currentUser = useStore((state) => state.currentUser);
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
