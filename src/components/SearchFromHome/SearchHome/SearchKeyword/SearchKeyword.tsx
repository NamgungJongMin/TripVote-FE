import axios from 'axios';
import {Dispatch, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import styles from './SearchKeyword.module.scss';

import useComponentSize from '@/hooks/useComponetSize';

import SlideButton from '@/components/SlideButton/SlideButton';

import {Keywords, SearchDataType, SearchKeywordType} from '@/types/home';

function SearchKeyword() {
  const [data, setData] = useState<SearchKeywordType[] | undefined>();
  const [listWidth, setListWidth] = useState<number>(0);
  const [slideLocation, setSlideLocation] = useState<number>(0);
  const [componentRef, size] = useComponentSize();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData(apiURL: string, set: Dispatch<SearchKeywordType[] | undefined>) {
      try {
        const fetchData = await axios.get(`${apiURL}`);
        const data: SearchDataType<Keywords> = fetchData.data;
        set(data.data.keywords);
      } catch (error) {
        console.log(error);
      }
    }
    getData('/api/places/popular/keywords', setData);
  }, []);

  // 각 키워드의 너비를 모두 더한 값을 구함
  useEffect(() => {
    // 정확한 이유를 찾지 못하였으나 setTimeout을 걸지 않으면 각 p태그의 width가 실제보다 다소 큰 수가 반영됨
    setTimeout(() => {
      if (data && componentRef.current && componentRef.current?.childNodes.length === data.length) {
        const pTags = componentRef.current.querySelectorAll('p');
        const widths = Array.from(pTags).map((pTag) => {
          const rect = pTag.getBoundingClientRect();
          return rect.width;
        });
        const width = widths.reduce((acc, width) => acc + width, 0);
        setListWidth(width);
      }
    }, 100);
  }, [data, componentRef]);

  return (
    <div className={styles.container}>
      {data && (
        <SlideButton
          slideLocation={slideLocation}
          setSlideLocation={setSlideLocation}
          itemWidth={listWidth / data.length}
          flexGap={8}
          itemNumber={data.length}
          slideSize={size}
          buttonSize={24}
        />
      )}
      <div
        className={styles.slide_box}
        ref={componentRef}
        style={{
          overflow: size.width < 449 ? 'scroll' : 'visible',
          left: slideLocation + 'px',
        }}
      >
        {data ? (
          data.map((keyword, i) => (
            <p
              key={keyword.name + i}
              onClick={() => {
                navigate(
                  `/home/search?keyword=${keyword.name}&category=0&map=false&location=전국&sort=등록순&hot=true`,
                );
              }}
            >
              {keyword.name}
            </p>
          ))
        ) : (
          <p>.</p>
        )}
      </div>
    </div>
  );
}

export default SearchKeyword;
