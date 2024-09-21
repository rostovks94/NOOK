import axios from 'axios';

// Константы для API
const API_KEY = 'т9HHKo4SOPEBehAQrpix9bFpbfImo43v94PjnREIhDvfWV4jvQ1shmNrY';
const BASE_URL = 'https://api.pexels.com/v1/';

// Функция для получения фотографий интерьеров по запросу
export const fetchInteriorPhotos = async (query: string) => {
  try {
    console.log('Fetching images for query:', query); // Логируем запрос

    const response = await axios.get(`${BASE_URL}search`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        query, // Запрос для поиска
        per_page: 10, // Количество изображений на странице
      },
    });

    console.log('Response received:', response); // Логируем полный ответ

    // Проверяем, что данные содержат массив фотографий
    if (response.data && Array.isArray(response.data.photos)) {
      return response.data.photos;
    } else {
      console.error('Unexpected API response structure:', response.data);
      throw new Error('Unexpected API response structure');
    }
  } catch (error) {
    console.error('General error fetching images:', error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
};