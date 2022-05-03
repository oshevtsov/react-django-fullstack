import LinkButton from "../../components/Button";
import styles from "./HomeView.module.css";

const HomeView = () => {
  return (
    <main className={styles.HomeView}>
      <h1>Welcome to Not Hot Dog!</h1>
      <h2>Explore the awesome selection of photos!</h2>
      <LinkButton path="/photos" size="large">
        Start here
      </LinkButton>
    </main>
  );
};

export default HomeView;
