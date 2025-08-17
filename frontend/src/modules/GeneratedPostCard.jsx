import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Text from '../components/Text';
import Icon from '../components/Icon';
import { ArrowClockwise, Download, Copy, CaretDown, CaretUp, LockOpen, Folder, Trash } from 'phosphor-react';
import './GeneratedPostCard.css';

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
    <div className="generated-post-card" style={style} {...props}>
      {/* Main Content Card */}
      <div className="generated-post-card__main">
        {/* Text Content Section */}
        <div className="generated-post-card__text-section">
          <Text 
            variant="body1" 
            color="var(--neutral-900)"
            className="generated-post-card__text-content"
          >
            {displayText}
          </Text>
          
          {/* Action Buttons Row */}
          <div className="generated-post-card__actions-row">
            {/* Toggle Text Button */}
            {shouldShowSeeMore && (
              <Button
                variant="text"
                color="primary"
                size="sm"
                onClick={handleToggleText}
                className="generated-post-card__toggle-button"
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
              className="generated-post-card__regenerate-button"
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
          className="generated-post-card__image-section"
          style={{ backgroundImage: `url(${image})` }}
        >
          {/* Icon Buttons Overlay */}
          <div className="generated-post-card__icon-overlay">
            {/* Refresh Button */}
            <Icon
              variant="circle"
              size={32}
              noBg={false}
              className="generated-post-card__icon-button"
              color="var(--neutral-900)"
            >
              <ArrowClockwise weight="bold" />
            </Icon>
            
            {/* Download Button */}
            <Icon
              variant="circle"
              size={32}
              noBg={false}
              className="generated-post-card__icon-button"
              color="var(--neutral-900)"
            >
              <Download weight="bold" />
            </Icon>
            
            {/* Copy Button */}
            <Icon
              variant="circle"
              size={32}
              noBg={false}
              className="generated-post-card__icon-button"
              color="var(--neutral-900)"
            >
              <Copy weight="bold" />
            </Icon>
            
            {/* Lock Button */}
            <Icon
              variant="circle"
              size={32}
              noBg={false}
              className="generated-post-card__icon-button"
              color="var(--neutral-900)"
            >
              <LockOpen weight="bold" />
            </Icon>
          </div>
        </div>
      </div>

      {/* Action Buttons Row - Outside the main card */}
      <div className="generated-post-card__bottom-actions">
        {/* Save to Drafts Button */}
        <Button
          variant="default"
          color="primary"
          size="md"
          leftIcon={<Folder weight="bold" size={20} />}
        >
          <Text variant="body2" color="var(--neutral-0)">
            Save to Drafts
          </Text>
        </Button>

        {/* Copy Text Button */}
        <Button
          variant="default"
          color="neutral"
          size="md"
          leftIcon={<Copy weight="bold" size={20} />}
        >
          <Text variant="body2" color="var(--neutral-800)">
            Copy Text
          </Text>
        </Button>

        {/* Download Image Button */}
        <Button
          variant="default"
          color="neutral"
          size="md"
          leftIcon={<Download weight="bold" size={20} />}
        >
          <Text variant="body2" color="var(--neutral-800)">
            Download Image
          </Text>
        </Button>

        {/* Discard Post Button */}
        <Button
          variant="text"
          color="error"
          size="md"
          leftIcon={<Trash weight="bold" size={20} />}
        >
          <Text variant="body2" color="var(--error-500)">
            Discard Post
          </Text>
        </Button>
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
