import React from 'react';

import { APP_NAME } from '../constants';
import Text from '../components/Text';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { SignOut } from 'phosphor-react';
import '../styles/TopBar.css';

const TopBar = ({ userName, initials, onLogout }) => {
  return (
    <header className="top-bar">
      <div className="top-bar-left-group">
        <img 
          src="/logo.svg" 
          alt="Scribemate Logo" 
          className="top-bar-logo" 
        />
        <Text variant="body2" style={{ fontWeight: 600, color: 'var(--primary-800)' }}>
          {APP_NAME}
        </Text>
      </div>
      <div className="top-bar-right-group">
        <Text variant="caption" style={{ fontWeight: 500, color: 'var(--neutral-800)' }}>
          {userName}
        </Text>
        <Avatar initials={initials} variant="sm" />
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