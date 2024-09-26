import React, { useState } from 'react';
import bluecouch from '../assets/bluecouch.jpg';
import '../css/CreateMoodBoard.css';
import SaveConfirmation from './SaveConfirmation';

interface CreateMoodBoardProps {
  onClose: () => void;
}

const CreateMoodBoard: React.FC<CreateMoodBoardProps> = ({ onClose }) => {
  const [boardName, setBoardName] = useState('');
  const [isSecret, setIsSecret] = useState(false);
  const [collaborators, setCollaborators] = useState('');
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSaveConfirmation(true);
  };

  if (showSaveConfirmation) {
    return <SaveConfirmation closeSaveConfirmation={onClose} />;
  }

  return (
    <div className="create-moodboard-overlay" onClick={onClose}>
      <div className="create-moodboard-container" onClick={(e) => e.stopPropagation()}>
        <button className="create-moodboard-close-button" onClick={onClose}>
          ×
        </button>
        <div
          className="create-moodboard-image"
          style={{ backgroundImage: `url(${bluecouch})` }}
        ></div>
        <form onSubmit={handleSubmit}>
          <div className="create-moodboard-input-container">
            <label htmlFor="board-name" className="create-moodboard-label">Enter Mood Board Name</label>
            <input
              id="board-name"
              type="text"
              placeholder="Enter board name"
              className="create-moodboard-input"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              required
            />
          </div>

          <div className="create-moodboard-secret-toggle">
            <label className="create-moodboard-toggle-label">Secret Board</label>
            <label className="create-moodboard-toggle-switch">
              <input
                type="checkbox"
                checked={isSecret}
                onChange={() => setIsSecret(!isSecret)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="create-moodboard-input-container">
            <label htmlFor="collaborators" className="create-moodboard-label">Add Collaborators (optional)</label>
            <div className="create-moodboard-collaborators-search">
              <input
                id="collaborators"
                type="text"
                placeholder="Search"
                className="create-moodboard-input"
                value={collaborators}
                onChange={(e) => setCollaborators(e.target.value)}
              />
              <button type="button" className="create-moodboard-search-icon"></button>
            </div>
          </div>

          <div className="create-moodboard-button-container">
            <button type="button" className="create-moodboard-back-button" onClick={onClose}>
              Back
            </button>
            <button type="submit" className="create-moodboard-create-button">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMoodBoard;
