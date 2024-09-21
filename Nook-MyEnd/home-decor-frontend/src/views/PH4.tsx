import React from 'react';
import { Link } from 'react-router-dom';
import '../css/PH4.css';

import logoImage from '../assets/NookLogo.png'; // Импорт логотипа
import profileImage from '../assets/user-profile4.jpg'; // Импорт аватарки профиля

// Импорт иконок для нижнего меню
import homeIcon from '../assets/home-icon.png';
import profileIcon from '../assets/profile-icon.png';
import uploadIcon from '../assets/upload-icon.png';
import settingsIcon from '../assets/settings-icon.png';

// Импорт изображений для сетки
import pink1 from '../assets/Pink1.jpeg';
import pink2 from '../assets/Pink2.jpeg';
import pink3 from '../assets/Pink3.jpeg';
import pink4 from '../assets/Pink4.jpeg';
import pink5 from '../assets/Pink5.jpeg';
import pink6 from '../assets/Pink6.jpeg';
import pink7 from '../assets/Pink7.jpeg';
import pink8 from '../assets/Pink8.jpeg';
import pink9 from '../assets/Pink9.jpeg';
import pink10 from '../assets/Pink10.jpeg';

const PH4: React.FC = () => {
  return (
    <div className="container">
      
      {/* Контент, который будет прокручиваться, включая логотип */}
      <div className="scrollable-content">
        <img src={logoImage} alt="Nook Logo" className="nook-logo4" /> {/* Логотип */}

        <div className="profile-page">
          <header className="profile-header">
          <div className="profile-info">
          <img src={profileImage} alt="Profile" className="profile-img" />
          <div className="profile-details">
          <h2>Yelena_Jones</h2>
          <p>🌸 Lover of pink, pretty, and playful decor! Obsessed with soft pastels, and cozy textures. Always dreaming up chic, feminine vibes. Let’s connect! ✨</p>
          </div>
          </div>
          </header>

          {/* Кнопка Follow под текстом профиля */}
          <button className="follow-btn">Follow</button>

          <div className="tabs">
            <button className="tab active">Posts</button>
            <button className="tab">Boards</button>
            <button className="tab">Videos</button>
            <button className="tab">Bulletins</button>
          </div>

          <section className="content-section">
            <h3>All Pink Everything</h3>
            <div className="content-grid">
              <img src={pink1} alt="Pink decor 1" />
              <img src={pink2} alt="Pink decor 2" />
              <img src={pink3} alt="Pink decor 3" />
              <img src={pink4} alt="Pink decor 4" />
              <img src={pink5} alt="Pink decor 5" />
              <img src={pink6} alt="Pink decor 6" />
              <img src={pink7} alt="Pink decor 7" />
              <img src={pink8} alt="Pink decor 8" />
              <img src={pink9} alt="Pink decor 9" />
              <img src={pink10} alt="Pink decor 10" />
            </div>
          </section>
        </div>
      </div>

      {/* Нижняя навигация */}
      <footer className="bottom-navigation">
        <Link to="/mainfeed">
          <img src={homeIcon} alt="Home" />
          <span>Home</span>
        </Link>
        <Link to="/personalprofile">
          <img src={profileIcon} alt="Profile" />
          <span>Profile</span>
        </Link>
        <Link to="/upload">
          <img src={uploadIcon} alt="Upload" />
          <span>Upload</span>
        </Link>
        <button disabled>
          <img src={settingsIcon} alt="Settings" />
          <span>Settings</span>
        </button>
      </footer>
    </div>
  );
};

export default PH4;