import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

// Используем переменные из .env для конфигурации Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Инициализация Firebase приложения
const app = initializeApp(firebaseConfig);

// Получаем объект аутентификации Firebase
const auth = getAuth(app);

// Устанавливаем локальную персистентность для Firebase Auth
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Firebase Auth persistence set to local'); // Успешная установка
  })
  .catch((error) => {
    // Логируем ошибку, если не удалось установить персистентность
    console.error('Error setting Firebase Auth persistence:', error);
  });

// Экспортируем объект auth для использования в других частях приложения
export { auth };
