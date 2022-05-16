import { useNavigate, useLocation } from "react-router-dom";
import { makeAuthorizedRequest } from "../../api";
import {
  API_PHOTO_LIST_VIEW_URL,
  API_PHOTO_DETAIL_SOURCE_URL,
  TEXTAREA_MAX_LENGTH,
  TEXT_INPUT_MAX_LENGTH,
} from "../../settings";
import { SubmitButton } from "../../components/Button";
import { useAuth } from "../../auth";
import styles from "../../styles/form-view.module.css";
import { useState } from "react";

const Upload = () => {
  const [uploadFail, setUploadFail] = useState(false);
  const { logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const checkResponse = (response) => {
    if (!response.ok) {
      if (response.status === 401) {
        logOut();
        return navigate("/login", {
          replace: true,
          state: { from: location.pathname },
        });
      }
      setUploadFail(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formEntries = Object.fromEntries(formData);
    const { title, description } = formEntries;

    const jsonResult = await makeAuthorizedRequest(
      API_PHOTO_LIST_VIEW_URL,
      JSON.stringify({ title, description })
    );
    checkResponse(jsonResult);

    const { id } = jsonResult.data;
    const sourceResult = await makeAuthorizedRequest(
      API_PHOTO_DETAIL_SOURCE_URL(id),
      formData,
      "PUT",
      null
    );
    checkResponse(sourceResult);

    navigate(`/profile/${id}`, { replace: true });
  };

  return (
    <main className={styles.container}>
      <h1>Upload</h1>
      {uploadFail ? (
        <p className="error">Upload failed! Please try again.</p>
      ) : null}
      <form className={styles.form} method="POST" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            placeholder={`Photo title (max ${TEXT_INPUT_MAX_LENGTH} characters)`}
            maxLength={TEXT_INPUT_MAX_LENGTH}
            required
          />
        </label>
        <label>
          File
          <input type="file" name="source" required />
        </label>
        <label>
          Description
          <textarea
            name="description"
            rows="4"
            placeholder={`Write your description (max ${TEXTAREA_MAX_LENGTH} characters)`}
            maxLength={TEXTAREA_MAX_LENGTH}
          />
        </label>
        <SubmitButton>Submit</SubmitButton>
      </form>
    </main>
  );
};

export default Upload;
