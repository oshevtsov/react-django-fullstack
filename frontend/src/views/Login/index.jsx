import { SubmitButton } from "../../components/Button";
import { useAuth } from "../../auth";
import {
  useNavigate,
  useNavigationType,
  Navigate,
  useLocation,
} from "react-router-dom";
import styles from "../../styles/form-view.module.css";
import { useState } from "react";

const Login = () => {
  const [loginFail, setLoginFail] = useState(false);
  const { currentUser, logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isServerRoute = useNavigationType() === "POP";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const { username, password } = Object.fromEntries(formData);

    const user = await logIn(username, password);
    if (user) {
      const loginFrom = location.state?.from;
      return navigate(loginFrom ?? "/", { replace: true });
    }
    setLoginFail(true);
  };

  return currentUser && isServerRoute ? (
    <Navigate to="/" replace />
  ) : (
    <main className={styles.container}>
      <h1>Login</h1>
      {loginFail ? (
        <p className="error">
          Login failed! Please make sure you have entered correct credentials.
        </p>
      ) : null}
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
