import React, { useState } from 'react';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('posts');

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return <div>Posts content</div>;
      case 'boards':
        return <div>Boards content</div>;
      case 'videos':
        return <div>Videos content</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab('posts')}>Posts</button>
        <button onClick={() => setActiveTab('boards')}>Boards</button>
        <button onClick={() => setActiveTab('videos')}>Videos</button>
      </nav>
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Tabs;