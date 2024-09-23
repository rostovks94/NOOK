import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/PersonalProfile.css';
import logoImage from '../assets/NookLogo.png';

const PersonalProfile: React.FC = () => {
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    localStorage.getItem('personalAvatarUrl') || null
  );
  const [postFiles, setPostFiles] = useState<File[]>([]);
  const [moodBoardFiles, setMoodBoardFiles] = useState<File[]>([]);
  const [uploadType, setUploadType] = useState<'post' | 'moodboard' | null>(null);

  // Handle avatar upload and save to localStorage
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

  // Handle file upload based on the selected upload type (post or moodboard)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);

      if (uploadType === 'post') {
        setPostFiles([...postFiles, ...filesArray]);
        console.log('Uploaded post files:', filesArray);
      } else if (uploadType === 'moodboard') {
        setMoodBoardFiles([...moodBoardFiles, ...filesArray]);
        console.log('Uploaded mood board files:', filesArray);
      }
    }
  };

  return (
    <div className="personal-profile-container">
      {/* Nook Logo */}
      <div className="nook-logo-container">
        <img src={logoImage} alt="Nook Logo" className="nook-logo-profile" />
      </div>

      {/* Avatar Upload Section */}
      <div className="user-profile-header">
        {avatarPreview ? (
          <img src={avatarPreview} alt="Avatar Preview" className="user-avatar" />
        ) : (
          <div className="empty-avatar">No Avatar</div>
        )}
        <input type="file" accept="image/*" onChange={handleAvatarUpload} className="avatar-upload-input" />
      </div>

      {/* User Profile Info */}
      <div className="user-profile-info">
        <h2 className="user-profile-name">Your_Name</h2>
        <p className="user-profile-bio">
          This is your personal profile bio where you can describe yourself or your style preferences.
        </p>
      </div>

      {/* Upload Type Selector */}
      <div className="upload-type-selector">
        <h3>What do you want to upload?</h3>
        <div>
          <label>
            <input 
              type="radio" 
              name="uploadType" 
              value="post" 
              onChange={() => setUploadType('post')} 
              checked={uploadType === 'post'} 
            /> 
            Post
          </label>
          <label>
            <input 
              type="radio" 
              name="uploadType" 
              value="moodboard" 
              onChange={() => setUploadType('moodboard')} 
              checked={uploadType === 'moodboard'} 
            /> 
            Mood Board
          </label>
        </div>
      </div>

      {/* File Upload Section */}
      {uploadType && (
        <div className="file-upload-section">
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

      {/* Save and Navigate Back to Main Feed */}
      <button className="personal-save-button" onClick={() => navigate('/mainfeed')}>
        Save and Return to Main
      </button>
    </div>
  );
};

export default PersonalProfile;
