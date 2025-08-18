import React from 'react';
import MessageBox from '../modules/MessageBox';

function SandboxPage() {
  const [acknowledged, setAcknowledged] = React.useState(false);

  return (
    <div className="main-page-container">

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

    </div>
  );
}

export default SandboxPage; 