import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import Footer from './Footer';
import { handleLogout, getInitials } from '../utils/common';
import { useUserData } from '../hooks/useSession';
import { DEFAULT_USER_NAME } from '../constants';
import { mockLogin } from '../mock_login.js';
import '../styles/App.css';

function MainLayout({ children }) {
  const { userData, updateSessionExpiry } = useUserData();
  const [initials, setInitials] = useState('');
  const location = useLocation();
  

  
  // Determine current page based on pathname
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/demo') return 'Demo';
    if (path === '/sandbox') return 'Sandbox';
    if (path === '/play') return 'Play';
    return 'Dashboard'; // default
  };

  // Trigger mock login when component mounts
  useEffect(() => {
    mockLogin();
  }, []);

  useEffect(() => {
    // Update initials when userData changes
    if (userData?.full_name) {
      setInitials(getInitials(userData.full_name));
    }
  }, [userData]);

  // Add event listeners for user interactions to extend session
  useEffect(() => {
    const handleUserInteraction = () => {
      updateSessionExpiry();
    };

    // Listen for various user interactions
    const events = ['click', 'keypress', 'scroll', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [updateSessionExpiry]);

  const layoutStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--primary-bg)',
  };

  const mainStyle = {
    flex: 1,
  };


  
  return (
    <div style={layoutStyle}>
      <TopBar 
        initials={initials || getInitials(DEFAULT_USER_NAME)} 
        onLogout={handleLogout}
        currentPage={getCurrentPage()}
      />
      {/* Future NavigationBar will go here */}
      <main style={mainStyle} className="app">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout; 