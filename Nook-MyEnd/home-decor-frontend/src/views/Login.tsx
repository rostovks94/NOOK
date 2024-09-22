import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 
import '../css/Login.css'; 
import NookLogo from '../assets/NookLogo.png'; 

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const token = userCredential.user.getIdToken();
        localStorage.setItem('authToken', token as unknown as string); 
        navigate('/mainfeed');
      })
      .catch((error) => {
        if (error instanceof Error && 'code' in error) {
          const firebaseError = error as { code: string };
          
          if (firebaseError.code === 'auth/user-not-found') {
            setError('This email is not registered. Please sign up or try a different email.');
          } else if (firebaseError.code === 'auth/wrong-password') {
            setError('Incorrect password. Please try again.');
          } else {
            setError('Login failed. Please check your credentials and try again.');
          }
        } else {
          setError('An unknown error occurred. Please try again.');
        }
        console.error('Error during login:', error);
      });
  };

  return (
    <div className="login-page">
      <div className="login-overlay"></div>
      <div className="login-container">
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
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">Login</button>
          <div className="divider"><span>OR</span></div>
          <button type="button" className="signup-button" onClick={() => navigate('/register')}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
