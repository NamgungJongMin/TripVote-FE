import {Checkbox} from '@chakra-ui/react';
import {useCallback, useEffect, useState} from 'react';

import styles from './MemoItem.module.scss';

import {useDebounce} from '@/hooks/useDebounce';
import useGetSelectedArray from '@/hooks/useGetSelectedArray';

import {selectedTaglineState} from '@/recoil/vote/voteMemo';

import {MemoItemProps} from '@/types/vote';

const MemoItem = ({candidate, existingTagline}: MemoItemProps) => {
  const [text, setText] = useState('');
  // const [selectedTagline, setSelectedTagline] = useRecoilState(selectedTaglineState);
  const {toggleItemInNewArray, setMemoArray} = useGetSelectedArray(selectedTaglineState);
  const debouncedText = useDebounce(text, 500);
  const placeInfo = candidate.placeInfo;

  useEffect(() => {
    if (existingTagline) {
      setText(existingTagline.tagline);
    }
  }, []);

  const handleCheckboxChange = () => {
    toggleItemInNewArray({
      placeId: placeInfo.placeId,
      tagline: debouncedText,
    });
  };

  const handleDebouncedTextChange = useCallback(() => {
    setMemoArray({
      placeId: placeInfo.placeId,
      tagline: debouncedText,
    });
  }, [debouncedText, placeInfo.placeId, setMemoArray]);

  useEffect(() => {
    handleDebouncedTextChange();
  }, [debouncedText]);

  return (
    <div className={styles.container}>
      <Checkbox
        defaultChecked
        id={`${placeInfo.placeId}taglineCheck`}
        variant='candidateCheckbox'
        m='0'
        alignItems='flex-start'
        onChange={handleCheckboxChange}
      />
      <div className={styles.container__rightSide}>
        <label htmlFor={`${placeInfo.placeId}taglineCheck`} className={styles.candidateBox}>
          <div className={styles.candidateBox__image}>
            <img src={placeInfo.placeImageURL} alt={placeInfo.placeName} />
          </div>
          <div className={styles.candidateBox__text}>
            <p className={styles.candidateBox__text__name}>{placeInfo.placeName}</p>
            <span className={styles.candidateBox__text__category}>
              {placeInfo.category}
              {'ꞏ'}
              {placeInfo.location}
            </span>
          </div>
        </label>
        <div className={styles.textareaBox}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={styles.textarea}
            maxLength={30}
            placeholder='장소에 대한 메모를 남겨주세요. (30자 이하)'
          />
          <p className={styles.textarea__counts}>{text.length}/30자</p>
        </div>
      </div>
    </div>
  );
};

export default MemoItem;
