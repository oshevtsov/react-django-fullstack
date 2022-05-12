import styles from "./PhotoPreview.module.css";

const PhotoPreview = ({ source, title }) => (
  <figure>
    <img className={styles.image} src={source} alt={title} />
    <figcaption className={styles.title}>{title}</figcaption>
  </figure>
);

export default PhotoPreview;
