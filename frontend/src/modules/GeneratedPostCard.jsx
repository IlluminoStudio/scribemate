import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Text from '../components/Text';
import Icon from '../components/Icon';
import { ArrowClockwise, Download, Copy, CaretDown, CaretUp, LockOpen } from 'phosphor-react';

function GeneratedPostCard({ text, image, style = {}, ...props }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Truncate text to 350 characters initially
  const truncatedText = text.length > 350 ? text.substring(0, 350) + '...' : text;
  const displayText = isExpanded ? text : truncatedText;
  const shouldShowSeeMore = text.length > 350;

  const handleToggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRegenerateText = () => {
    console.log('Regenerate text clicked');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
        background: 'var(--neutral-100)',
        borderRadius: '8px',
        border: '1px solid var(--neutral-300)',
        ...style,
      }}
      {...props}
    >
      {/* Text Content Section */}
      <div
        style={{
          borderRadius: '8px',
          border: '1px solid var(--neutral-300)',
          background: 'var(--neutral-0)',
          padding: '16px',
        }}
      >
        <Text 
          variant="body1" 
          color="var(--neutral-900)"
          style={{ marginBottom: '16px', lineHeight: '1.5' }}
        >
          {displayText}
        </Text>
        
        {/* Action Buttons Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Toggle Text Button */}
          {shouldShowSeeMore && (
            <Button
              variant="text"
              color="primary"
              size="sm"
              onClick={handleToggleText}
              style={{ 
                padding: '8px 0',
                color: 'var(--primary-500)',
                fontWeight: 500,
                gap: '4px'
              }}
            >
              <Text variant="body2" color="var(--primary-500)" style={{ fontWeight: 500 }}>
                {isExpanded ? 'see less' : 'see more'}
              </Text>
              {isExpanded ? (
                <CaretUp size={16} weight="bold" />
              ) : (
                <CaretDown size={16} weight="bold" />
              )}
            </Button>
          )}
          
          {/* Regenerate Text Button */}
          <Button
            variant="text"
            color="primary"
            size="sm"
            onClick={handleRegenerateText}
            style={{ 
              padding: '8px 0',
              color: 'var(--primary-500)',
              fontWeight: 500,
              marginLeft: 'auto',
              gap: '4px'
            }}
          >
            <ArrowClockwise size={16} weight="bold" />
            <Text variant="body2" color="var(--primary-500)" style={{ fontWeight: 500 }}>
              Regenerate Text
            </Text>
          </Button>
        </div>
      </div>

      {/* Image Section */}
      <div
        style={{
          borderRadius: '8px',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '12px',
          position: 'relative',
          minHeight: '200px',
        }}
      >
        {/* Icon Buttons Overlay */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            gap: '8px',
          }}
        >
          {/* Refresh Button */}
          <Icon
            variant="circle"
            size={32}
            noBg={false}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              cursor: 'pointer',
            }}
            color="var(--neutral-900)"
          >
            <ArrowClockwise weight="bold" />
          </Icon>
          
          {/* Download Button */}
          <Icon
            variant="circle"
            size={32}
            noBg={false}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              cursor: 'pointer',
            }}
            color="var(--neutral-900)"
          >
            <Download weight="bold" />
          </Icon>
          
          {/* Copy Button */}
          <Icon
            variant="circle"
            size={32}
            noBg={false}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              cursor: 'pointer',
            }}
            color="var(--neutral-900)"
          >
            <Copy weight="bold" />
          </Icon>
          
          {/* Lock Button */}
          <Icon
            variant="circle"
            size={32}
            noBg={false}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              cursor: 'pointer',
            }}
            color="var(--neutral-900)"
          >
            <LockOpen weight="bold" />
          </Icon>
        </div>
      </div>
    </div>
  );
}

GeneratedPostCard.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default GeneratedPostCard;
