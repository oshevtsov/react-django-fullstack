import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../auth";
import Logo from "../Logo";
import styles from "./Navigation.module.css";

const setLinkStyle = ({ isActive }) => (isActive ? styles.active : null);

const AuthLink = () => {
  const { currentUser, logOut } = useAuth();

  return currentUser ? (
    <Link onClick={logOut} to="/" replace>
      Log out
    </Link>
  ) : (
    <NavLink className={setLinkStyle} to="/login">
      Log in
    </NavLink>
  );
};

const Navigation = () => {
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.brand}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <NavLink className={setLinkStyle} to="/photos">
              Photos
            </NavLink>
          </li>
          <li>
            <NavLink className={setLinkStyle} to="/profile">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink className={setLinkStyle} to="/upload">
              Upload
            </NavLink>
          </li>
          <li>
            <AuthLink />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
