import React from 'react';
import bluecouch from '../assets/bluecouch.jpg'; // Импорт изображения
import '../css/SaveConfirmation.css';

interface SaveConfirmationProps {
  closeSaveConfirmation: () => void;
}

const SaveConfirmation: React.FC<SaveConfirmationProps> = ({ closeSaveConfirmation }) => {
  return (
    <div className="save-confirmation-overlay" onClick={closeSaveConfirmation}>
      <div className="save-confirmation-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeSaveConfirmation}>
          ×
        </button>
        <h1>Post Saved</h1>
        <div className="modal-image" style={{ backgroundImage: `url(${bluecouch})` }}></div>
      </div>
    </div>
  );
};

export default SaveConfirmation;
