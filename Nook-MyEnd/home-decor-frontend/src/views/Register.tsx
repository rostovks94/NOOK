import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'; 
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

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isValidEmail) {
      try {
        // Use createUserWithEmailAndPassword for registration with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        localStorage.setItem('authToken', token);
        navigate('/complete-signup');
      } catch (error: any) {
        // Handle different registration errors
        if (error.code === 'auth/email-already-in-use') {
          setError('This email is already registered. Please use a different email or sign in to your account.');
        } else {
          setError('Registration error. Please try again.');
        }
      }
    } else {
      setError('Please enter a valid email.');
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem('authToken', token);
      navigate('/mainfeed');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered with Google. Please sign in to your account.');
      } else {
        setError('Google sign-up error. Please try again.');
      }
      console.error('Error during Google Sign-Up:', error);
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
              onChange={handlePasswordChange}
              required 
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="register-create-account-button">Sign Up</button>
          <div className="register-divider"><span>OR</span></div>
          <button type="button" className="register-google-signup-button" onClick={handleGoogleSignUp}>
            Sign up with Google
          </button>
          <button type="button" className="register-login-button" onClick={() => navigate('/login')}>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Register;