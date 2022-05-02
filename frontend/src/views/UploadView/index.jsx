// import styles from "./ProfileView.module.css";
import RequireAuth from "../../containers/Auth";

const UploadView = () => {
  return (
    <RequireAuth>
      <h1>Upload</h1>
    </RequireAuth>
  );
};

export default UploadView;
