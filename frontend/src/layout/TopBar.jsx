import React from 'react';
import { useNavigate } from 'react-router-dom';

import { APP_NAME, DEFAULT_USER_NAME } from '../constants';
import Text from '../components/Text';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { SignOut } from 'phosphor-react';
import { useUserData } from '../hooks/useSession';
import '../styles/TopBar.css';

const TopBar = ({ onLogout, currentPage = 'Dashboard' }) => {
  const navigate = useNavigate();
  const { userData } = useUserData();
  const { first_name, last_name } = userData || {};
  
  // Combine first_name and last_name to form userName
  const userName = first_name && last_name 
    ? `${first_name} ${last_name}` 
    : DEFAULT_USER_NAME;
  
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'content-library', label: 'Content Library', path: '/content-library' },
    { id: 'brand-assets', label: 'Brand Assets', path: '/brand-assets' },
    { id: 'settings', label: 'Settings', path: '/settings' }
  ];
  
  const handleNavigationClick = (path) => {
    navigate(path);
  };

  return (
    <header className="top-bar">
      <div className="top-bar-left-group">
        <img 
          src="/logo.svg" 
          alt="Scribemate Logo" 
          className="top-bar-logo" 
        />
        <Text variant="h4" style={{ fontWeight: 600, color: 'var(--primary-800)' }}>
          {APP_NAME}
        </Text>
        <div className="top-bar-navigation">
          {navigationItems.map((item) => {
            const isSelected = currentPage === item.label;
            return (
              <Text
                key={item.id}
                variant="h6"
                onClick={() => handleNavigationClick(item.path)}
                style={{
                  fontWeight: isSelected ? 400 : 400,
                  color: isSelected ? 'var(--primary-500)' : 'var(--neutral-700)',
                  borderRadius: isSelected ? '8px' : 'unset',
                  padding: isSelected ? '10px 12px' : 'unset',
                  backgroundColor: isSelected ? 'var(--primary-100)' : 'transparent',
                  cursor: 'pointer'
                }}
              >
                {item.label}
              </Text>
            );
          })}
        </div>
      </div>
      <div className="top-bar-right-group">
        <Avatar image="/camila.jpg" variant="sm" />
        <Text variant="body2" style={{ fontWeight: 500 }}>
           {userName}
        </Text>
        <Button 
          variant="text" 
          size="sm" 
          leftIcon={<SignOut weight="fill" size={16} />}
          onClick={onLogout}
          style={{ color: 'var(--neutral-600)' }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default TopBar; 