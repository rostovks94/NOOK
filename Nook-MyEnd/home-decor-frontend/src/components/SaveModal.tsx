import React from 'react';

interface SaveModalProps {
  onClose: () => void;  // Проп для закрытия модального окна
}

const SaveModal: React.FC<SaveModalProps> = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Save Your Changes</h2>
        <p>Are you sure you want to save these changes?</p>
        <button onClick={onClose}>Close</button> {/* Кнопка закрытия */}
        <button onClick={() => alert('Changes Saved!')}>Save</button> {/* Кнопка сохранения */}
      </div>
    </div>
  );
};

export default SaveModal;
