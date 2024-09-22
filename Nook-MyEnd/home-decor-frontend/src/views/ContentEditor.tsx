import React, { useState } from 'react';

const ContentEditor: React.FC = () => {
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);

  const handleSave = () => {
    alert("Content saved with applied edits!");
  };

  return (
    <div>
      <h1>Content Editor</h1>
      <div>
        <label>Brightness</label>
        <input
          type="range"
          min="0"
          max="200"
          value={brightness}
          onChange={(e) => setBrightness(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Contrast</label>
        <input
          type="range"
          min="0"
          max="200"
          value={contrast}
          onChange={(e) => setContrast(parseInt(e.target.value))}
        />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ContentEditor;