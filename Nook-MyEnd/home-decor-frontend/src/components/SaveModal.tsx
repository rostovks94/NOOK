import React from 'react';

interface SaveModalProps {
  onClose: () => void;
}

const SaveModal: React.FC<SaveModalProps> = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Save Your Changes</h2>
        <p>Are you sure you want to save these changes?</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SaveModal;