import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; 
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
        setError('Invalid email or password. Please try again.');
        console.error('Error during login:', error);
      });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem('authToken', token);
      navigate('/mainfeed');
    } catch (error) {
      setError('Failed to login with Google. Please try again.');
      console.error('Error during Google Login:', error);
    }
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
          <button type="button" className="google-login-button" onClick={handleGoogleLogin}>
            Login with Google
          </button>
          <button type="button" className="signup-button" onClick={() => navigate('/register')}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;