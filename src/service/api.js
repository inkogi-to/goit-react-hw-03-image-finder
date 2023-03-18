import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '29655136-df87d1ad5ef93725220582361';


export const fetchImages = async (page, query) => {
  const response = await axios.get(`?key=${API_KEY}&q=${query}&page=${page}&per_page=12`);
  return response.data
}

