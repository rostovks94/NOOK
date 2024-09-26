import React, { useState } from 'react';
import '../css/MoodBoardSelection.css';
import farmhouseKitchenImage from '../assets/FarmhouseKitchen.jpg';
import groovyLivingRoomImage from '../assets/GroovyLivingRoom.jpg';
import eclecticModernImage from '../assets/ElectricModern.jpg';
import plusIcon from '../assets/plus.png';
import CreateMoodBoard from './CreateMoodBoard';

interface MoodBoardSelectionProps {
  onClose: () => void;
}

const MoodBoardSelection: React.FC<MoodBoardSelectionProps> = ({ onClose }) => {
  const [showCreateMoodBoard, setShowCreateMoodBoard] = useState(false);

  const handleCreateBoardClick = () => {
    setShowCreateMoodBoard(true);
  };

  if (showCreateMoodBoard) {
    return <CreateMoodBoard onClose={onClose} />;
  }

  return (
    <div className="moodboard-selection-modal">
      <div className="moodboard-overlay" onClick={onClose}></div>
      <div className="moodboard-modal-content">
        <button className="moodboard-close-button" onClick={onClose}>×</button>
        <h1 className="moodboard-h1">Save to Board</h1>
        <input type="text" placeholder="Search" className="moodboard-search-input" />
        <div className="moodboard-list">
          <div className="moodboard-item">
            <img src={farmhouseKitchenImage} alt="Farmhouse Kitchen" />
            Farmhouse Kitchen
          </div>
          <div className="moodboard-item">
            <img src={groovyLivingRoomImage} alt="Groovy Living Room" />
            Groovy Living Room
          </div>
          <div className="moodboard-item">
            <img src={eclecticModernImage} alt="Eclectic Modern" />
            Eclectic Modern
          </div>
          <button className="moodboard-create-board-button" onClick={handleCreateBoardClick}>
            <img src={plusIcon} alt="Create Mood Board Icon" />
            Create Mood Board
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodBoardSelection;  