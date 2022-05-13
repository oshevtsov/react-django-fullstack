import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { API_OWN_PHOTO_LIST_VIEW_URL } from "../../settings";
import { useAuth } from "../../auth";
import { makeRequest } from "../../api";
import PhotoGallery from "../../components/PhotoGallery";
import styles from "./Profile.module.css";

const Profile = () => {
  const { logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState(null);

  const makeFetchURL = useCallback(() => {
    const url = new URL(API_OWN_PHOTO_LIST_VIEW_URL);
    const searchParams = new URLSearchParams({ page });
    url.search = searchParams.toString();
    return url;
  }, [page]);

  const fetchData = useCallback(async () => {
    return await makeRequest(makeFetchURL(), null, "GET", null);
  }, [makeFetchURL]);

  useEffect(() => {
    fetchData()
      .then((response) => {
        if (response.ok) return setPageData(response.data);
        if (response.status === 401) {
          logOut();
          return navigate("/login", {
            replace: true,
            state: { from: location.pathname },
          });
        }
        console.error("Something went wrong, please try again later.");
      })
      .catch(console.error);
  }, [fetchData, location.pathname, logOut, navigate]);

  const controlsLegend = `${page} of ${pageData ? pageData?.num_pages : page}`;
  const handleClickPrev = pageData?.previous && (() => setPage(page - 1));
  const handleClickNext = pageData?.next && (() => setPage(page + 1));
  return (
    <main className={styles.profile}>
      <h1>Profile</h1>
      <PhotoGallery
        images={pageData?.results}
        handleClickPrev={handleClickPrev}
        handleClickNext={handleClickNext}
        controlsLegend={controlsLegend}
      />
    </main>
  );
};

export default Profile;
