import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CompleteSignUp.css';

const CompleteSignUp: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const completeSignUpProcess = () => {
    // Проверяем, что все поля заполнены и пароли совпадают
    const success = email !== '' && username !== '' && password !== '' && password === confirmPassword;

    if (success) {
      // Сохраняем токен в localStorage
      localStorage.setItem('authToken', 'yourTokenValue'); 
      
      // Проверяем, что токен успешно сохранен
      const savedToken = localStorage.getItem('authToken');
      if (savedToken) {
        console.log('Auth token saved:', savedToken); // Лог сохраненного токена
        // Переходим на страницу mainfeed
        navigate('/mainfeed');
      } else {
        console.error('Failed to save auth token');
        alert('Something went wrong. Please try again.');
      }
    } else {
      // Показываем сообщение об ошибке
      console.error('Sign-up process failed');
      alert('Please make sure all fields are filled and passwords match.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    completeSignUpProcess(); // Вызов функции завершения регистрации
  };

  return (
    <div className="complete-signup-page">
      <div className="complete-signup-overlay"></div>
      <div className="complete-signup-content">
        <div className="complete-signup-logo"></div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input 
              id="username" 
              type="text" 
              placeholder="Enter Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Create Password</label>
            <input 
              id="password" 
              type="password" 
              placeholder="Enter Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="input-container">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              id="confirmPassword" 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="create-account-button">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default CompleteSignUp;