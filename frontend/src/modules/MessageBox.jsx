import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Chip from '../components/Chip';
import Button from '../components/Button';
import Text from '../components/Text';
import Icon from '../components/Icon';
import { CheckCircle } from 'phosphor-react';

function MessageBox({
  variant = 'new',
  heading,
  description,
  time,
  onAcknowledge,
  style = {},
  ...props
}) {
  const [acknowledgeLoading, setAcknowledgeLoading] = useState(false);
  
  // Color backgrounds
  const bg = variant === 'new' ? 'var(--secondary-50)' : 'var(--neutral-100)';
  const border = variant === 'new' ? '2px solid var(--secondary-200)' : '2px solid var(--neutral-200)';

  const handleAcknowledge = async () => {
    if (!onAcknowledge) return;
    
    setAcknowledgeLoading(true);
    try {
      await onAcknowledge();
    } catch (err) {
      console.error('Failed to acknowledge message:', err);
    } finally {
      setAcknowledgeLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: bg,
        border,
        borderRadius: 8,
        padding: 16,
        gap: 16,
        minHeight: 64,
        ...style,
      }}
      {...props}
    >
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div>{heading && (<Text variant="h6" style={{ marginBottom: 0, color: 'var(--neutral-900)' }}>{heading}</Text>)}</div>
        {variant === 'new' ? (
          <Chip label="New" variant="secondary" size="xs" />
        ) : (
          <Icon size={48}>
            <CheckCircle size={20} weight="fill" />
          </Icon>
        )}
      </div>
      {/* Middle row: description */}
      <Text variant="body2" style={{ marginBottom: 0 }}>{description}</Text>
      {/* Bottom row: time (left), action/status (right) */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Text variant="muted2" style={{ color: 'var(--neutral-600)' }}>{time}</Text>
        {variant === 'new' ? (
          <Button 
            color="secondary" 
            size="sm" 
            style={{ marginTop: 0, gap: '8px' }} 
            onClick={handleAcknowledge}
            disabled={acknowledgeLoading}
          >
            <CheckCircle size={20} weight="bold" />
            {acknowledgeLoading ? "Acknowledging..." : "Acknowledge"}
          </Button>
        ) : (
          <Text variant="caption" style={{ color: 'var(--primary-500)', fontWeight: 600 }}>Acknowledged</Text>
        )}
      </div>
    </div>
  );
}

MessageBox.propTypes = {
  variant: PropTypes.oneOf(['new', 'old']),
  heading: PropTypes.string,
  description: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onAcknowledge: PropTypes.func,
  style: PropTypes.object,
};

export default MessageBox; 