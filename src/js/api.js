import axios from 'axios';
import { perPage, page } from './search-images';

export async function imagesQuery(searchValues) {
  const API_URL = 'https://pixabay.com/api/';
  const API_KEY = '40350546-69fa2be7d55ff06803855eb61';
  const PARAMS = {
    key: API_KEY,
    q: searchValues,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page,
  };
  try {
    const response = await axios.get(API_URL, {
      params: PARAMS,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
}
