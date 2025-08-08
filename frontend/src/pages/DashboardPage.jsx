import React from 'react';
import Text from '../components/Text';
import Icon from '../components/Icon';
import { Lightbulb } from 'phosphor-react';
import { DEFAULT_USER_NAME } from '../constants';

function DashboardPage() {
  return (
    <div className="page-container">
      {/* Main content rack - first of many */}
      <div style={{ padding: '24px 0' }}>
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
                marginBottom: '0',
                color: 'var(--color-text-primary)'
              }}
            >
              Welcome back, {DEFAULT_USER_NAME.split(' ')[0]}!
            </Text>
            <Text 
              variant="body1" 
              style={{ 
                color: 'var(--neutral-700)',
                marginTop: '0'
              }}
            >
              Ready to create engaging content for your piano studio?
            </Text>
          </div>

          {/* Right side - Content Ideas */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '16px'
          }}>
            {/* Text group */}
            <div style={{ textAlign: 'right' }}>
              <Text 
                variant="body2" 
                style={{ 
                  color: 'var(--neutral-600)',
                  marginBottom: '0'
                }}
              >
                Content Ideas
              </Text>
              <Text 
                variant="label" 
                style={{ 
                  color: 'var(--neutral-900)',
                  marginTop: '0'
                }}
              >
                Always Fresh
              </Text>
            </div>

            {/* Lightbulb icon */}
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
