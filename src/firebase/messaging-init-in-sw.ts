import axios from 'axios';
import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';

import {sendNotificationToken} from '@/api/notification';

export const firebaseConfig = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
});
export const messaging = getMessaging(firebaseConfig);

async function requestPermission() {
  console.log('[FCM]알림 권한 요청 중...');
  const permission = await Notification.requestPermission();
  if (permission === 'denied') {
    console.log('[FCM]알림 권한 허용 안됨');
    return;
  }
  console.log('[FCM]알림 권한 허용');

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_VAPID_KEY,
  });
  if (token) {
    await sendNotificationToken({token});
    await axios.post(
      '/api/notifications/subscribe',
      {
        spaceId: 1,
        isGlobal: false,
      },
      {withCredentials: true},
    );
    console.log('[FCM]알림 토큰을 전송했습니다');
  } else console.log('[FCM]알림 토큰을 얻지 못했습니다');
  onMessage(messaging, (payload) => {
    console.log('푸시 알람 메세지 출력', payload);
  });
}

requestPermission();
