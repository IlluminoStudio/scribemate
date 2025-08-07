import React from 'react';
import HourlySlice from './HourlySlice';
import '../styles/DailyView.css';
import { getCurrentTimeInt, getDayBlocks, getInitials } from '../utils/common';
import Avatar from '../components/Avatar';
import Text from '../components/Text';
import harmoniousColors from '../color';

const DailyView = ({ activity = [], carers = [] }) => {
  const dayBlocks = getDayBlocks();
  const currentTime = getCurrentTimeInt();

  // Determine which carers are currently onsite
  const currentlyOnsite = new Set();
  const carerLastEvent = {};
  
  // Find the last event for each carer
  activity.forEach(event => {
    if (!carerLastEvent[event.name] || event.time > carerLastEvent[event.name].time) {
      carerLastEvent[event.name] = event;
    }
  });
  
  // Check if their last event was a clock-in (meaning they're still onsite)
  Object.values(carerLastEvent).forEach(event => {
    if (event.event === 'clockIn') {
      currentlyOnsite.add(event.name);
    }
  });

  // Show message when there are no carer events
  if (activity.length === 0) {
    return (
      <div className="dailyview-card">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: '40px 20px',
          textAlign: 'center'
        }}>
          <Text variant="h6" style={{ color: 'var(--neutral-700)', marginBottom: '8px' }}>
            No carer events today
          </Text>
          <Text variant="body2" style={{ color: 'var(--neutral-600)' }}>
            Daily view will show as soon as carers clock in
          </Text>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Legend Section */}
      <div className="dailyview-card">
        <div className="legend-row legend-row-top">
          <Text variant="body2" className="legend-title">Carers Today</Text>
          <div className="legend-clock">
            <div className="legend-clock-item">
              <Text variant="body2" className="legend-clock-label">* Currently onsite</Text>
            </div>
            <div className="legend-clock-item">
              <span className="legend-dot legend-dot-solid" />
              <Text variant="body2" className="legend-clock-label">Clock-in</Text>
            </div>
            <div className="legend-clock-item">
              <span className="legend-dot legend-dot-hollow" />
              <Text variant="body2" className="legend-clock-label">Clock-out</Text>
            </div>
          </div>
        </div>
        <div className="legend-row legend-row-bottom">
          {carers.map((c, i) => (
            <div key={c.name} className="legend-carer">
              <Avatar
                initials={c.initial}
                color={undefined}
                variant={currentlyOnsite.has(c.name) ? "sm" : "outlined"}
                colorName={c.colorName}
              />
              <Text variant="body1" className="legend-carer-name">
                {c.name}{currentlyOnsite.has(c.name) ? '*' : ''}
              </Text>
            </div>
          ))}
        </div>
      </div>
      {/* Timeline blocks */}
      <div className="dailyview-card" style={{ marginTop: 0 }}>
        {/* 12AM-6AM block */}
        <div style={{ marginTop: 8, marginBottom: 4 }}>
          <HourlySlice
            startTime={0}
            duration={360} // 6 hours * 60 min
            activity={activity}
            customStartLabel="12:00AM"
            customEndLabel="5:59AM"
            tall={true}
            currentTime={currentTime}
          />
        </div>
        {/* 6AM-9PM half-hour blocks */}
        {dayBlocks.map((start) => (
          <div key={start} style={{ marginTop: 8, marginBottom: 4 }}>
            <HourlySlice
              startTime={start}
              duration={30}
              activity={activity}
              currentTime={currentTime}
            />
          </div>
        ))}
        {/* 9PM-12AM block */}
        <div style={{ marginTop: 8, marginBottom: 4 }}>
          <HourlySlice
            startTime={2100}
            duration={180} // 3 hours * 60 min
            activity={activity}
            customStartLabel="9:00PM"
            customEndLabel="11:59PM"
            tall={true}
            currentTime={currentTime}
          />
        </div>
      </div>
    </>
  );
};

export default DailyView; 