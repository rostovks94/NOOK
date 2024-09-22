import React, { useEffect } from 'react';
import '../css/SaveConfirmation.css';

const SaveConfirmation: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = '/home-decor-app/main-feed';
    }, 2000);
  }, []);

  return (
    <div className="save-confirmation-modal">
      <div className="modal-content">
        <h1>Post Saved</h1>
        <p>Your post has been saved to the mood board.</p>
        <button onClick={() => window.location.href = '/home-decor-app/main-feed'} className="back-button">Back to Main Feed</button>
      </div>
    </div>
  );
};

export default SaveConfirmation;