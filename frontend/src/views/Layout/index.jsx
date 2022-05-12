import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth";
import Navigation from "../../components/Navigation";
import styles from "./Layout.module.css";

export const Protected = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Layout;
