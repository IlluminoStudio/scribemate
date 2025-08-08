import React from 'react';
import Text from '../components/Text';
import Icon from '../components/Icon';
import { Lightbulb } from 'phosphor-react';
import { DEFAULT_USER_NAME } from '../constants';

function DashboardPage() {
  return (
    <div style={{
      padding: '4px 80px',
      borderBottom: '1px solid var(--neutral-300)'
    }}>
      {/* Main content rack - first of many */}
      <div className="page-container" style={{ padding: '24px 0' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          gap: '16px'
        }}>
          {/* Left side - Welcome text */}
          <div style={{ flex: 1 }}>
            <Text 
              variant="h3" 
              style={{ 
                fontWeight: 700, 
                color: 'var(--color-text-primary)'
              }}
            >
              Welcome back, {DEFAULT_USER_NAME.split(' ')[0]}!
            </Text>
            <Text 
              variant="body1" 
              style={{ 
                color: 'var(--neutral-700)'
              }}
            >
              Ready to create engaging content for your piano studio?
            </Text>
          </div>

          {/* Right side - Lightbulb icon only */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center'
          }}>
            <Icon 
              variant="roundedSquare" 
              size={40} 
              noBg={false}
            >
              <Lightbulb weight="fill" size={24} />
            </Icon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
