import React from 'react';

import { APP_NAME } from '../constants';
import Text from '../components/Text';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { SignOut } from 'phosphor-react';
import '../styles/TopBar.css';

const TopBar = ({ onLogout, currentPage = 'Dashboard' }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'content-library', label: 'Content Library' },
    { id: 'brand-assets', label: 'Brand Assets' },
    { id: 'settings', label: 'Settings' }
  ];

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
          Camila Rowling
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