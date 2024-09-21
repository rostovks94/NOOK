import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'; // Подключаем стили для страницы
import NookLogo from '../assets/NookLogo.png'; // Импортируем логотип

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    // Простая проверка для заглушки
    if (email && password) {
      localStorage.setItem('authToken', 'dummyToken'); // Устанавливаем фиктивный токен
      navigate('/mainfeed'); // Переход на MainFeed
    } else {
      alert('Please enter a valid email and password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay"></div> {/* Фон */}
      <div className="login-container">
        {/* Логотип через изображение с классом */}
        <div className="login-logo">
          <img src={NookLogo} alt="Nook Logo" className="logo-image" />
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-input-container">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter Email" 
              value={email} 
              onChange={(event) => setEmail(event.target.value)} 
              required
            />
          </div>
          <div className="login-input-container">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter Password" 
              value={password} 
              onChange={(event) => setPassword(event.target.value)} 
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button type="button" className="google-login-button">
            Login with Google
          </button>

          <button type="button" className="signup-button" onClick={() => navigate('/register')}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;