import React, { useState } from 'react';
import ClockStatus from '../modules/ClockStatus';
import ClockButton from '../modules/ClockButton';
import MessageBox from '../modules/MessageBox';
import Text from '../components/Text';
import Chip from '../components/Chip';
import Icon from '../components/Icon';
import { UserCircle, Phone, Envelope} from 'phosphor-react';
import { useMessages } from '../hooks/useMyMessage';
import { useMyClock } from '../hooks/useMyClock';
import { useMyCareEvent } from '../hooks/useMyCareEvent';
import '../styles/index.css';

function CarerHomePage() {
  const { messages, loading: messagesLoading, error: messagesError, acknowledgeMessage } = useMessages();
  const { clockData, loading: clockLoading, error: clockError, refetch: refetchClock } = useMyClock();
  const { createCareEvent } = useMyCareEvent();
  const [clockButtonLoading, setClockButtonLoading] = useState(false);
  
  const handleClockAction = async () => {
    setClockButtonLoading(true);
    try {
      const eventType = clockData?.isClockIn ? 'clock_out' : 'clock_in';
      const notes = clockData?.isClockIn ? 'Ending shift' : 'Starting shift';
      
      await createCareEvent(eventType, notes);
      
      // Refresh clock status after successful API call
      await refetchClock();
    } catch (err) {
      console.error('Failed to perform clock action:', err);
      // Refresh clock status even on error to ensure UI is in sync
      await refetchClock();
    } finally {
      setClockButtonLoading(false);
    }
  };

  const handleAcknowledgeMessage = async (messageId) => {
    try {
      await acknowledgeMessage(messageId);
      // The hook will automatically refresh the messages after successful acknowledgment
    } catch (err) {
      console.error('Failed to acknowledge message:', err);
      // You could add a toast notification here if needed
    }
  };

  const newMessagesCount = messages.filter(msg => msg.variant === 'new').length;

  return (
    <div className="main-page-container">
      {/* Clock Status */}
      {clockLoading ? (
        <div className="card">
          <Text variant="body2" style={{ textAlign: 'center', padding: '20px' }}>
            Loading clock status...
          </Text>
        </div>
      ) : clockError ? (
        <div className="card">
          <Text variant="body2" style={{ textAlign: 'center', padding: '20px', color: 'var(--error-500)' }}>
            Error loading clock status: {clockError}
          </Text>
        </div>
      ) : clockData ? (
        <>
          <ClockStatus
            isClockIn={clockData.isClockIn}
            startTime={clockData.startTime}
            date={clockData.date}
            duration={clockData.duration}
          />

          {/* Clock Button */}
          <ClockButton
            state={clockData.isClockIn ? "clockOut" : "clockIn"}
            onClick={handleClockAction}
            disabled={clockButtonLoading}
          />
        </>
      ) : (
        <div className="card">
          <Text variant="body2" style={{ textAlign: 'center', padding: '20px', color: 'var(--neutral-600)' }}>
            No clock data available
          </Text>
        </div>
      )}

      {/* Messages */}
      <div className="card">
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'space-between'}}>
          <Text variant="h5" className="card-title-text">Your Messages</Text>
          {newMessagesCount > 0 && (
            <Chip label={`${newMessagesCount} New`} variant="secondary" size="sm" />
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12}}>
          {messagesLoading ? (
            <Text variant="body2" style={{ textAlign: 'center', padding: '20px' }}>
              Loading messages...
            </Text>
          ) : messagesError ? (
            <Text variant="body2" style={{ textAlign: 'center', padding: '20px', color: 'var(--error-500)' }}>
              Error loading messages: {messagesError}
            </Text>
          ) : messages.length === 0 ? (
            <Text variant="body2" style={{ textAlign: 'center', padding: '20px', color: 'var(--neutral-600)' }}>
              No messages yet
            </Text>
          ) : (
            messages.map((msg) => (
              <MessageBox
                key={msg.id}
                variant={msg.variant}
                heading={msg.heading}
                description={msg.description}
                time={msg.time}
                onAcknowledge={msg.onAcknowledge ? () => handleAcknowledgeMessage(msg.id) : undefined}
              />
            ))
          )}
        </div>
      </div>

      {/* Need Help? */}
      <div className="card">
          <Text variant="h5" className="card-title-text">
              Need Help?
          </Text>

      {/* Name*/}
          <div style={{ backgroundColor: 'var(--neutral-50)', padding: 8, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <Icon variant="circle" size={48} noBg={false}>
                  <UserCircle color="var(--primary-700)" size={16} />
              </Icon>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Text variant="body2" style={{ color: 'var(--neutral-900)', fontWeight: 600 }}>
                      Don Smith
                  </Text>
                  <Text variant="muted1" style={{ color: 'var(--neutral-700)'}}>
                      Family Member
                  </Text>
                  <Text variant="muted1" style={{ color: 'var(--neutral-600)' }}>
                      Available 24/7 for emergencies
                  </Text>
              </div>
          </div>

      {/* Phone*/}
          <div style={{ backgroundColor: 'var(--primary-100)', padding: 12, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <Icon variant="circle" size={40} noBg={false}>
                  <Phone color="var(--primary-700)" size={12} />
              </Icon>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Text variant="body2" style={{ color: 'var(--neutral-800)', fontWeight: 600 }}>
                      0421 456 789
                  </Text>
                  <Text variant="muted1" style={{ color: 'var(--neutral-600)' }}>
                      Emergency contact
                  </Text>
              </div>
          </div>

      {/* Email*/}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <Icon variant="circle" size={48} color="var(--neutral-600)">
                  <Envelope />
              </Icon>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4}}>
                  <Text variant="muted1" style={{ color: 'var(--neutral-800)'}}>
                      don.smith@chonland.com
                  </Text>
                  <Text variant="muted1" style={{ color: 'var(--neutral-600)' }}>
                      Non-urgent matters
                  </Text>
              </div>
          </div>

      </div>
    </div>
  );
}

export default CarerHomePage; 