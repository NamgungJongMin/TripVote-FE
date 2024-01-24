import {Swiper, SwiperClass, SwiperSlide} from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';

import styles from './CandidatesSlide.module.scss';

import CandidateCard from '@/components/Vote/VoteContent/CandidateCard/CandidateCard';

import {CandidatesSlideProps} from '@/types/vote';

const CandidatesSlide = ({candidates, setSelectedPinIndex, setCenterMarker, swiperRef}: CandidatesSlideProps) => {
  const handleSlideChange = (swiper: SwiperClass) => {
    const activeCandidate = candidates[swiper.activeIndex];
    setCenterMarker(activeCandidate.placeInfo.latlng);
    setSelectedPinIndex(swiper.activeIndex);
  };

  return (
    <div className={styles.container}>
      <Swiper
        ref={swiperRef}
        centeredSlides={true}
        spaceBetween={8}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
        breakpoints={{400: {slidesPerView: 1.2}}}
      >
        {candidates.map((candidate, i) => (
          <SwiperSlide key={`${candidate.id}-${i}`}>
            <CandidateCard isMapStyle={true} candidate={candidate} index={i + 1} showResults={false} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CandidatesSlide;
