import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UnreadMessage from '../modules/UnreadMessage';
import Text from '../components/Text';
import { Plus, Clock, Download } from 'phosphor-react';
import Button from '../components/Button';
import harmoniousColors from '../color.js';
import DailyView from '../modules/DailyView';
import { getRelativeTimeText, getInitials } from '../utils/common.js';
import { useUserData } from '../hooks/useSession';
import { useMessage } from '../hooks/useMessage';
import { useCareEvent } from '../hooks/useCareEvent';
import '../styles/index.css';

function CoordinatorHomePage() {
  const [unreadMessages, setUnreadMessages] = useState([]);
  
  const { getUserId } = useUserData();
  const { fetchMessages } = useMessage();
  const { careEvents, loading, error } = useCareEvent();

  // Fetch unread messages on component mount
  useEffect(() => {
    const fetchMessagesData = async () => {
      try {
        // Fetch unread messages
        const messages = await fetchMessages('unread');
        
        // Transform API response to match UnreadMessage component props
        const transformedMessages = messages.map((msg, index) => ({
          id: msg.id,
          name: msg.carer_name || 'Unknown',
          message: msg.title,
          time: getRelativeTimeText(msg.created_at),
          initials: getInitials(msg.carer_name || 'Unknown'),
          // Add index as fallback for duplicate IDs
          uniqueKey: `${msg.id}-${index}`
        }));
        
        setUnreadMessages(transformedMessages);
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };

    fetchMessagesData();
  }, [fetchMessages]);

  const handleClockAction = () => {
    // This will be implemented later with actual clock in/out logic
    alert('Clock action triggered');
  };



  // Assign a unique color per carer (by full name)
  const carerColorMap = {};
  let colorIndex = 0;
  careEvents.forEach(item => {
    if (!carerColorMap[item.name]) {
      carerColorMap[item.name] = harmoniousColors[colorIndex % harmoniousColors.length].name;
      colorIndex++;
    }
  });
  const activityWithColors = careEvents.map(item => ({
    ...item,
    color: item.color || harmoniousColors.find(c => c.name === carerColorMap[item.name]).hex,
    colorName: item.colorName || carerColorMap[item.name]
  }));

  // Debug: print out all activityWithColors details
  console.debug('Activity Color Assignment:');
  activityWithColors.forEach(item => {
    console.debug(`Name: ${item.name}, Initial: ${item.initial}, Event: ${item.event}, Time: ${item.time}, Color: ${item.color}`);
  });

  // Build unique carers array for legend
  const carers = [];
  const seen = new Set();
  activityWithColors.forEach(item => {
    if (!seen.has(item.name)) {
      carers.push({ name: item.name, initial: item.initial, colorName: item.colorName });
      seen.add(item.name);
    }
  });

  return (
    <div className="main-page-container">
      {/* Coordinator Dashboard */}
      <div className="card">
        <Text variant="h3" >Coordinator Dashboard</Text>
        <Text variant="body1" >Manage carers, shifts, and communications</Text>
      </div>

      {/* Daily View */}
      <div className="card">
        <Text variant="h5" className="card-title-text">Daily View</Text>
        <Text variant="body2" className="card-subtitle-text">Track carers check-ins and coverage gaps throughout the day</Text>
        {loading ? (
          <Text variant="body2" style={{ color: 'var(--neutral-600)' }}>Loading daily view...</Text>
        ) : error ? (
          <Text variant="body2" style={{ color: 'var(--error-600)' }}>Error: {error}</Text>
        ) : (
          <DailyView
            activity={activityWithColors}
            carers={carers}
          />
        )}
      </div>

      {/* Messages */}
      <div className="card">
          <Text variant="h5" className="card-title-text" style={{ display: 'block'}}>
              Unread Messages
          </Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12}}>
          {loading ? (
            <Text variant="body2" style={{ color: 'var(--neutral-600)' }}>Loading messages...</Text>
          ) : error ? (
            <Text variant="body2" style={{ color: 'var(--error-600)' }}>Error: {error}</Text>
          ) : unreadMessages.length === 0 ? (
            <Text variant="body2" style={{ color: 'var(--neutral-600)' }}>No unread messages</Text>
          ) : (
            unreadMessages.map((msg) => (
              <UnreadMessage
                key={msg.uniqueKey}
                name={msg.name}
                message={msg.message}
                time={msg.time}
                initials={msg.initials}
              />
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
          <Text variant="h5" className="card-title-text">
              Quick Actions
          </Text>
           
          <div style={{ display: 'flex', gap: 16 }}>
            <Link to="/new-message" style={{ flex: 1, textDecoration: 'none' }}>
              <Button color="primary" style={{ width: '100%'}}>
                  <Plus size={20} />
                  New Message
              </Button>
            </Link>
            <Button color="secondary" style={{ flex: 1}}>
                <Clock size={20} />
                <span>View All Shifts</span>
            </Button>
            <Button color="grey" style={{ flex: 1}}>
                <Download size={20} />
                <span>Export Logs</span>
            </Button>
          </div>
      </div>
    </div>
  );
}

export default CoordinatorHomePage; 