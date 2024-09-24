import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth'; // Импортируем Firebase Authentication
import '../css/Register.css';
import logoImage from '../assets/NookLogo.png';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [error, setError] = useState('');
  const auth = getAuth();

  // Обработчик изменения email
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    // Валидация email с помощью регулярного выражения
    const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailValidationRegex.test(emailValue));
  };

  // Обработчик отправки формы
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isValidEmail) {
      try {
        // Проверка существования учетной записи с таким email
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        
        if (signInMethods.length > 0) {
          // Если уже существует метод входа для этого email, выводим ошибку
          setError('An account with this email already exists. Please log in.');
        } else {
          // Если нет учетной записи, переходим на страницу CompleteSignUp
          navigate('/complete-signup', { state: { email } });
        }
      } catch (error) {
        console.error('Error checking email:', error);
        setError('An error occurred. Please try again.');
      }
    } else {
      setError('Please enter a valid email.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-overlay"></div>
      <div className="register-page-content">
        <img src={logoImage} alt="Logo" className="register-logo" />
        <form className="register-form" onSubmit={handleFormSubmit}>
          <div className="register-input-container">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter Email" 
              value={email} 
              onChange={handleEmailChange} 
              required 
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="register-create-account-button">Sign Up</button>
          <div className="register-divider"><span>OR</span></div>
          <button type="button" className="register-login-button" onClick={() => navigate('/login')}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
