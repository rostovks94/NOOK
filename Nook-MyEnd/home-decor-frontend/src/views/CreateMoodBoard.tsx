import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CreateMoodBoard.css';

const CreateMoodBoard: React.FC = () => {
  const [boardName, setBoardName] = useState('');
  const [category, setCategory] = useState('Living Room');
  const [isSecret, setIsSecret] = useState(false);
  const [collaborators, setCollaborators] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Навигация с правильным использованием `basename`
    navigate('/home-decor-app/save-confirmation'); 
  };

  return (
    <div className="create-moodboard-modal">
      <div className="modal-content">
        <h1>Create New Mood Board</h1>
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
            <button 
              type="button" 
              className="back-button" 
              onClick={() => window.history.back()}
            >
              Back
            </button>
            <button type="submit" className="save-button">Save Board</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMoodBoard;