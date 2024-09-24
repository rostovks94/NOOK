import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import '../css/PersonalProfile.css';
import logoImage from '../assets/NookLogo.png';
import homeIcon from '../assets/home-icon.png';
import profileIcon from '../assets/profile-icon.png';
import uploadIcon from '../assets/upload-icon.png';
import settingsIcon from '../assets/settings-icon.png';

const PersonalProfile: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    localStorage.getItem('userProfileAvatar') || null
  );
  const [bio, setBio] = useState<string>(
    localStorage.getItem('userProfileBio') || ''
  );
  const [isEditingBio, setIsEditingBio] = useState(false);
  const username = localStorage.getItem('username'); // Получение имени пользователя

  const [postFiles, setPostFiles] = useState<File[]>([]);
  const [moodBoardFiles, setMoodBoardFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [bulletinFiles, setBulletinFiles] = useState<File[]>([]);
  const [uploadType, setUploadType] = useState<'post' | 'moodboard' | 'video' | 'bulletin' | null>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const avatarUrl = reader.result as string;
        setAvatarPreview(avatarUrl);
        localStorage.setItem('userProfileAvatar', avatarUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBioSave = () => {
    setIsEditingBio(false);
    localStorage.setItem('userProfileBio', bio);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);

      switch (uploadType) {
        case 'post':
          setPostFiles([...postFiles, ...filesArray]);
          break;
        case 'moodboard':
          setMoodBoardFiles([...moodBoardFiles, ...filesArray]);
          break;
        case 'video':
          setVideoFiles([...videoFiles, ...filesArray]);
          break;
        case 'bulletin':
          setBulletinFiles([...bulletinFiles, ...filesArray]);
          break;
      }
    }
  };

  const renderUploadedFiles = () => {
    let filesToDisplay: File[] = [];

    switch (uploadType) {
      case 'post':
        if (postFiles.length > 0) {
          // Показывать аватар и имя пользователя, если загружены посты
          return (
            <div className="user-card-custom">
              <div className="user-info-custom">
                <div className="profile-picture-custom" style={{ backgroundImage: `url(${avatarPreview})` }} />
                <h2>{user?.displayName || username || 'Your Name'}</h2> {/* Отображение имени пользователя */}
              </div>
              <div className="user-content-grid-custom">
                {postFiles.map((file, index) => (
                  <div key={index} className="post-item">
                    <img src={URL.createObjectURL(file)} alt={file.name} className="post-image-custom" />
                  </div>
                ))}
              </div>
            </div>
          );
        } else {
          return <p>No posts yet. Upload your first post!</p>;
        }
      case 'moodboard':
        filesToDisplay = moodBoardFiles;
        break;
      case 'video':
        filesToDisplay = videoFiles;
        break;
      case 'bulletin':
        filesToDisplay = bulletinFiles;
        break;
      default:
        return null;
    }

    return (
      <div className="moodboard-grid-custom">
        <div className="big-image-custom">
          {filesToDisplay.length > 0 && (
            <img
              src={URL.createObjectURL(filesToDisplay[0])}
              alt={filesToDisplay[0].name}
              className="big-image-custom"
            />
          )}
        </div>
        <div className="small-images-custom">
          {filesToDisplay.slice(1, 5).map((file, index) => (
            <div key={index} className="small-image-custom">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="small-image-custom"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="profile-container">
      <div className="scrollable-content">
        <header className="profile-header">
          <img src={logoImage} alt="Nook Logo" className="profile-logo" />
        </header>

        <div className="user-profile-section">
          <header className="user-info-section">
            <div className="user-info">
              {avatarPreview ? (
                <div className="user-avatar">
                  <img src={avatarPreview} alt="Avatar Preview" className="user-avatar" />
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="avatar-upload-button" />
                </div>
              ) : (
                <div className="avatar-placeholder">
                  No Avatar
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="avatar-upload-button" />
                </div>
              )}
            </div>
            <div className="user-details">
              <h2 className="user-name">{username || 'Your Name'}</h2> {/* Отображение имени пользователя */}
              <div className="bio-container">
                {isEditingBio ? (
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="bio-textarea"
                  />
                ) : (
                  <p className="bio-text">{bio}</p>
                )}
                <button
                  onClick={() => setIsEditingBio(!isEditingBio)}
                  className="edit-bio-button"
                >
                  {isEditingBio ? 'Save' : 'Edit'}
                </button>
              </div>
            </div>
          </header>

          <div className="profile-tabs">
            <button
              className={`profile-tab ${uploadType === 'post' ? 'active' : ''}`}
              onClick={() => setUploadType('post')}
            >
              Post
            </button>
            <button
              className={`profile-tab ${uploadType === 'moodboard' ? 'active' : ''}`}
              onClick={() => setUploadType('moodboard')}
            >
              Mood Board
            </button>
            <button
              className={`profile-tab ${uploadType === 'video' ? 'active' : ''}`}
              onClick={() => setUploadType('video')}
            >
              Videos
            </button>
            <button
              className={`profile-tab ${uploadType === 'bulletin' ? 'active' : ''}`}
              onClick={() => setUploadType('bulletin')}
            >
              Bulletin
            </button>
          </div>

          {renderUploadedFiles()}
        </div>
      </div>

      <footer className="profile-navigation">
        <Link to="/mainfeed">
          <img src={homeIcon} alt="Home" />
          <span>Home</span>
        </Link>
        <Link to="/personalprofile">
          <img src={profileIcon} alt="Profile" />
          <span>Profile</span>
        </Link>
        <label htmlFor="file-upload">
          <img src={uploadIcon} alt="Upload" />
          <span>Upload</span>
          <input
            id="file-upload"
            type="file"
            accept="image/*,video/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </label>
        <Link to="/settings">
          <img src={settingsIcon} alt="Settings" />
          <span>Settings</span>
        </Link>
      </footer>
    </div>
  );
};

export default PersonalProfile;
