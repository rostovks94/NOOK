import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainFeed from './views/MainFeed'; 
import ContentDetail from './views/ContentDetail';
import MoodBoardSelection from './views/MoodBoardSelection'; 
import CreateMoodBoard from './views/CreateMoodBoard'; 
import SaveConfirmation from './views/SaveConfirmation'; 
import UserProfile from './views/PH4'; // Проверь правильность имени компонента
import Register from './views/Register';
import Login from './views/Login'; 
import CompleteSignUp from './views/CompleteSignUp';
import PersonalProfile from './views/PersonalProfile';
import SaveModal from './components/SaveModal'; 

// Функция для проверки авторизации пользователя
const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token; // Возвращает true, если токен есть
};

// Компонент для защиты приватных маршрутов
const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Перенаправление на страницу регистрации, если пользователь заходит на корневой путь */}
        <Route path="/" element={<Navigate to="/register" replace />} />
        
        {/* Публичные маршруты */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/complete-signup" element={<CompleteSignUp />} />

        {/* Приватные маршруты */}
        <Route path="/mainfeed" element={<PrivateRoute><MainFeed /></PrivateRoute>} />
        <Route path="/content/:id" element={<PrivateRoute><ContentDetail /></PrivateRoute>} />
        <Route path="/moodboards" element={<PrivateRoute><MoodBoardSelection onClose={() => {}} /></PrivateRoute>} />
        <Route path="/create-moodboard" element={<PrivateRoute><CreateMoodBoard onClose={() => {}} /></PrivateRoute>} />
        <Route path="/savemodal" element={<PrivateRoute><SaveModal onClose={() => {}} /></PrivateRoute>} />
        <Route path="/personalprofile" element={<PrivateRoute><PersonalProfile /></PrivateRoute>} />
        <Route path="/save-confirmation" element={<SaveConfirmation />} />

        <Route path="/user-profile/Yelena_Jones" element={<PrivateRoute><UserProfile /></PrivateRoute>} />

        {/* Маршрут по умолчанию на случай, если путь не найден */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
