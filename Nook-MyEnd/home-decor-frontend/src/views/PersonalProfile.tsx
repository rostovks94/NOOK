import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User, updateProfile } from 'firebase/auth';
import '../css/PersonalProfile.css';
import logoImage from '../assets/NookLogo.png';
import homeIcon from '../assets/home-icon.png';
import profileIcon from '../assets/profile-icon.png';
import uploadIcon from '../assets/upload-icon.png';
import settingsIcon from '../assets/settings-icon.png';

interface MoodBoard {
  name: string;
  files: File[];
}

const PersonalProfile: React.FC = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [bio, setBio] = useState<string>('');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [username, setUsername] = useState('Your Name');

  const [postFiles, setPostFiles] = useState<File[]>([]);
  const [moodBoardFiles, setMoodBoardFiles] = useState<File[]>([]);
  const [moodBoards, setMoodBoards] = useState<MoodBoard[]>([]); // Массив с mood boards
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [bulletinFiles, setBulletinFiles] = useState<File[]>([]);
  const [uploadType, setUploadType] = useState<'post' | 'moodboard' | 'video' | 'bulletin' | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [moodBoardName, setMoodBoardName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUsername(currentUser.displayName || 'Your Name');
      } else {
        setUser(null);
        setAvatarPreview(null);
        setBio('');
        setUsername('Your Name');
      }
    });
    return () => unsubscribe();
  }, [auth]);

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
          if (moodBoardFiles.length + filesArray.length >= 5) {
            setShowModal(true);
          }
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

  const handleModalSubmit = () => {
    if (moodBoardName && moodBoardFiles.length > 0) {
      const newMoodBoard: MoodBoard = {
        name: moodBoardName,
        files: moodBoardFiles,
      };
      setMoodBoards([...moodBoards, newMoodBoard]); // Сохраняем новый mood board
      setMoodBoardName('');
      setMoodBoardFiles([]);
      setShowModal(false);
    }
  };

  const handleNameEdit = async () => {
    if (user && username.trim()) {
      try {
        await updateProfile(user, { displayName: username });
        setIsEditingName(false);
        // Обновляем имя пользователя в Firebase
        setUser({ ...user, displayName: username });
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const renderMoodBoardGrid = (files: File[]) => {
    return files.length > 0 ? (
      <div className="profile-moodboard-grid-custom">
        <div className="profile-big-image-custom">
          <img src={URL.createObjectURL(files[0])} alt={files[0].name} />
        </div>
        <div className="profile-small-images-custom">
          {files.slice(1, 5).map((file, index) => (
            <div key={index} className="profile-small-image-custom">
              <img src={URL.createObjectURL(file)} alt={file.name} />
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="profile-post-placeholder">
        <p>No mood board uploaded yet. Upload your first mood board!</p>
      </div>
    );
  };

  const renderUploadedFiles = () => {
    switch (uploadType) {
      case 'moodboard':
        return renderMoodBoardGrid(moodBoardFiles);
      case 'post':
        return postFiles.length > 0 ? (
          postFiles.map((file, index) => (
            <div key={index} className="profile-post-container">
              <div className="profile-user-info-custom">
                <div className="profile-avatar-username">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="User Avatar" className="profile-user-avatar-post" />
                  ) : (
                    <div className="avatar-placeholder-post">No Avatar</div>
                  )}
                  <h2 className="profile-user-name">{username}</h2>
                </div>
              </div>
              <img src={URL.createObjectURL(file)} alt={file.name} className="profile-post-image-custom" />
            </div>
          ))
        ) : (
          <div className="profile-post-placeholder">
            <p>No post uploaded yet. Upload your first post!</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderMoodBoards = () => {
    return moodBoards.length > 0 ? (
      <div>
        {moodBoards.map((moodBoard, index) => (
          <div key={index} className="moodboard-section">
            <h3>{moodBoard.name}</h3>
            {renderMoodBoardGrid(moodBoard.files)}
          </div>
        ))}
      </div>
    ) : (
      <div className="profile-post-placeholder">
        <p>No mood boards created yet.</p>
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
              {isEditingName ? (
                <>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="username-input"
                  />
                  <button onClick={handleNameEdit} className="save-bio-button">
                    Save
                  </button>
                </>
              ) : (
                <h2 className="user-name" onClick={() => setIsEditingName(true)}>
                  {username}
                </h2>
              )}
              <div className="bio-container">
                {isEditingBio ? (
                  <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="bio-textarea" />
                ) : (
                  <p className="bio-text">{bio}</p>
                )}
                <button onClick={() => setIsEditingBio(!isEditingBio)} className="edit-bio-button">
                  {isEditingBio ? 'Save' : 'Edit'}
                </button>
              </div>
            </div>
          </header>

          <div className="profile-tabs">
            <button className={`profile-tab ${uploadType === 'post' ? 'active' : ''}`} onClick={() => setUploadType('post')}>
              Post
            </button>
            <button className={`profile-tab ${uploadType === 'moodboard' ? 'active' : ''}`} onClick={() => setUploadType('moodboard')}>
              Mood Board
            </button>
            <button className={`profile-tab ${uploadType === 'video' ? 'active' : ''}`} onClick={() => setUploadType('video')}>
              Videos
            </button>
            <button className={`profile-tab ${uploadType === 'bulletin' ? 'active' : ''}`} onClick={() => setUploadType('bulletin')}>
              Bulletin
            </button>
          </div>

          {uploadType === 'moodboard' ? renderMoodBoards() : renderUploadedFiles()}
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
          <input id="file-upload" type="file" accept="image/*,video/*" multiple style={{ display: 'none' }} onChange={handleFileUpload} />
        </label>
        <Link to="/settings">
          <img src={settingsIcon} alt="Settings" />
          <span>Settings</span>
        </Link>
      </footer>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Enter Mood Board Name</h3>
            <input type="text" value={moodBoardName} onChange={(e) => setMoodBoardName(e.target.value)} className="moodboard-name-input" />
            <button onClick={handleModalSubmit} className="modal-submit-button">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalProfile;
