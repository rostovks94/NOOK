import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/PersonalProfile.css';
import logoImage from '../assets/NookLogo.png';
import heartIcon from '../assets/LikeIcon.png';
import messageIcon from '../assets/message-icon.jpeg';
import homeIcon from '../assets/home-icon.png';
import profileIcon from '../assets/profile-icon.png';
import uploadIcon from '../assets/upload-icon.png';
import settingsIcon from '../assets/settings-icon.png';

const PersonalProfile: React.FC = () => {
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    localStorage.getItem('personalAvatarUrl') || null
  );
  const [postFiles, setPostFiles] = useState<File[]>([]);
  const [moodBoardFiles, setMoodBoardFiles] = useState<File[]>([]);
  const [uploadType, setUploadType] = useState<'post' | 'moodboard' | null>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const avatarUrl = reader.result as string;
        setAvatarPreview(avatarUrl);
        localStorage.setItem('personalAvatarUrl', avatarUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);

      if (uploadType === 'post') {
        setPostFiles([...postFiles, ...filesArray]);
      } else if (uploadType === 'moodboard') {
        setMoodBoardFiles([...moodBoardFiles, ...filesArray]);
      }
    }
  };

  return (
    <div className="container">
      <div className="scrollable-content">
        {/* Nook Logo and Header Icons */}
        <header className="header-container">
          <img src={logoImage} alt="Nook Logo" className="nook-logo-profile" />
          <div className="icon-container">
            <img src={heartIcon} alt="Likes" className="icon" />
            <img src={messageIcon} alt="Messages" className="icon" />
          </div>
        </header>

        <div className="profile-page">
          <header className="profile-header">
            <div className="profile-info">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar Preview" className="profile-img" />
              ) : (
                <div className="empty-avatar">No Avatar</div>
              )}
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="avatar-upload-input" />
              <div className="profile-details">
                <h2>Your_Name</h2>
                <p>This is your personal profile bio where you can describe yourself or your style preferences.</p>
              </div>
            </div>
          </header>

          <div className="upload-tabs">
            <button
              className={`tab ${uploadType === 'post' ? 'active' : ''}`}
              onClick={() => setUploadType('post')}
            >
              Post
            </button>
            <button
              className={`tab ${uploadType === 'moodboard' ? 'active' : ''}`}
              onClick={() => setUploadType('moodboard')}
            >
              Mood Board
            </button>
          </div>

          <div className="profile-grid">
            <div className="big-placeholder" /> {/* Placeholder for big image */}
            <div className="small-placeholder-grid">
              <div className="small-placeholder" />
              <div className="small-placeholder" />
              <div className="small-placeholder" />
              <div className="small-placeholder" />
            </div>
          </div>

          {/* File Upload Section */}
          {uploadType && (
            <div className="user-content">
              <h4>Upload Files for {uploadType === 'post' ? 'Post' : 'Mood Board'}</h4>
              <input type="file" accept="image/*,video/*" multiple onChange={handleFileUpload} />
              <div className="uploaded-files-list">
                {uploadType === 'post' && postFiles.length > 0 && (
                  <div>
                    <h5>Uploaded Post Files:</h5>
                    <ul>
                      {postFiles.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {uploadType === 'moodboard' && moodBoardFiles.length > 0 && (
                  <div>
                    <h5>Uploaded Mood Board Files:</h5>
                    <ul>
                      {moodBoardFiles.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
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

export default PersonalProfile;
