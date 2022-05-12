import { LinkButton } from "../../components/Button";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <main className={styles.home}>
      <h1>Welcome to Not Hot Dog!</h1>
      <h2>Explore the awesome selection of photos!</h2>
      <LinkButton path="/photos">Start here</LinkButton>
    </main>
  );
};

export default Home;
