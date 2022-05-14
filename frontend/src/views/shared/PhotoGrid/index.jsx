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
  const [dataURL, setDataURL] = useState(apiURL);
  const [pageData, setPageData] = useState(null);

  const fetchData = useCallback(async () => {
    if (requireAuth)
      return await makeAuthorizedRequest(dataURL, null, "GET", null);
    return await makeUnauthorizedRequest(dataURL);
  }, [dataURL, requireAuth]);

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

  const controlsLegend = `${pageData?.page} of ${pageData?.num_pages}`;
  const handleClickPrev =
    pageData?.previous && (() => setDataURL(pageData?.previous));
  const handleClickNext = pageData?.next && (() => setDataURL(pageData?.next));
  const offset = (pageData?.page - 1) * pageData?.page_size + 1;
  return pageData ? (
    <main className={styles.container}>
      <h1>Profile</h1>
      <PhotoGallery
        images={pageData?.results}
        offset={offset}
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
