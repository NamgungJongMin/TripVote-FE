import {Link} from 'react-router-dom';

import styles from './MapItem.module.scss';

import {translateCategoryToStr} from '@/hooks/Search/useSearch';

import areas from '@/utils/areas.json';

import {SearchItemType} from '@/types/home';

interface PropsType {
  data: SearchItemType;
  categoryChange: boolean;
}

function MapItem({data, categoryChange}: PropsType) {
  const location = areas.filter((area) => area.areaCode === data.location.areaCode)[0].name;
  const category = translateCategoryToStr(data.contentTypeId);

  return (
    <Link to={`/detail/${data.location.latitude}`} className={styles.container}>
      <img src={data.thumbnail} alt={`${data.title}의 사진`} style={{opacity: categoryChange ? 0 : 1}} />
      <p className={styles.text} style={{opacity: categoryChange ? 0 : 1}}>
        <span className={styles.title}>{data.title}</span>
        <span className={styles.info}>
          {category}·{location}
        </span>
      </p>
    </Link>
  );
}

export default MapItem;
