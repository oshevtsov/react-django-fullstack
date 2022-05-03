import styles from "./UploadView.module.css";
import RequireAuth from "../../containers/Auth";

const UploadView = () => {
  return (
    <RequireAuth>
      <main className={styles.UploadView}>
        <h1>Upload</h1>
      </main>
    </RequireAuth>
  );
};

export default UploadView;
