import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const setLinkStyle = ({ isActive }) => (isActive ? styles.active : null);
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.navbar__brand}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <ul className={styles.navbar__menu}>
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
            <NavLink className={setLinkStyle} to="/login">
              Log in
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
