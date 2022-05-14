import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../../auth";
import { makeAuthorizedRequest, makeUnauthorizedRequest } from "../../../api";
import Loading from "../../Loading";
import PhotoGallery from "../../../components/PhotoGallery";
import styles from "../../../styles/full-height-view.module.css";

const PhotoGrid = ({ apiURL, requireAuth }) => {
  const { logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState(null);

  const makeFetchURL = useCallback(() => {
    const url = new URL(apiURL);
    const searchParams = new URLSearchParams({ page });
    url.search = searchParams.toString();
    return url;
  }, [page, apiURL]);

  const fetchData = useCallback(async () => {
    const url = makeFetchURL();
    if (requireAuth) return await makeAuthorizedRequest(url, null, "GET", null);
    return await makeUnauthorizedRequest(url);
  }, [makeFetchURL, requireAuth]);

  useEffect(() => {
    fetchData()
      .then((response) => {
        if (response.ok) return setPageData(response.data);
        if (requireAuth && response.status === 401) {
          logOut();
          return navigate("/login", {
            replace: true,
            state: { from: location.pathname },
          });
        }
        console.error("Something went wrong, please try again later.");
      })
      .catch(console.error);
  }, [fetchData, location.pathname, logOut, navigate, requireAuth]);

  const controlsLegend = `${page} of ${pageData?.num_pages ?? page}`;
  const handleClickPrev = pageData?.previous && (() => setPage(page - 1));
  const handleClickNext = pageData?.next && (() => setPage(page + 1));
  return pageData ? (
    <main className={styles.container}>
      <h1>Profile</h1>
      <PhotoGallery
        images={pageData?.results}
        handleClickPrev={handleClickPrev}
        handleClickNext={handleClickNext}
        controlsLegend={controlsLegend}
      />
    </main>
  ) : (
    <Loading />
  );
};

export default PhotoGrid;
