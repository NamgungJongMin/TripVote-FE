import { MdArrowForwardIos } from "react-icons/md";

import styles from "./RightButton.module.scss";

import { SlideButtonPropsType } from "@/types/home";

function RightButton({
  slideLocation,
  setSlideLocation,
  itemWidth,
  itemNumber,
  slideSize,
  flexGap,
}: SlideButtonPropsType) {
  const moveRight = slideLocation - itemWidth - flexGap;
  const moveEnd =
    -itemWidth * itemNumber - flexGap * (itemNumber - 1) - 40 + slideSize.width;

  function handleButton() {
    if (moveRight <= moveEnd) {
      setSlideLocation(moveEnd);
    } else {
      setSlideLocation(moveRight);
    }
  }
  return (
    <button
      className={styles.container}
      style={{
        display:
          -slideLocation >=
          itemWidth * itemNumber + flexGap * (itemNumber - 1) - slideSize.width
            ? "none"
            : "block",
      }}
      onClick={handleButton}
    >
      <MdArrowForwardIos className={styles.container__icon} />
    </button>
  );
}

export default RightButton;
