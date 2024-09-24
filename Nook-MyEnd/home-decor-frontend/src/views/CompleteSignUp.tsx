import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Импортируем нужные функции
import '../css/CompleteSignUp.css';

const CompleteSignUp: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const auth = getAuth(); // Инициализируем Firebase Auth

  const completeSignUpProcess = () => {
    if (email !== '' && username !== '' && password !== '' && password === confirmPassword) {
      // Создание пользователя в Firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Сохраняем имя пользователя через updateProfile
          const user = userCredential.user;
          updateProfile(user, {
            displayName: username,
          })
            .then(() => {
              // Получаем токен и сохраняем его
              user.getIdToken().then((token) => {
                localStorage.setItem('authToken', token);
                localStorage.setItem('username', username);
                navigate('/mainfeed');
              });
            })
            .catch((error) => {
              console.error('Error updating profile:', error.code, error.message);
              alert('Error updating profile: ' + error.message);
            });
        })
        .catch((error) => {
          console.error('Error during sign-up:', error.code, error.message);
          alert('Failed to create account. Error: ' + error.message);
        });
    } else {
      alert('Please make sure all fields are filled and passwords match.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeSignUpProcess();
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
