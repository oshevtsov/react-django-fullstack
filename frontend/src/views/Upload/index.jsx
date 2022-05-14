import { useNavigate, useLocation } from "react-router-dom";
import { makeAuthorizedRequest } from "../../api";
import {
  API_PHOTO_LIST_VIEW_URL,
  API_PHOTO_DETAIL_SOURCE_URL,
} from "../../settings";
import { SubmitButton } from "../../components/Button";
import { useAuth } from "../../auth";
import styles from "../../styles/form-view.module.css";
import upload from "./Upload.module.css";
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
            className={upload.title}
            type="text"
            name="title"
            placeholder="Photo title"
            maxLength="100"
            required
          />
        </label>
        <label>
          File
          <input className={upload.file} type="file" name="source" required />
        </label>
        <label>
          Description
          <textarea
            className={upload.description}
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
