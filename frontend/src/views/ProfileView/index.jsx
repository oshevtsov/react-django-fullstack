import styles from "./ProfileView.module.css";
import RequireAuth from "../../containers/Auth";

const ProfileView = () => {
  return (
    <RequireAuth>
      <main className={styles.ProfileView}>
        <h1>Profile</h1>
      </main>
    </RequireAuth>
  );
};

export default ProfileView;
