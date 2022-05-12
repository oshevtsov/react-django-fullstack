import styles from "./NotFound.module.css";

const NotFound = () => (
  <main className={styles["not-found"]}>
    <h1>Oops!</h1>
    <h2>Looks like this page does not exist.</h2>
  </main>
);

export default NotFound;
