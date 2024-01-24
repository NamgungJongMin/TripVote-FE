import {useDisclosure} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {HiOutlineTrash as DeleteIcon} from 'react-icons/hi';
import {RiArrowUpDownFill as MoveIcon} from 'react-icons/ri';
import {useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';

import styles from './RouteTabPanel.module.scss';

import AlertModal from '@/components/AlertModal/AlertModal';
import BottomSlideLeft from '@/components/BottomSlide/BottomSlideLeft';

import ZoomInIcon from '@/assets/icons/zoomIn.svg?react';
import {isModalOpenState} from '@/recoil/vote/alertModal';
import {getSpaceId} from '@/utils/getSpaceId';

import DayMove from '../DayMove/DayMove';
import DayNavigationBar from '../DayNavigationBar/DayNavigationBar';
import DayRoute from '../DayRoute/DayRoute';
import EmptyDate from '../EmptyDate/EmptyDate';
import MapInTrip from '../MapInTrip/MapInTrip';

import {DateItem, MapInTripProps} from '@/types/route';

function RouteTabPanel({mapRef, center}: MapInTripProps) {
  const data = {
    journeys: [
      {
        id: 0,
        date: '2024-01-16',
        places: [
          {
            id: 0,
            Order: 0,
            place: {
              id: 0,
              title: '씨티 호텔',
              thumbnail:
                'https://images.trvl-media.com/lodging/28000000/27440000/27434200/27434198/cb31822f.jpg?impolicy=resizecrop&rw=1200&ra=fit',
              address: '강원도 강릉시',
              addressDetail: '교동광장로 112',
              latitude: 37.76437082535426,
              longitude: 128.87675285339355,
              category: '숙소',
            },
          },
          {
            id: 1,
            Order: 1,
            place: {
              id: 1,
              title: '동화가든',
              thumbnail:
                'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEyMjRfMjgg%2FMDAxNzAzMzk1OTQ3NzIx.PD8Sif-ZdTdc9tugl9qh9Izb91v0tK_OD1IJPvgVEbAg.oc9JBSNBPc6WjsJOFhCcXXBoG2Qg318fhOveoAyqbvog.JPEG.rhwpgus90%2FIMG_3224.JPG',
              address: '강원도 강릉시',
              addressDetail: '초당순두부길77번길 15',
              latitude: 37.7911054,
              longitude: 128.9149116,
              category: '맛집',
            },
          },
          {
            id: 2,
            Order: 2,
            place: {
              id: 2,
              title: '테라로사',
              thumbnail:
                'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200422_278%2F1587531042172TgXbr_JPEG%2FV-ta0vOWwlwKQkmnI-B9s7ja.jpg',
              address: '강원도 강릉시',
              addressDetail: '구정면 현천길 7',
              latitude: 37.6964635,
              longitude: 128.890664,
              category: '카페',
            },
          },
        ],
      },
      {
        id: 1,
        date: '2024-01-17',
        places: [
          {
            id: 3,
            Order: 0,
            place: {
              id: 3,
              title: '안목해변',
              thumbnail:
                'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190130_26%2F1548818549792K262M_JPEG%2FyOtLXHFaaCdCC6c9frIgwJTB.jpeg.jpg',
              address: '강원도 강릉시',
              addressDetail: '창해로14번길 20-1',
              latitude: 37.7725926,
              longitude: 128.9473204,
              category: '관광',
            },
          },
          {
            id: 4,
            Order: 1,
            place: {
              id: 4,
              title: '카페오션스강릉버거',
              thumbnail:
                'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240102_48%2F17041673424734KIm1_JPEG%2F%25B0%25AD%25B8%25AA_%25B8%25C0%25C1%25FD_%25286%2529.jpg',
              address: '강원도 강릉시',
              addressDetail: '해안로 355',
              latitude: 37.8952651,
              longitude: 128.8292485,
              category: '맛집',
            },
          },
        ],
      },
    ],
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);

    // TODO: 완료 버튼 눌렀을 때 처리
  };

  const handlePlaceSelection = (placeName: string) => {
    if (selectedPlaces.includes(placeName)) {
      setSelectedPlaces((prevSelectedPlaces) => prevSelectedPlaces.filter((place) => place !== placeName));
    } else {
      setSelectedPlaces((prevSelectedPlaces) => [...prevSelectedPlaces, placeName]);
    }
  };

  const deletePlaces = (placeList: string[]) => {
    console.log('삭제', placeList);
  };

  useEffect(() => {
    console.log(selectedPlaces);
  }, [selectedPlaces]);

  const navigate = useNavigate();
  const spaceId = getSpaceId();

  if (!data.journeys || data.journeys.length === 0) {
    return <EmptyDate />;
  }

  const dateList: DateItem[] = data.journeys.map((journey) => ({
    date: journey.date,
  }));

  return (
    <div className={styles.panelContainer}>
      <div className={styles.mapContainer}>
        <MapInTrip mapRef={mapRef} center={center} />
        <button className={styles.zoomInButton} onClick={() => navigate(`/trip/${spaceId}/map`)}>
          <ZoomInIcon />
        </button>
      </div>
      <div className={styles.routeContainer}>
        <DayNavigationBar dateList={dateList} editMode={isEditMode} handleEditMode={handleEditMode} />
        <div className={styles.journeysContainer}>
          {data.journeys &&
            data.journeys.map((journey, index) => (
              <DayRoute
                key={index}
                day={index + 1}
                date={journey.date}
                placeList={journey.places}
                editMode={isEditMode}
                selectedPlaces={selectedPlaces}
                handlePlaceSelection={handlePlaceSelection}
              />
            ))}
        </div>
      </div>
      {isEditMode && (
        <div className={selectedPlaces.length > 0 ? styles.activeBottomButtonContainer : styles.bottomButtonContainer}>
          <button onClick={onOpen}>
            <MoveIcon size='2rem' color='#FFFFFF' />
            <span>날짜 이동</span>
          </button>
          <button onClick={() => setIsModalOpen(selectedPlaces.length > 0)}>
            <DeleteIcon size='2rem' color='#FFFFFF' />
            <span>삭제하기</span>
          </button>
        </div>
      )}
      <BottomSlideLeft
        isOpen={selectedPlaces.length > 0 && isOpen}
        onClose={onClose}
        children={<DayMove selectedPlaces={selectedPlaces} />}
      />

      <AlertModal
        title={'선택된 항목을 삭제하시겠습니까?'}
        actionButton={'삭제하기'}
        isSmallSize={true}
        onClickAction={() => deletePlaces(selectedPlaces)}
      />
    </div>
  );
}

export default RouteTabPanel;
