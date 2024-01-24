import {useEffect, useState} from 'react';

import styles from './VoteAtHome.module.scss';

import {getData} from '@/mocks/handlers/home';

import CardHaveVote from './VoteCard/CardHaveVote/CardHaveVote';
import CardNull from './VoteCard/CardNull/CardNull';

import {VoteDataType} from '@/types/home';

function VoteAtHome() {
  const [data, setData] = useState<VoteDataType[]>();

  useEffect(() => {
    getData<VoteDataType[] | undefined>(`api/home/vote`, setData);
  }, []);

  return (
    <div className={styles.container}>
      {data ? (
        <p className={styles.title}>
          길동님,
          <br />
          진행 중인 투표가 있어요!
        </p>
      ) : (
        <p className={styles.title}>
          여행 계획 중이라면
          <br />
          트립보트에서 투표해볼까요?
        </p>
      )}

      {data ? <CardHaveVote data={data} /> : <CardNull />}
    </div>
  );
}

export default VoteAtHome;
