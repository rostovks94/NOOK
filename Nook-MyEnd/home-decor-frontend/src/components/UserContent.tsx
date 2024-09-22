import React from 'react';
import SampleImage2 from '../assets/SampleImage2.jpeg';
import Pink1 from '../assets/Pink1.jpeg';
import Pink2 from '../assets/Pink2.jpeg';
import Pink3 from '../assets/Pink3.jpeg';
import Pink4 from '../assets/Pink4.jpeg';
import Pink5 from '../assets/Pink5.jpeg';
import Pink6 from '../assets/Pink6.jpeg';
import Pink7 from '../assets/Pink7.jpeg';
import Pink8 from '../assets/Pink8.jpeg';
import Pink9 from '../assets/Pink9.jpeg'; 

interface UserContentProps {
  activeTab: string;
}

const UserContent: React.FC<UserContentProps> = ({ activeTab }) => {
  if (activeTab === 'boards') {
    return (
      <div className="user-content">
        <h2>All Pink Everything</h2>
        <img src={SampleImage2} alt="Sample" />
        <img src={Pink1} alt="Pink 1" />
        <img src={Pink2} alt="Pink 2" />
        <img src={Pink3} alt="Pink 3" />
        <img src={Pink4} alt="Pink 4" />
        <img src={Pink5} alt="Pink 5" />
        <img src={Pink6} alt="Pink 6" />
        <img src={Pink7} alt="Pink 7" />
        <img src={Pink8} alt="Pink 8" />
        <img src={Pink9} alt="Pink 9" />
      </div>
    );
  }

  return <div className="user-content"><p>No content for this tab yet.</p></div>;
};

export default UserContent;