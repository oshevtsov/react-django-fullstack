import { Link } from "react-router-dom";
import styles from "./PhotoPreview.module.css";

const PhotoPreview = ({ source, title, id, idx }) => (
  <figure>
    <Link to={`${idx}/`} state={{ id }}>
      <img className={styles.image} src={source} alt={title} />
    </Link>
    <figcaption className={styles.title}>{title}</figcaption>
  </figure>
);

export default PhotoPreview;
