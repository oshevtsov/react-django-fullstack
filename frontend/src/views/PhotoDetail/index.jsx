import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { API_PHOTO_DETAIL_VIEW_URL } from "../../settings";
import { makeUnauthorizedRequest } from "../../api";
import styles from "./PhotoDetail.module.css";
import Loading from "../Loading";

const PhotoDetail = () => {
  const [details, setDetails] = useState(null);
  const location = useLocation();
  const { id } = location.state;
  const navigationType = useNavigationType();

  const fetchData = useCallback(async () => {
    return await makeUnauthorizedRequest(API_PHOTO_DETAIL_VIEW_URL(id));
  }, [id]);

  useEffect(() => {
    fetchData()
      .then((response) => {
        if (response.ok) return setDetails(response.data);
      })
      .catch(console.error);
  }, [fetchData]);

  const header = (
    <>
      <span className={styles.username}>{details?.owner}</span> &#47;{" "}
      {details?.title}
    </>
  );

  const canNavigate = navigationType !== "POP";
  return details ? (
    <main className={styles["photo-detail"]}>
      <h1>{header}</h1>
      <img
        className={styles.image}
        src={details?.source}
        alt={details?.title}
      />
      <p className={styles.description}>{details?.description}</p>
    </main>
  ) : (
    <Loading />
  );
};

export default PhotoDetail;
