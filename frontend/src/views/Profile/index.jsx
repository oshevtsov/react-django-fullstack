import { API_OWN_PHOTO_LIST_VIEW_URL } from "../../settings";
import PhotoGrid from "../shared/PhotoGrid";

const Profile = () => (
  <PhotoGrid apiURL={API_OWN_PHOTO_LIST_VIEW_URL} requireAuth={true} />
);

export default Profile;
