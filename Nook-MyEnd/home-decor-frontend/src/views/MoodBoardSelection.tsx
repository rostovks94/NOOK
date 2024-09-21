import React from 'react';
import '../css/MoodBoardSelection.css';

import farmhouseKitchenImage from '../assets/FarmhouseKitchen.jpg';
import groovyLivingRoomImage from '../assets/GroovyLivingRoom.jpg';
import eclecticModernImage from '../assets/ElectricModern.jpg';
import plusIcon from '../assets/plus.png';

interface MoodBoardSelectionProps {
  onClose: () => void;
}

const MoodBoardSelection: React.FC<MoodBoardSelectionProps> = ({ onClose }) => {
  return (
    <div className="moodboard-selection-modal">
      <div className="moodboard-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        
        <h1>Save to Board</h1>
        
        <input type="text" placeholder="Search" className="search-input" />
        
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

          <button
            className="create-board-button"
            onClick={() => window.location.href = '/create-moodboard'}
          >
            <img src={plusIcon} alt="Create Mood Board Icon" />
            Create Mood Board
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodBoardSelection;