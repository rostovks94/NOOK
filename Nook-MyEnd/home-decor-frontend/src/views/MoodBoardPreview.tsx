import React from 'react';
import '../css/MoodBoardPreview.css';

import RetroKitchenImage from '../assets/RetroKitchen.jpg';
import PastelModernImage from '../assets/PastelModern.jpg';
import CottageCoreImage from '../assets/CottageCore.jpg';

interface MoodBoardPreviewProps {
  name: string;
}

const MoodBoardPreview: React.FC<MoodBoardPreviewProps> = ({ name }) => {
  let imageSrc = '';

  if (name === 'Retro Kitchen') {
    imageSrc = RetroKitchenImage;
  } else if (name === 'Pastel Modern') {
    imageSrc = PastelModernImage;
  } else if (name === 'Cottage Core') {
    imageSrc = CottageCoreImage;
  }

  return (
    <div className="moodboard-preview">
      <div className="moodboard-image" style={{ backgroundImage: `url(${imageSrc})` }}></div>
      <p>{name}</p>
    </div>
  );
};

export default MoodBoardPreview;