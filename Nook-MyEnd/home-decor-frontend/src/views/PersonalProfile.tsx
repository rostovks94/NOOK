import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/PersonalProfile.css';
<<<<<<< HEAD
import logoImage from '../assets/NookLogo.png';

const PersonalProfile: React.FC = () => {
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    localStorage.getItem('personalAvatarUrl') || null
  );
=======
import logoImage from '../assets/NookLogo.png'; 

const PersonalProfile: React.FC = () => {
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(localStorage.getItem('personalAvatarUrl') || null);
>>>>>>> 8025780507bbb4210761c023cac445f958e4cb0c

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const avatarUrl = reader.result as string;
        setAvatarPreview(avatarUrl);
<<<<<<< HEAD
        localStorage.setItem('personalAvatarUrl', avatarUrl);
=======
        localStorage.setItem('personalAvatarUrl', avatarUrl); 
>>>>>>> 8025780507bbb4210761c023cac445f958e4cb0c
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="personal-profile-container">
<<<<<<< HEAD
=======
  
>>>>>>> 8025780507bbb4210761c023cac445f958e4cb0c
      <div className="nook-logo-container">
        <img src={logoImage} alt="Nook Logo" className="nook-logo-profile" />
      </div>

<<<<<<< HEAD
=======
  
>>>>>>> 8025780507bbb4210761c023cac445f958e4cb0c
      <div className="user-profile-header">
        {avatarPreview ? (
          <img src={avatarPreview} alt="Avatar Preview" />
        ) : (
          <div className="empty-avatar">No Avatar</div>
        )}
<<<<<<< HEAD
        <input type="file" accept="image/*" onChange={handleAvatarUpload} />
      </div>

      <div className="user-profile-info">
        <h2 className="user-profile-name">Your_Name</h2>
        <p className="user-profile-bio">
          This is your personal profile bio where you can describe yourself or your style preferences.
        </p>
      </div>

=======
      
        <input type="file" accept="image/*" onChange={handleAvatarUpload} />
      </div>


      <div className="user-profile-info">
        <h2 className="user-profile-name">Your_Name</h2>
        <p className="user-profile-bio">This is your personal profile bio where you can describe yourself or your style preferences.</p>
      </div>

   
>>>>>>> 8025780507bbb4210761c023cac445f958e4cb0c
      <div className="tab-navigation">
        <button className="active">Posts</button>
        <button>Boards</button>
        <button>Videos</button>
        <button>Bulletins</button>
      </div>

<<<<<<< HEAD
=======
   
>>>>>>> 8025780507bbb4210761c023cac445f958e4cb0c
      <div className="user-content">
        <p>Upload your first design</p>
        <button className="upload-button">Upload your first design</button>
      </div>

<<<<<<< HEAD
=======
   
>>>>>>> 8025780507bbb4210761c023cac445f958e4cb0c
      <button className="personal-save-button" onClick={() => navigate('/mainfeed')}>
        Save and Return to Main
      </button>
    </div>
  );
};

export default PersonalProfile;