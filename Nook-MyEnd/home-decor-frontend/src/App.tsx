import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainFeed from './views/MainFeed'; 
import ContentDetail from './views/ContentDetail';
import MoodBoardSelection from './views/MoodBoardSelection'; 
import CreateMoodBoard from './views/CreateMoodBoard'; 
import SaveConfirmation from './views/SaveConfirmation'; 
import PH4 from './views/PH4';
import Register from './views/Register';
import Login from './views/Login'; 
import CompleteSignUp from './views/CompleteSignUp';
import PersonalProfile from './views/PersonalProfile';
import SaveModal from './components/SaveModal'; 

const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  console.log('Token exists:', !!token); 
  return !!token; 
};

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isAuth = isAuthenticated();
  if (!isAuth) {
    console.warn('User is not authenticated, redirecting to login');
  }
  return isAuth ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/complete-signup" element={<CompleteSignUp />} />

        <Route path="/mainfeed" element={<PrivateRoute><MainFeed /></PrivateRoute>} />
        <Route path="/content/:id" element={<PrivateRoute><ContentDetail /></PrivateRoute>} />
        <Route path="/moodboards" element={<PrivateRoute><MoodBoardSelection onClose={() => {}} /></PrivateRoute>} />
        <Route path="/create-moodboard" element={<PrivateRoute><CreateMoodBoard onClose={() => {}} /></PrivateRoute>} />
        <Route path="/savemodal" element={<PrivateRoute><SaveModal onClose={() => {}} /></PrivateRoute>} />
        <Route path="/personalprofile" element={<PrivateRoute><PersonalProfile /></PrivateRoute>} />
        <Route path="/save-confirmation" element={<SaveConfirmation />} />
        <Route path="/user-profile/:username" element={<PrivateRoute><PH4 /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
