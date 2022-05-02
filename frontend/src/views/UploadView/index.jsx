import styles from "./UploadView.module.css";
import RequireAuth from "../../containers/Auth";

const UploadView = () => {
  return (
    <RequireAuth>
      <div className={styles.UploadView}>
        <h1>Upload</h1>
      </div>
    </RequireAuth>
  );
};

export default UploadView;
