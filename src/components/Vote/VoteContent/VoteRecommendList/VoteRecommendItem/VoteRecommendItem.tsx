import { FaStar } from "react-icons/fa";
import styles from "./VoteRecommendItem.module.scss";

const VoteRecommendItem = () => {
  return (
    <div className={styles.container}>
      <img src="https://img-cf.kurly.com/shop/data/goodsview/20210218/gv30000159355_1.jpg" />
      <button>후보에 추가</button>
      <p className={styles.container__name}>카페 리젠트마린</p>
      <p className={styles.container__category}>제주</p>
      <div className={styles.container__reviewBox}>
        <p className={styles.container__reviewBox__rating}>
          <span className={styles.star}>
            <FaStar />
          </span>
          <span>4.4</span>
        </p>
        <span className={styles.container__reviewBox__counts}>(484)</span>
      </div>
    </div>
  );
};

export default VoteRecommendItem;
