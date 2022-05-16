import { useCallback, useEffect, useRef, useState } from "react";
import {
  useParams,
  useNavigationType,
  useLocation,
  Outlet,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import {
  API_PHOTO_DETAIL_VIEW_URL,
  API_OWN_PHOTO_DETAIL_VIEW_URL,
  TEXTAREA_MAX_LENGTH,
} from "../../settings";
import Loading from "../Loading";
import { LinkButton, SubmitButton } from "../../components/Button";
import { makeUnauthorizedRequest, makeAuthorizedRequest } from "../../api";
import { useAuth } from "../../auth";

import styles from "../../styles/full-height-view.module.css";
import form from "../../styles/form-view.module.css";
import photoDetail from "./PhotoDetail.module.css";

const PhotoDetailHeader = ({ owner, title, isOwn }) => {
  const header = (
    <>
      <span className={photoDetail.username}>{owner}</span> &#47; {title}
    </>
  );

  return isOwn ? (
    <div className={photoDetail.editHeader}>
      <h1>{header}</h1>
      <LinkButton path="update/">Edit</LinkButton>
    </div>
  ) : (
    <h1>{header}</h1>
  );
};

export const PhotoDetailView = () => {
  const { id, pathname, details } = useOutletContext();
  const canNavigate = useNavigationType() !== "POP";

  const derivePath = (newId) =>
    newId ? pathname.replace(id, newId) : pathname;

  return (
    <>
      <figcaption className={photoDetail.description}>
        {details?.description}
      </figcaption>
      {canNavigate ? (
        <div className={photoDetail.controls}>
          <LinkButton path={derivePath(details?.prev_id)}>Prev</LinkButton>
          <LinkButton path={derivePath(details?.next_id)}>Next</LinkButton>
        </div>
      ) : null}
    </>
  );
};

export const PhotoDetailUpdate = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const [saveFail, setSaveFail] = useState(false);
  const { id, pathname, details, setDetails } = useOutletContext();
  const descriptionRef = useRef(null);

  useEffect(() => {
    descriptionRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formEntries = Object.fromEntries(formData);

    const { ok, status, data } = await makeAuthorizedRequest(
      API_OWN_PHOTO_DETAIL_VIEW_URL(id),
      JSON.stringify(formEntries),
      "PATCH"
    );

    if (!ok) {
      if (status === 401) {
        logOut();
        return navigate("/login", { state: { from: pathname } });
      }
      setSaveFail(true);
    }

    setDetails((prevState) => ({
      ...prevState,
      description: data?.description,
    }));
    navigate("../");
  };

  const className = `${photoDetail.description} ${form.form}`;
  return (
    <form className={className} method="PATCH" onSubmit={handleSubmit}>
      {saveFail ? (
        <p className="error">Update failed! Please try again.</p>
      ) : null}
      <textarea
        placeholder={`Photo description (max ${TEXTAREA_MAX_LENGTH} characters)`}
        name="description"
        rows="1"
        maxLength={TEXTAREA_MAX_LENGTH}
        defaultValue={details?.description}
        ref={descriptionRef}
        autoFocus
        required
      />
      <SubmitButton>Save</SubmitButton>
    </form>
  );
};

const PhotoDetail = () => {
  const [details, setDetails] = useState(null);
  const pathname = useLocation().pathname;
  const { id } = useParams();

  const isOwn = pathname.startsWith("/profile");

  const fetchData = useCallback(async () => {
    if (isOwn)
      return await makeAuthorizedRequest(
        API_OWN_PHOTO_DETAIL_VIEW_URL(id),
        null,
        "GET",
        null
      );
    return await makeUnauthorizedRequest(API_PHOTO_DETAIL_VIEW_URL(id));
  }, [id, isOwn]);

  useEffect(() => {
    fetchData()
      .then((response) => {
        if (response.ok) return setDetails(response.data);
      })
      .catch(console.error);
  }, [fetchData]);

  const className = `${styles.container} ${photoDetail.container}`;
  return details ? (
    <main className={className}>
      <PhotoDetailHeader
        owner={details?.owner}
        title={details?.title}
        isOwn={isOwn}
      />
      <figure>
        <img
          className={photoDetail.image}
          src={details?.source}
          alt={details?.title}
        />
        <Outlet context={{ id, pathname, details, setDetails }} />
      </figure>
    </main>
  ) : (
    <Loading />
  );
};

export default PhotoDetail;
