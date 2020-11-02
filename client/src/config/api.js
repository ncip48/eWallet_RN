import axios from 'axios';

//set default config base url
export const API = axios.create({
  //baseURL: "https://herly-backend-library.herokuapp.com/api/v1",
  baseURL: 'http://192.168.1.104:5000/api/v1',
});

//integrate default header for auth
export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete API.defaults.headers.common['Authorization'];
};

export const urlAsset = {
  img: 'http://192.168.1.104:5000/src/uploads/img/',
};

//production
// export const urlAsset = {
//   img: "https://herly-backend-library.herokuapp.com/src/uploads/img/",
//   books: "https://herly-backend-library.herokuapp.com/src/uploads/books/",
// };
