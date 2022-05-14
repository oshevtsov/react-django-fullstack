import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageData, setPageData] = useState(null);

  const makeFetchURL = useCallback(() => {
    const page = searchParams.get("page") ?? 1;
    const url = new URL(apiURL);
    const urlSearchParams = new URLSearchParams({ page });
    url.search = urlSearchParams.toString();
    return url;
  }, [searchParams, apiURL]);

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

  const page = pageData?.page;
  const num_pages = pageData?.num_pages;
  const controlsLegend = `${page} of ${num_pages}`;

  const handleClickPrev =
    page > 1 ? () => setSearchParams({ page: page - 1 }) : null;

  const handleClickNext =
    page < num_pages ? () => setSearchParams({ page: page + 1 }) : null;

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
