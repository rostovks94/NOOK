import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/PersonalProfile.css';
import logoImage from '../assets/NookLogo.png'; // Логотип Nook

const PersonalProfile: React.FC = () => {
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(localStorage.getItem('personalAvatarUrl') || null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const avatarUrl = reader.result as string;
        setAvatarPreview(avatarUrl);
        localStorage.setItem('personalAvatarUrl', avatarUrl); // Сохраняем URL аватара в localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="personal-profile-container">
      {/* Логотип Nook */}
      <div className="nook-logo-container">
        <img src={logoImage} alt="Nook Logo" className="nook-logo-profile" />
      </div>

      {/* Заголовок профиля без зафиксированного аватара */}
      <div className="user-profile-header">
        {avatarPreview ? (
          <img src={avatarPreview} alt="Avatar Preview" />
        ) : (
          <div className="empty-avatar">No Avatar</div>
        )}
        {/* Загрузка аватара */}
        <input type="file" accept="image/*" onChange={handleAvatarUpload} />
      </div>

      {/* Информация профиля */}
      <div className="user-profile-info">
        <h2 className="user-profile-name">Your_Name</h2>
        <p className="user-profile-bio">This is your personal profile bio where you can describe yourself or your style preferences.</p>
      </div>

      {/* Навигационные вкладки */}
      <div className="tab-navigation">
        <button className="active">Posts</button>
        <button>Boards</button>
        <button>Videos</button>
        <button>Bulletins</button>
      </div>

      {/* Содержимое вкладок */}
      <div className="user-content">
        <p>Upload your first design</p>
        <button className="upload-button">Upload your first design</button>
      </div>

      {/* Кнопка для возврата на главную страницу */}
      <button className="personal-save-button" onClick={() => navigate('/mainfeed')}>
        Save and Return to Main
      </button>
    </div>
  );
};

export default PersonalProfile;