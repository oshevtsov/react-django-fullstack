import { useEffect, useState, useCallback } from "react";
import { API_PHOTO_LIST_VIEW_URL } from "../../settings";
import { PrevButton, NextButton } from "../../components/Button";
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
  return (
    <main className={styles.photos}>
      <h1>Photos</h1>
      <div className={styles.container}>
        {pageData &&
          pageData?.results.map(({ id, source, title }) => (
            <Photo key={id} source={source} title={title} />
          ))}
      </div>
      <div>
        <PrevButton handleClick={() => setPage(page - 1)} />
        {page} of {pageData ? Math.ceil(pageData.count / 20) : page}
        <NextButton handleClick={() => setPage(page + 1)} />
      </div>
    </main>
  );
};

export default Photos;
