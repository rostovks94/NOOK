import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Импорт функции для входа через Firebase
import { auth } from '../firebaseConfig'; // Импорт настроек Firebase
import '../css/Login.css'; // Импорт CSS для компонента
import NookLogo from '../assets/NookLogo.png'; // Импорт логотипа

const Login: React.FC = () => {
  // Хуки состояния для email, пароля и ошибок
  const navigate = useNavigate(); // Хук для навигации между страницами
  const [email, setEmail] = useState(''); // Состояние для email пользователя
  const [password, setPassword] = useState(''); // Состояние для пароля пользователя
  const [error, setError] = useState(''); // Состояние для отображения ошибок

  // Функция для обработки нажатия на кнопку "Login"
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); // Предотвращение перезагрузки страницы при отправке формы

    // Вызов функции Firebase для входа пользователя с использованием email и пароля
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Если вход успешен, получить токен и сохранить его в localStorage
        const token = await userCredential.user.getIdToken(); // Получаем токен пользователя
        localStorage.setItem('authToken', token); // Сохраняем токен в localStorage для авторизации

        // Перенаправление пользователя на главную страницу ленты после успешного входа
        navigate('/mainfeed');
      })
      .catch((error) => {
        // Обработка ошибок Firebase
        if (error instanceof Error && 'code' in error) {
          const firebaseError = error as { code: string }; // Приведение ошибки к типу Firebase

          // Определение различных ошибок Firebase и установка соответствующих сообщений для пользователя
          if (firebaseError.code === 'auth/user-not-found') {
            setError('This email is not registered. Please sign up or try a different email.');
          } else if (firebaseError.code === 'auth/wrong-password') {
            setError('Incorrect password. Please try again.');
          } else {
            setError('Login failed. Please check your credentials and try again.');
          }
        } else {
          // Общая обработка ошибок на случай неизвестных ошибок
          setError('An unknown error occurred. Please try again.');
        }

        // Логирование ошибки для отладки
        console.error('Error during login:', error);
      });
  };

  // JSX разметка компонента Login
  return (
    <div className="login-page">
      <div className="login-overlay"></div> {/* Прозрачный слой для оформления */}
      <div className="login-container">
        {/* Логотип приложения */}
        <div className="login-logo">
          <img src={NookLogo} alt="Nook Logo" className="logo-image" />
        </div>

        {/* Форма для входа */}
        <form className="login-form" onSubmit={handleLogin}>
          {/* Поле ввода email */}
          <div className="login-input-container">
            <label>Email</label> {/* Метка для поля ввода */}
            <input
              type="email"
              placeholder="Enter Email" // Подсказка для поля
              value={email} // Связываем с состоянием email
              onChange={(event) => setEmail(event.target.value)} // Обновление состояния при изменении значения
              required // Поле обязательно для заполнения
            />
          </div>

          {/* Поле ввода пароля */}
          <div className="login-input-container">
            <label>Password</label> {/* Метка для поля ввода */}
            <input
              type="password"
              placeholder="Enter Password" // Подсказка для поля
              value={password} // Связываем с состоянием password
              onChange={(event) => setPassword(event.target.value)} // Обновление состояния при изменении значения
              required // Поле обязательно для заполнения
            />
          </div>

          {/* Отображение сообщения об ошибке, если оно есть */}
          {error && <p className="error-message">{error}</p>}

          {/* Кнопка для отправки формы и входа */}
          <button type="submit" className="login-button">Login</button>

          {/* Разделитель между кнопками */}
          <div className="divider"><span>OR</span></div>

          {/* Кнопка для перехода на страницу регистрации */}
          <button type="button" className="signup-button" onClick={() => navigate('/register')}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
