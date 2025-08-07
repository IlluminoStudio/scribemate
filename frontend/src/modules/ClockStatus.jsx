import React from 'react';
import Text from '../components/Text';
import Dott from '../components/Dott';
import { Clock } from 'phosphor-react';

const ClockStatus = ({ isClockIn, startTime, date, duration }) => {
  const containerStyle = {
    backgroundColor: isClockIn ? 'var(--primary-100)' : 'var(--neutral-200)',
    border: `1px solid ${isClockIn ? 'var(--primary-200)' : 'var(--neutral-300)'}`,
    borderRadius: '8px',
    padding: '8px 16px',
    minHeight: '90px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: isClockIn ? 'flex-start' : 'center',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  };

  const statusStyle = {
    display: 'flex',
    alignItems: 'center',
    color: isClockIn ? 'var(--primary-500)' : 'var(--neutral-500)',
  };

  const contentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  };

  const labelRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  };

  const timeInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const durationStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  };

  return (
    <div style={{ backgroundColor: 'var(--neutral-0)', boxShadow: 'var(--shadow-sm)', borderRadius: '12px', padding: '24px' }}>
      <div style={labelRowStyle}>
        <Text variant="h5" style={{ fontWeight: 600, color: 'var(--neutral-900)' }}>Clock Status</Text>
        <div style={statusStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Dott 
              color={isClockIn ? 'var(--primary-500)' : 'var(--neutral-600)'}
              size={10}
            />
            <Text variant="body2" style={{ color: 'inherit', fontWeight: 500 }}>
              {isClockIn ? 'Clocked In' : 'Not Clocked In'}
            </Text>
          </div>
        </div>
      </div>
      <div style={containerStyle}>
        {isClockIn ? (
          <>
            <div style={headerStyle}>
              <Text variant="body2" style={{ color: 'var(--neutral-700)' }}>
                Started shift at
              </Text>
            </div>
            <div style={contentStyle}>
              <div style={timeInfoStyle}>
                <Text variant="h5" style={{ color: 'var(--neutral-900)', fontWeight: 600 }}>{startTime}</Text>
                <Text variant="muted2" style={{color: 'var(--neutral-600)'}}>{date}</Text>
              </div>
              {duration && (
                <div style={durationStyle}>
                  <Text variant="caption" style={{ color: 'var(--neutral-700)' }}>Duration</Text>
                  <Text variant="h5" style={{ color: 'var(--primary-500)', fontWeight: 600 }}>
                    {duration}
                  </Text>
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <Clock size={16} color="var(--neutral-800)" />
                <Text variant="h5" style={{ color: 'var(--neutral-900)', fontWeight: 600 }}>You are not clocked in</Text>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClockStatus; 