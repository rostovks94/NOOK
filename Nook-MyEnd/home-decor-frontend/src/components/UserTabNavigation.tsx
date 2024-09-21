import React from 'react';

interface UserTabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const UserTabNavigation: React.FC<UserTabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tab-navigation">
      <button 
        className={activeTab === 'posts' ? 'active' : ''} 
        onClick={() => setActiveTab('posts')}
      >
        Posts
      </button>
      <button 
        className={activeTab === 'boards' ? 'active' : ''} 
        onClick={() => setActiveTab('boards')}
      >
        Boards
      </button>
      <button 
        className={activeTab === 'videos' ? 'active' : ''} 
        onClick={() => setActiveTab('videos')}
      >
        Videos
      </button>
      <button 
        className={activeTab === 'bulletins' ? 'active' : ''} 
        onClick={() => setActiveTab('bulletins')}
      >
        Bulletins
      </button>
    </div>
  );
};

export default UserTabNavigation;