// import styles from "./ProfileView.module.css";
import RequireAuth from "../../containers/Auth";

const ProfileView = () => {
  return (
    <RequireAuth>
      <h1>Profile</h1>
    </RequireAuth>
  );
};

export default ProfileView;
