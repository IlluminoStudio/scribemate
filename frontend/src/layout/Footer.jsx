import React from 'react';
import Text from '../components/Text';
import { APP_NAME, getCurrentYear } from '../constants';

function Footer() {
  return (
    <footer className="footer">
      <Text variant="muted2" style={{ color: 'var(--neutral-0)' }}>
        &copy; {getCurrentYear()} {APP_NAME}. All rights reserved.
      </Text>
    </footer>
  );
}

export default Footer; 