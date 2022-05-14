import PhotoPreview from "../PhotoPreview";
import { PrevButton, NextButton } from "../Button";
import styles from "./PhotoGallery.module.css";

const PhotoGallery = ({
  images,
  offset,
  handleClickPrev,
  handleClickNext,
  controlsLegend,
}) => {
  return (
    <section className={styles.gallery}>
      <div className={styles.grid}>
        {images &&
          images.map(({ id, source, title }, idx) => (
            <PhotoPreview
              key={id}
              id={id}
              idx={idx + offset}
              source={source}
              title={title}
            />
          ))}
      </div>
      <div className={styles.controls}>
        <PrevButton handleClick={handleClickPrev} />
        <p>{controlsLegend}</p>
        <NextButton handleClick={handleClickNext} />
      </div>
    </section>
  );
};

export default PhotoGallery;
