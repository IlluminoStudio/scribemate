import React from 'react';
import MessageBox from '../modules/MessageBox';
import GeneratedPostCard from '../modules/GeneratedPostCard';
import postImage from '../assets/post-img2.jpg';

function SandboxPage() {
  const [acknowledged, setAcknowledged] = React.useState(false);

  const postText = `🎹 Spring is the perfect time to prepare for recitals! Here are my top 3 tips to help your child shine on stage:

1. Practice performing - not just playing. Have mini-concerts at home!

2. Focus on expression, not just notes. Music tells a story.

3. Stay calm and breathe. Nerves are normal, even for pros!

What questions do you have about recital prep? Drop them in the comments and I'll be happy to share tips, stories, and encouragement. Let's make this recital season your child's most confident and joyful yet!`;

  return (
    <div className="main-page-container">

      {/* Generated Post Card */}
      <GeneratedPostCard
        text={postText}
        image={postImage}
        style={{ marginBottom: '32px' }}
      />

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