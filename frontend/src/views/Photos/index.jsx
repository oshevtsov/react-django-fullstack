import { useEffect, useState, useCallback } from "react";
import { API_PHOTO_LIST_VIEW_URL } from "../../settings";
import { PrevButton, NextButton } from "../../components/Button";
import PhotoGallery from "../../components/PhotoGallery";
import styles from "./Photos.module.css";

const Photo = ({ source, title }) => (
  <figure className={styles.photo}>
    <img className={styles.img} src={source} alt={title} />
    <figcaption className={styles.caption}>{title}</figcaption>
  </figure>
);

const Photos = () => {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState(null);

  const makeFetchURL = useCallback(() => {
    const url = new URL(API_PHOTO_LIST_VIEW_URL);
    const searchParams = new URLSearchParams({ page });
    url.search = searchParams.toString();
    return url;
  }, [page]);

  const fetchData = useCallback(async () => {
    const response = await fetch(makeFetchURL());
    const photos = await response.json();
    setPageData(photos);
  }, [makeFetchURL]);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const controlsLegend = `${page} of ${pageData ? Math.ceil(pageData.count / 20) : page
    }`;
  return (
    <main className={styles.photos}>
      <h1>Photos</h1>
      <PhotoGallery
        images={pageData?.results}
        handleClickPrev={() => setPage(page - 1)}
        handleClickNext={() => setPage(page + 1)}
        controlsLegend={controlsLegend}
      />
    </main>
  );
};

export default Photos;
