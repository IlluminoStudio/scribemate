import React from 'react';
import Text from '../components/Text';
import { APP_NAME, getCurrentYear } from '../constants';

function Footer() {
  return (
    <footer className="footer" style={{ 
      backgroundColor: 'var(--neutral-300)', 
      borderTop: 'none' 
    }}>
      <Text variant="muted2">
        &copy; {getCurrentYear()} {APP_NAME}. All rights reserved.
      </Text>
    </footer>
  );
}

export default Footer; 