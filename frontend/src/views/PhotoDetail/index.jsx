import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigationType } from "react-router-dom";
import { API_PHOTO_DETAIL_VIEW_URL } from "../../settings";
import styles from "./PhotoDetail.module.css";
import Loading from "../Loading";

const PhotoDetail = () => {
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const navigationType = useNavigationType();

  const fetchData = useCallback(async () => {
    const response = await fetch(API_PHOTO_DETAIL_VIEW_URL(id));
    if (response.ok) {
      const data = await response.json();
      setDetails(data);
    }
  }, [id]);

  useEffect(() => {
    fetchData().catch(console.error);
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
