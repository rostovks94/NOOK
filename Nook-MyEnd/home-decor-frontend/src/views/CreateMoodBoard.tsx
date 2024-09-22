import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CreateMoodBoard.css';
import bluecouch from '../assets/bluecouch.jpg'; // Импортируем изображение напрямую

interface CreateMoodBoardProps {
  onClose: () => void;
}

const CreateMoodBoard: React.FC<CreateMoodBoardProps> = ({ onClose }) => {
  const [boardName, setBoardName] = useState('');
  const [category, setCategory] = useState('Living Room');
  const [isSecret, setIsSecret] = useState(false);
  const [collaborators, setCollaborators] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика для создания доски настроения (можно добавить сохранение через Firebase)
    // После успешного создания доски перенаправляем пользователя
    navigate('/home-decor-app/save-confirmation');
  };

  return (
    <div className="create-moodboard-modal">
      <div className="moodboard-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-image" style={{ backgroundImage: `url(${bluecouch})` }}></div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="board-name">Name Your Board</label>
          <input
            id="board-name"
            type="text"
            placeholder="Enter board name"
            className="input-field"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            required
          />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            className="input-field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Living Room</option>
            <option>Bedroom</option>
            <option>Office</option>
          </select>

          <label>
            <input
              type="checkbox"
              className="checkbox"
              checked={isSecret}
              onChange={() => setIsSecret(!isSecret)}
            />
            Secret Board
          </label>

          <label htmlFor="collaborators">Add Collaborators (optional)</label>
          <input
            id="collaborators"
            type="text"
            placeholder="Enter usernames"
            className="input-field"
            value={collaborators}
            onChange={(e) => setCollaborators(e.target.value)}
          />

          <div className="buttons">
            <button type="button" className="back-button" onClick={onClose}>
              Back
            </button>
            <button type="submit" className="create-button">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMoodBoard;
