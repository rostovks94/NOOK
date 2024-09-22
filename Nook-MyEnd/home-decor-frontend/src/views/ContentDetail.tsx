import React from 'react';

const ContentDetail: React.FC = () => {
  return (
    <div>
      <h1>Content Detail</h1>
      <p>Details about a specific piece of content.</p>
      <button onClick={() => window.location.href = '/moodboard-selection'}>Save to Mood Board</button>
    </div>
  );
};

export default ContentDetail;