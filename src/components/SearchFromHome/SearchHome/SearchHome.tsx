import styles from './SearchHome.module.scss';

import HotItems from './HotItems/HotItems';
import SearchKeyword from './SearchKeyword/SearchKeyword';

function SearchHome() {
  return (
    <div className={styles.lists_box}>
      <div className={styles.column_4px}>
        <p className={styles.title}>인기 검색 키워드</p>
        <SearchKeyword />
      </div>
      <div className={styles.column_8px}>
        <p className={styles.title}>최근 30일간 인기 장소</p>
        <HotItems type={12} />
      </div>
      <div className={styles.column_8px}>
        <p className={styles.title}>최근 30일간 인기 숙소</p>
        <HotItems type={32} />
      </div>
    </div>
  );
}

export default SearchHome;
