import { Link } from "react-router-dom";
import styles from "./Button.module.css";

const LinkButton = ({ size, path, children }) => {
  const btnSizeClass = styles[`button-${size}`];
  const btnClassName = `${styles.button} ${btnSizeClass}`;
  return (
    <Link to={path} className={btnClassName}>
      {children}
    </Link>
  );
};

export default LinkButton;
