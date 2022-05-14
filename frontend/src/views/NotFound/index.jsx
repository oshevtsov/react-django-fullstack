import styles from "../../styles/full-height-view.module.css";
import notFound from "./NotFound.module.css";

const NotFound = () => {
  const className = `${styles.container} ${notFound.container}`;
  return (
    <main className={className}>
      <h1>Oops!</h1>
      <h2>Looks like this page does not exist.</h2>
    </main>
  );
};

export default NotFound;
