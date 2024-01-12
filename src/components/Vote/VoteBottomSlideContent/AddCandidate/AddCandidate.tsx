import styles from "./AddCandidate.module.scss";

import VoteHeartIcon from "@/assets/voteIcons/vote_heart.svg?react";
import VoteSearchIcon from "@/assets/voteIcons/vote_search.svg?react";

const AddCandidate = () => {
  const title = "후보 추가하기";

  return (
    <div className={styles.container}>
      <div className={styles.container__title}>{title}</div>
      <div className={styles.container__buttons}>
        <button className={styles.container__buttons__item}>
          <VoteSearchIcon />
          <p>장소 검색</p>
        </button>
        <button className={styles.container__buttons__item}>
          <VoteHeartIcon />
          <p>찜 목록 검색</p>
        </button>
      </div>
    </div>
  );
};

export default AddCandidate;
