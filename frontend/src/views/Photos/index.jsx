import { useEffect, useState, useCallback } from "react";
import { API_PHOTO_LIST_VIEW_URL } from "../../settings";
import PhotoGallery from "../../components/PhotoGallery";
import styles from "./Photos.module.css";

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

  const controlsLegend = `${page} of ${pageData ? pageData?.num_pages : page}`;
  const handleClickPrev = pageData?.previous && (() => setPage(page - 1));
  const handleClickNext = pageData?.next && (() => setPage(page + 1));
  return (
    <main className={styles.photos}>
      <h1>Photos</h1>
      <PhotoGallery
        images={pageData?.results}
        handleClickPrev={handleClickPrev}
        handleClickNext={handleClickNext}
        controlsLegend={controlsLegend}
      />
    </main>
  );
};

export default Photos;
