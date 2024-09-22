import React, { useState } from 'react';
<<<<<<< HEAD
import logoImage from '../assets/NookLogo.png'; // Импортируем изображение логотипа
=======
>>>>>>> 8025780507bbb4210761c023cac445f958e4cb0c
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../firebaseConfig'; 
import '../css/Register.css';
<<<<<<< HEAD

=======
import logoImage from '../assets/NookLogo.png'; 
>>>>>>> 8025780507bbb4210761c023cac445f958e4cb0c

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailValidationRegex.test(emailValue));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isValidEmail) {
      try {
        // Use createUserWithEmailAndPassword for registration with email
        const userCredential = await createUserWithEmailAndPassword(auth, email, ''); // No password provided
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
          <div className="register-divider"><span>OR</span></div> {/* Разделитель OR */}
          <button type="button" className="register-login-button" onClick={() => navigate('/login')}>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
