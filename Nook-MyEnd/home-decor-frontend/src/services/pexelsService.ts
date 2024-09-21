import axios from 'axios';

const API_KEY = 'т9HHKo4SOPEBehAQrpix9bFpbfImo43v94PjnREIhDvfWV4jvQ1shmNrY';
const BASE_URL = 'https://api.pexels.com/v1/';

export const fetchInteriorPhotos = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}search`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`, 
      },
      params: {
        query, 
        per_page: 10,
      },
    });
    return response.data.photos;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};