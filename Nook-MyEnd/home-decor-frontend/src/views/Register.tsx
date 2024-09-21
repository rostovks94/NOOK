import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';
import logoImage from '../assets/NookLogo.png'; 

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailValidationRegex.test(emailValue));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isValidEmail) {
      localStorage.setItem('authToken', 'dummyToken');
      navigate('/complete-signup');
    } else {
      alert('Please enter a valid email');
    }
  };

  const handleGoogleSignUp = () => {
    alert('Google Signup Clicked');
  };

  return (
    <div className="register-page">
      <div className="register-overlay"></div>
      <div className="register-page-content">
        {/* Используем логотип как изображение */}
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

          <button type="submit" className="register-create-account-button">
            Sign Up
          </button>

          <div className="register-divider"><span>OR</span></div>

          <button 
            type="button" 
            className="register-google-signup-button"
            onClick={handleGoogleSignUp}
          >
            Sign Up with Google
          </button>

          <button 
            type="button" 
            className="register-login-button" 
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;