import { Navigate } from "react-router-dom";
import useStore from "../../store";
import styles from "./LoginView.module.css";

const LoginView = () => {
  const currentUser = useStore((state) => state.currentUser);
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className={styles.LoginView}>
      <h1>Login</h1>
      <form className={styles.LoginView__form}>
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default LoginView;
