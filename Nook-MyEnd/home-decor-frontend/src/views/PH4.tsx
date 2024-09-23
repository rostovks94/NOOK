import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/PH4.css';

import logoImage from '../assets/NookLogo.png';
import profileImage from '../assets/user-profile4.jpg';

import heartIcon from '../assets/LikeIcon.png';
import messageIcon from '../assets/message-icon.jpeg';
import homeIcon from '../assets/home-icon.png';
import profileIcon from '../assets/profile-icon.png';
import uploadIcon from '../assets/upload-icon.png';
import settingsIcon from '../assets/settings-icon.png';

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
  const [activeTab, setActiveTab] = useState('boards');
  const [isFollowing, setIsFollowing] = useState(false); // State for follow button

  const toggleFollow = () => {
    setIsFollowing(!isFollowing); // Toggle between follow and following
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return <h3>Posts Content</h3>;
      case 'boards':
        return (
          <>
            <div className="moodboard-grid">
              <img src={pink1} alt="Pink decor 1" className="big-image" />
              <div className="small-images">
                <img src={pink2} alt="Pink decor 2" className="small-image" />
                <img src={pink3} alt="Pink decor 3" className="small-image" />
                <img src={pink4} alt="Pink decor 4" className="small-image" />
                <img src={pink5} alt="Pink decor 5" className="small-image" />
              </div>
            </div>

            <h3>All Pink Everything</h3>

            <div className="moodboard-grid">
              <img src={pink6} alt="Pink decor 6" className="big-image" />
              <div className="small-images">
                <img src={pink7} alt="Pink decor 7" className="small-image" />
                <img src={pink8} alt="Pink decor 8" className="small-image" />
                <img src={pink9} alt="Pink decor 9" className="small-image" />
                <img src={pink10} alt="Pink decor 10" className="small-image" />
              </div>
            </div>
          </>
        );
      case 'videos':
        return <h3>Videos Content</h3>;
      case 'bulletins':
        return <h3>Bulletins Content</h3>;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="scrollable-content">
        <header className="header-container">
          <Link to="/mainfeed">
            <img src={logoImage} alt="Nook Logo" className="nook-logo4" />
          </Link>
          <div className="icon-container">
            <img src={heartIcon} alt="Likes" className="icon" />
            <img src={messageIcon} alt="Messages" className="icon" />
          </div>
        </header>

        <div className="profile-page">
          <header className="profile-header">
            <div className="profile-info">
              <img src={profileImage} alt="Profile" className="profile-img" />
              <div className="profile-details">
                <h2>Yelena_Jones</h2>
                <p>
                  🌸 Lover of pink, pretty, and playful decor! Obsessed with soft pastels, and cozy textures. Always dreaming up chic, feminine vibes. Let’s connect! ✨
                </p>
              </div>
            </div>
          </header>

          <button className="follow-btn" onClick={toggleFollow}>
            {isFollowing ? 'Following' : 'Follow'}
          </button>

          <div className="tabs">
            <button className={`tab ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>
              Posts
            </button>
            <button className={`tab ${activeTab === 'boards' ? 'active' : ''}`} onClick={() => setActiveTab('boards')}>
              Boards
            </button>
            <button className={`tab ${activeTab === 'videos' ? 'active' : ''}`} onClick={() => setActiveTab('videos')}>
              Videos
            </button>
            <button className={`tab ${activeTab === 'bulletins' ? 'active' : ''}`} onClick={() => setActiveTab('bulletins')}>
              Bulletins
            </button>
          </div>

          <section className="content-section">
            {renderContent()}
          </section>
        </div>
      </div>

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
        <Link to="/settings">
          <img src={settingsIcon} alt="Settings" />
          <span>Settings</span>
        </Link>
      </footer>
    </div>
  );
};

export default PH4;
