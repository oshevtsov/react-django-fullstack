import styles from "../../styles/full-height-view.module.css";
import loading from "./Loading.module.css";

const Loading = () => {
  const className = `${styles.container} ${loading.container}`;
  return (
    <main className={className}>
      <h1>
        Loading
        <span className={loading.ellipsis}>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </h1>
    </main>
  );
};

export default Loading;
