import { LinkButton } from "../../components/Button";
import styles from "../../styles/full-height-view.module.css";
import home from "./Home.module.css";

const Home = () => {
  const className = `${styles.container} ${home.container}`;
  return (
    <main className={className}>
      <h1>Welcome to Not Hot Dog!</h1>
      <h2>Explore the awesome selection of photos!</h2>
      <LinkButton path="/photos">Start here</LinkButton>
    </main>
  );
};

export default Home;
