import { useNavigate, useLocation } from "react-router-dom";
import { doRefreshToken, getAuthHeader } from "../../auth";
import {
  API_PHOTO_LIST_VIEW_URL,
  API_PHOTO_DETAIL_SOURCE_URL,
} from "../../settings";
import { SubmitButton } from "../../components/Button";
import { useAuth } from "../../auth";
import styles from "./Upload.module.css";

const getRequestOptions = (body, method, contentType) => {
  const authHeader = getAuthHeader();
  const contentTypeHeader = contentType
    ? { "Content-Type": contentType }
    : null;
  return {
    method: method,
    headers: {
      ...contentTypeHeader,
      ...authHeader,
    },
    body: body,
  };
};

const makeRequest = async (url, body, method, contentType) => {
  const options = getRequestOptions(body, method, contentType);
  let response = await fetch(url, options);

  let data = null;
  if (response.ok) {
    data = await response.json();
  }

  return { ok: response.ok, status: response.status, data: data };
};

const submitData = async (
  url,
  body,
  method = "POST",
  contentType = "application/json"
) => {
  let { ok, status, data } = await makeRequest(url, body, method, contentType);

  if (ok) return { ok, status, data };

  if (status === 401) {
    const success = await doRefreshToken();
    if (success) {
      ({ ok, status, data } = await makeRequest(
        url,
        body,
        method,
        contentType
      ));

      if (ok) return { ok, status, data };
    }
  }

  return { ok: false, status, data: null };
};

const Upload = () => {
  const { setCurrentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formEntries = Object.fromEntries(formData);
    const { title, description } = formEntries;

    const jsonResult = await submitData(
      API_PHOTO_LIST_VIEW_URL,
      JSON.stringify({ title, description })
    );

    if (!jsonResult.ok) {
      if (jsonResult.status === 401) {
        setCurrentUser(null);
        return navigate("/login", {
          replace: true,
          state: { from: location.pathname, formEntries: formEntries },
        });
      }
      // TODO: Add flash message about the problem
      console.error(`Something went wrong, status: ${jsonResult.status}`);
    }

    const { id } = jsonResult.data;
    const sourceResult = await submitData(
      API_PHOTO_DETAIL_SOURCE_URL(id),
      formData,
      "PUT",
      null
    );

    if (!sourceResult.ok) {
      if (sourceResult.status === 401) {
        setCurrentUser(null);
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
