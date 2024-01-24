import React, {useEffect, useRef, useState} from 'react';
import {CustomOverlayMap, Map, Polyline} from 'react-kakao-maps-sdk';
import {SwiperRef} from 'swiper/react';

import styles from './RouteMapBody.module.scss';

import RouteMapSlide from '../RouteMapSlide/RouteMapSlide';
import MapPinActive from '../../CandidatesMap/MapPins/MapPinActive';
import MapPinNumber from '../../CandidatesMap/MapPins/MapPinNumber';

import {Journeys, LatLng} from '@/types/route';

const RouteMapBody = ({journeys}: Journeys) => {
  const [centerMarker, setCenterMarker] = useState({
    lat: journeys[0].places[0].place.latitude,
    lng: journeys[0].places[0].place.longitude,
  });

  const [activeDay, setActiveDay] = useState(0);
  const [selectedPinIndex, setSelectedPinIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);

  const latlngs = journeys[activeDay].places.map((place) => ({
    lat: place.place.latitude,
    lng: place.place.longitude,
  }));

  const handleMapMarkerClick = (latlng: LatLng, i: number) => {
    setCenterMarker(latlng);
    swiperRef.current?.swiper.slideTo(i);
    setSelectedPinIndex(i);
  };

  const handleDayChange = (day: number) => {
    setActiveDay(day);
    handleMapMarkerClick(latlngs[0], 0);
  };

  useEffect(() => {
    setCenterMarker({
      lat: journeys[0].places[0].place.latitude,
      lng: journeys[0].places[0].place.longitude,
    });
  }, []);

  useEffect(() => {
    console.log(selectedPinIndex);
  }, [selectedPinIndex]);

  return (
    <div className={styles.container}>
      <Map className={styles.map} center={centerMarker} level={9}>
        {journeys[activeDay].places.map((place, i) => (
          <React.Fragment key={`place-${i}`}>
            <Polyline path={latlngs} strokeWeight={3} strokeColor='#3F444D' strokeOpacity={1} strokeStyle='dashed' />
            <CustomOverlayMap key={`${place.place.title}-${latlngs[i]}-${i}`} position={latlngs[i]}>
              <div
                className={`pin ${selectedPinIndex === i ? 'active' : ''}`}
                onClick={() => handleMapMarkerClick({lat: place.place.latitude, lng: place.place.latitude}, i)}
              >
                {selectedPinIndex === i ? <MapPinActive number={i + 1} /> : <MapPinNumber number={i + 1} />}
              </div>
            </CustomOverlayMap>
          </React.Fragment>
        ))}
      </Map>
      <RouteMapSlide
        journeys={journeys}
        setSelectedPinIndex={setSelectedPinIndex}
        setCenterMarker={setCenterMarker}
        swiperRef={swiperRef}
        activeDay={activeDay}
        onDayChange={handleDayChange}
      />
    </div>
  );
};

export default RouteMapBody;
