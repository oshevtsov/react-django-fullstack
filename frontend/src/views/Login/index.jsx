import { SubmitButton } from "../../components/Button";
import { useAuth } from "../../auth";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const { currentUser, logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const loginFrom = location.state?.from;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const { username, password } = Object.fromEntries(formData);

    const user = await logIn(username, password);
    if (!user) {
      const routerState = { message: "Failed to log in, please try again" };
      if (loginFrom) routerState.from = loginFrom;
      navigate(location.pathname, {
        replace: true,
        state: routerState,
      });
    } else {
      navigate(loginFrom ?? "/", { replace: true });
    }
  };

  return currentUser ? (
    <Navigate to="/" replace />
  ) : (
    <main className={styles.login}>
      <h1>Login</h1>
      <form className={styles.form} method="POST" onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <SubmitButton>Submit</SubmitButton>
      </form>
    </main>
  );
};

export default Login;
