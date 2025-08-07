import React from 'react';
import PropTypes from 'prop-types';
import Text from '../components/Text';
import Avatar from '../components/Avatar';
import Chip from '../components/Chip';

function UnreadMessage({
  name,
  message,
  time,
  initials,
  style = {},
  ...props
}) {
  // Always use the same styling
  const bg = 'var(--secondary-50)';
  const border = '1px solid var(--secondary-200)';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        background: bg,
        border,
        borderRadius: 8,
        padding: 16,
        gap: 12,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        ...style,
      }}
      {...props}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
          <Avatar initials={initials} variant="sm" color="secondary"/>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text variant="h6" style={{ color: 'var(--neutral-900)' }}>{name}</Text>
            <Text variant="body2" style={{ color: 'var(--neutral-700)' }}>{message}</Text>
          </div>
        </div>
        <Text variant="caption" style={{ color: 'var(--neutral-600)' }}>Sent {time}</Text>
      </div>
      <Chip label="Unread" variant="secondary" size="xs" />
    </div>
  );
}

UnreadMessage.propTypes = {
  name: PropTypes.string,
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  initials: PropTypes.string,
  style: PropTypes.object,
};

export default UnreadMessage; 