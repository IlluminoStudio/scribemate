import React from 'react';
import Dott from '../components/Dott';
import { getTransparentColor } from '../utils/common';

const ClockDot = ({ 
  name, 
  type = 'clockIn', 
  time, 
  color = 'var(--secondary-500)' 
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const transparentColor = getTransparentColor(color);
  const variant = type === 'clockIn' ? 'solid' : 'hollow';
  const actionText = type === 'clockIn' ? 'clocked in' : 'clocked out';
  const tooltipText = `${name}, ${actionText} at ${time}`;

  return (
    <div 
      style={{ 
        position: 'relative',
        cursor: 'help'
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Dott 
        color={transparentColor}
        variant={variant}
        size={12}
      />
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            padding: '4px 8px',
            color: color,
            fontSize: '12px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            zIndex: 1000,
            pointerEvents: 'none'
          }}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default ClockDot; 