import Logo from "../../components/Logo";
import styles from "./HomeView.module.css";

const HomeView = () => {
  return (
    <div className={styles.HomeView}>
      <header className={styles.HomeView__header}>
        <Logo />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={styles.HomeView__link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default HomeView;
