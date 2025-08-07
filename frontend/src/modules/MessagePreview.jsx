import React from 'react';
import PropTypes from 'prop-types';
import { ChatsCircle } from 'phosphor-react';

import Text from '../components/Text';
import Chip from '../components/Chip';
import Avatar from '../components/Avatar';
import Icon from '../components/Icon';

import '../styles/MessagePreview.css';

const MessagePreview = ({ messageHeading, type, messageBody, carers = []}) => {
  return (
    <div className="message-preview">
      <div className="message-preview-header">
        <Icon noBg={false} size={40}>
          <ChatsCircle color="var(--primary-500)" />
        </Icon>
        <Text variant="h6">{messageHeading}</Text>
        {type === 'private' && <Chip label="Private" variant="secondary" size="xs" />}
        {type === 'broadcast' && <Chip label="Broadcast" variant="primary" size="xs" />}
        {type === 'private' && carers.length > 0 && (
          <div className="carers">
            {carers.map((initials, index) => (
              <Avatar key={index} initials={initials} color="secondary" variant="sm" />
            ))}
          </div>
        )}
      </div>
      <div className="message-preview-body">
        <Text variant={messageBody ? "body2" : "muted1"}>{messageBody ? messageBody : 'Your message will appear here...'}</Text>
      </div>
    </div>
  );
};

MessagePreview.propTypes = {
  messageHeading: PropTypes.string.isRequired,
  messageBody: PropTypes.string,
  type: PropTypes.oneOf(['broadcast', 'private']).isRequired,
  carers: PropTypes.arrayOf(PropTypes.string),
};

export default MessagePreview; 