import React from 'react';
import MessageBox from '../modules/MessageBox';
import UnreadMessage from '../modules/UnreadMessage';
import ClockStatus from '../modules/ClockStatus';
import ClockButton from '../modules/ClockButton';
import MessagePreview from '../modules/MessagePreview';
import ClockDot from '../modules/ClockDot';
import Text from '../components/Text';
import HourlySlice from '../modules/HourlySlice';

function SandboxPage() {
  const [acknowledged, setAcknowledged] = React.useState(false);
  const [unreadAcknowledged, setUnreadAcknowledged] = React.useState(false);

  return (
    <div className="main-page-container">
      {/* Clock Status Examples */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <ClockStatus
          isClockIn={true}
          startTime="9:02 AM"
          date="January 15, 2024"
          duration="4h 27m"
        />
        <ClockStatus
          isClockIn={false}
          lastClockOut="Yesterday at 8:30 PM"
        />
      </div>

      {/* Clock Button Examples */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <ClockButton
          state="clockIn"
          onClick={() => alert('Clock In')}
        />
        <ClockButton
          state="clockOut"
          onClick={() => alert('Clock Out')}
        />
      </div>

      {/* Message Box Examples */}
      {!acknowledged && (
        <MessageBox
          variant="new"
          heading="Schedule Change Notice"
          description="Tomorrow's shift starts 30 minutes earlier at 8:30 AM due to doctor's appointment. Tomorrow's shift starts 30 minutes earlier at 8:30 AM due to doctor's appointment."
          time="4 hours ago"
          onAcknowledge={() => setAcknowledged(true)}
        />
      )}
      {/* Old variant */}
      <MessageBox
        variant="old"
        heading="Weekly Team Update"
        description="Great work everyone! Mrs. Johnson's family expressed their appreciation for the excellent care."
        time="Yesterday"
      />

      {/* UnreadMessage Examples */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {!unreadAcknowledged && (
          <UnreadMessage
            name="Mike Chen"
            message="Weekly Team Update"
            time="2 hours ago"
            initials="MC"
          />
        )}
        
        <UnreadMessage
          name="David Wilson"
          message="Schedule Change Notice"
          time="yesterday"
          initials="DW"
        />
      </div>

      {/* MessagePreview Examples */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <MessagePreview
          messageHeading="Medication Reminder"
          messageBody="Mrs. Johnson's evening medication dosage has been adjusted. Please give 1 tablet instead of 2 with dinner."
          type="private"
          carers={['JD', 'SM']}
        />
        <MessagePreview
          messageHeading="Family Visit Tomorrow"
          // messageBody="Mrs. Johnson's daughter will visit at 2 PM tomorrow. Please ensure the living room is tidy and tea is prepared."
          type="broadcast"
        />
      </div>

      {/* ClockDot Examples */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Text variant="h4">Clock Dot Examples</Text>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <ClockDot type="clockIn" time="9:02 AM" />
          <ClockDot type="clockOut" time="5:30 PM" />
          <ClockDot type="clockIn" time="8:45 AM" color="var(--primary-500)" />
          <ClockDot type="clockOut" time="6:15 PM" color="#ff6b6b" />
          <ClockDot type="clockIn" time="7:30 AM" color="#4ecdc4" />
        </div>
      </div>

      {/* HourlySlice Examples */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Text variant="h4">Hourly Slice Examples</Text>
        <HourlySlice
          startTime={700}
          duration={60}
          activity={[
            { initial: 'AB', event: 'clockIn', time: 705, color: 'var(--primary-500)' },
            { initial: 'DE', event: 'clockOut', time: 759, color: '#FBBF24' },
          ]}
        />
        <HourlySlice
          startTime={1200}
          duration={120}
          activity={[
            { initial: 'XY', event: 'clockIn', time: 1215, color: '#4F46E5' },
            { initial: 'XY', event: 'clockOut', time: 1359, color: '#4F46E5' },
            { initial: 'LM', event: 'clockIn', time: 1300, color: '#10B981' },
          ]}
        />
      </div>
    </div>
  );
}

export default SandboxPage; 