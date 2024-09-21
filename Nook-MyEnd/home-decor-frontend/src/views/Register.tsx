import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; 
import '../css/Register.css';
import logoImage from '../assets/NookLogo.png'; 

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailValidationRegex.test(emailValue));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isValidEmail) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const token = userCredential.user.getIdToken();
          localStorage.setItem('authToken', token as unknown as string); 
          navigate('/complete-signup');
        })
        .catch((error) => {
          setError('Failed to register. Please try again.');
          console.error('Error during registration:', error);
        });
    } else {
      setError('Please enter a valid email');
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
          <div className="register-input-container">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter Password" 
              value={password} 
              onChange={(event) => setPassword(event.target.value)} 
              required 
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="register-create-account-button">Sign Up</button>
          <div className="register-divider"><span>OR</span></div>
          <button type="button" className="register-google-signup-button">Sign Up with Google</button>
          <button type="button" className="register-login-button" onClick={() => navigate('/login')}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Register;