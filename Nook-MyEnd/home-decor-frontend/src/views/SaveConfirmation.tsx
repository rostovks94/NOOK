import React, { useEffect } from 'react';
import bluecouch from '../assets/bluecouch.jpg'; // Import the image
import '../css/SaveConfirmation.css';

const SaveConfirmation: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/home-decor-app/main-feed';
    }, 2000);
    
    return () => clearTimeout(timer); // Cleanup the timeout
  }, []);

  return (
    <div className="save-confirmation-modal">
      <div className="modal-content">
        <button className="close-button" onClick={() => window.location.href = '/home-decor-app/main-feed'}>
          ×
        </button>
        <h1>Post Saved</h1>
        <div className="modal-image" style={{ backgroundImage: `url(${bluecouch})` }}></div>
        <p>Your post has been saved to the mood board.</p>
        <button onClick={() => window.location.href = '/home-decor-app/main-feed'} className="back-button">
          Back to Main Feed
        </button>
      </div>
    </div>
  );
};

export default SaveConfirmation;
