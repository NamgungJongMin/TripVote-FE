import {http, HttpResponse} from 'msw';

const mySpaces = {
  status: 200,
  message: 'SUCCESS',
  data: {
    spaces: [
      {
        id: 1,
        title: '여행 스페이스 1 (여행스페이스 미정)',
        startDate: '',
        endDate: '',
        members: '감자깡 외 3명의 여행',
      },
      {
        id: 2,
        title: '강릉, 속초, 전주, 여수 여행',
        startDate: '2024.1.17',
        endDate: '2024.1.19',
        members: '새우깡 외 2명의 여행',
      },
      {
        id: 3,
        title: '강릉, 속초, 전주, 여수 여행',
        startDate: '2024.1.17',
        endDate: '2024.1.19',
        members: '새우깡 외 1명의 여행',
      },
      {
        id: 4,
        title: '강릉, 속초, 전주, 여수 여행',
        startDate: '2024.1.17',
        endDate: '2024.1.19',
        members: '옥수수깡의 여행',
      },
    ],
    pageNumber: 0,
    pageSize: 20,
    totalPages: 0,
    totalResult: 0,
    first: true,
    last: true,
  },
};

const myInfo = {
  status: 200,
  message: 'member/my-info',
  data: {
    nickname: '김철수',
    profile: '',
  },
};

export const sidebar = [
  http.get('/api/spaces', () => {
    return HttpResponse.json(mySpaces, {
      status: 200,
    });
  }),

  http.post('/api/spaces', () => {
    return HttpResponse.json({
      status: 200,
    });
  }),

  http.get('/api/members/my-info', () => {
    return HttpResponse.json(myInfo, {
      status: 200,
    });
  }),
];
