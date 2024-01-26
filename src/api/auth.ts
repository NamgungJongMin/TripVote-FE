import axios from 'axios';

export const authRequest = {
  login: (email: string, password: string) =>
    axios.post(
      '/api/login', 
      {
        email,
        password,
      },
      {withCredentials: true},
    ),

  login_kakao: () =>
    axios.post('/api/oauth2/authorization/kakao', null, {
      withCredentials: true,
    }),

  withdrawal: (password?: string) =>
    axios.post(
      '/api/members/sign-out',
      {
        password,
      },
      {withCredentials: true},
    ),
};