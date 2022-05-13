import { useNavigate, useLocation } from "react-router-dom";
import { makeRequest } from "../../api";
import {
  API_PHOTO_LIST_VIEW_URL,
  API_PHOTO_DETAIL_SOURCE_URL,
} from "../../settings";
import { SubmitButton } from "../../components/Button";
import { useAuth } from "../../auth";
import styles from "./Upload.module.css";

const Upload = () => {
  const { logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formEntries = Object.fromEntries(formData);
    const { title, description } = formEntries;

    const jsonResult = await makeRequest(
      API_PHOTO_LIST_VIEW_URL,
      JSON.stringify({ title, description })
    );

    if (!jsonResult.ok) {
      if (jsonResult.status === 401) {
        logOut();
        return navigate("/login", {
          replace: true,
          state: { from: location.pathname, formEntries: formEntries },
        });
      }
      // TODO: Add flash message about the problem
      console.error(`Something went wrong, status: ${jsonResult.status}`);
    }

    const { id } = jsonResult.data;
    const sourceResult = await makeRequest(
      API_PHOTO_DETAIL_SOURCE_URL(id),
      formData,
      "PUT",
      null
    );

    if (!sourceResult.ok) {
      if (sourceResult.status === 401) {
        logOut();
        return navigate("/login", {
          replace: true,
          state: { from: location.pathname, formEntries: formEntries },
        });
      }
      // TODO: Add flash message about the problem
      console.error(`Something went wrong, status: ${sourceResult.status}`);
    }

    navigate("/photos", { replace: true });
  };

  return (
    <main className={styles.upload}>
      <h1>Upload</h1>
      <form className={styles.form} method="POST" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            className={styles.title}
            type="text"
            name="title"
            placeholder="Photo title"
            required
          />
        </label>
        <label>
          File
          <input className={styles.file} type="file" name="source" required />
        </label>
        <label>
          Description
          <textarea
            className={styles.description}
            name="description"
            rows="4"
            placeholder="Write your description (max 160 characters)"
            maxLength="160"
          />
        </label>
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </main>
  );
};

export default Upload;
