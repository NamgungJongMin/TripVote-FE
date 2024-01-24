import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import styles from './SearchList.module.scss';

import {keywordSearch, search} from '@/hooks/Search/useSearch';

import DateFilter from './DateFilter/DateFilter';
import LocationFilter from './LocationFilter/LocationFilter';
import Map from './Map/Map';
import MapButton from './MapButton/MapButton';
import SearchItem from './SearchItem/SearchItem';
import Tabs from './Tabs/Tabs';

import {ForSearchType, SearchItemType} from '@/types/home';

interface PropsType {
  forSearch: ForSearchType;
}

function SearchList({forSearch}: PropsType) {
  const [data, setData] = useState<SearchItemType[] | undefined>();
  const [filterData, setFilterData] = useState<SearchItemType[] | undefined>();
  const [categoryChange, setCategoryChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (forSearch.hot === 'true') {
      keywordSearch(forSearch.keyword, forSearch.location, forSearch.sort, setData);
    } else {
      search(forSearch.keyword, forSearch.location, forSearch.sort, setData);
    }
  }, [forSearch.keyword, forSearch.location, forSearch.sort, forSearch.hot]);

  useEffect(() => {
    if (data) {
      if (forSearch.category !== 0) {
        let filterData;
        if (forSearch.category === 14) {
          filterData = data.filter((data) => data.contentTypeId === 14 || data.contentTypeId === 15);
        } else {
          filterData = data.filter((data) => data.contentTypeId === forSearch.category);
        }
        setFilterData(filterData);
      } else {
        setFilterData(data);
      }
    }
  }, [data, forSearch.category]);

  function onMap() {
    navigate(
      `/home/search?keyword=${forSearch.keyword}&category=${forSearch.category}&map=true&location=${forSearch.location}&sort=${forSearch.sort}&hot=${forSearch.hot}`,
    );
  }

  return (
    <div className={styles.container} style={{height: forSearch.map === 'true' ? '100%' : 'calc(100% - 72px)'}}>
      {forSearch.hot === 'false' && <Tabs forSearch={forSearch} setCategoryChange={setCategoryChange} />}
      {forSearch.map === 'true' && filterData ? (
        <Map data={filterData} categoryChange={categoryChange} />
      ) : (
        <>
          <div className={styles.filter}>
            <LocationFilter forSearch={forSearch} />
            <DateFilter forSearch={forSearch} />
          </div>
          <ul className={styles.slide}>
            {filterData &&
              filterData.map((data, i) => (
                <SearchItem data={data} key={data.title + i} categoryChange={categoryChange} />
              ))}
          </ul>
          <button onClick={onMap}>
            <MapButton />
          </button>
        </>
      )}
    </div>
  );
}

export default SearchList;
