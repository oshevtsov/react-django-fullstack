import { Link } from "react-router-dom";
import styles from "./Button.module.css";

export const LinkButton = ({ path, children }) => (
  <Link to={path} className={styles["linkButton"]}>
    {children}
  </Link>
);

export const SubmitButton = ({ children }) => (
  <button type="submit" className={styles["submitButton"]}>
    {children}
  </button>
);

const ArrowButton = ({ handleClick, children }) => (
  <button
    type="button"
    onClick={handleClick}
    className={styles["arrowButton"]}
    disabled={!handleClick}
  >
    {children}
  </button>
);

export const PrevButton = ({ handleClick }) => (
  <ArrowButton handleClick={handleClick}>&lang;</ArrowButton>
);

export const NextButton = ({ handleClick }) => (
  <ArrowButton handleClick={handleClick}>&rang;</ArrowButton>
);
