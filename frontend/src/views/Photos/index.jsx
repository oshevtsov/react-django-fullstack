import { API_PHOTO_LIST_VIEW_URL } from "../../settings";
import PhotoGrid from "../shared/PhotoGrid";

const Photos = () => (
  <PhotoGrid apiURL={API_PHOTO_LIST_VIEW_URL} requireAuth={false} />
);

export default Photos;
