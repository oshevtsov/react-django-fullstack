import styles from "./LoginView.module.css";

const LoginView = () => {
  return (
    <div className={styles.LoginView}>
      <h1>Login</h1>
      <form className={styles.LoginView__form}>
        <label>
          Email
          <input type="email" name="email" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginView;
