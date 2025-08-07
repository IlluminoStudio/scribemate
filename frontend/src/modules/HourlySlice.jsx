import React from 'react';
import ClockDot from './ClockDot';
import Text from '../components/Text';
import { formatTime, addMinutes } from '../utils/common';

const HourlySlice = ({
  startTime,
  duration = 30,
  activity = [],
  customStartLabel,
  customEndLabel,
  tall = false,
  currentTime
}) => {
  const endTime = addMinutes(startTime, duration - 1);
  const startLabel = customStartLabel || formatTime(startTime);
  const endLabel = customEndLabel || formatTime(endTime);

  // Only include activities within the slice range (inclusive)
  const filtered = activity.filter(
    act => act.time >= startTime && act.time <= endTime
  );
  // Always render the slice, even if filtered is empty
  const sorted = [...filtered].sort((a, b) => a.time - b.time);

  // Calculate bar position if currentTime is within this slice
  let showBar = false;
  let barLeft = 0;
  if (
    typeof currentTime === 'number' &&
    currentTime >= startTime &&
    currentTime <= endTime
  ) {
    showBar = true;
    // Calculate minutes since start of slice
    const startHour = Math.floor(startTime / 100);
    const startMin = startTime % 100;
    const curHour = Math.floor(currentTime / 100);
    const curMin = currentTime % 100;
    const minsSinceStart = (curHour - startHour) * 60 + (curMin - startMin);
    const percent = Math.max(0, Math.min(1, minsSinceStart / duration));
    barLeft = percent * 100;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Text
        variant="body2"
        style={{ fontWeight: 500, color: 'var(--neutral-800)', minWidth: 60, textAlign: 'right' }}
      >
        {startLabel}
      </Text>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--neutral-100)',
          borderRadius: 8,
          padding: tall ? '40px 20px' : '12px 20px',
          gap: 16,
          flex: 1,
          minWidth: 0,
          border: '1px solid var(--neutral-200)'
        }}
      >
        {/* Vertical bar for current time */}
        {showBar && (
          <div
            style={{
              position: 'absolute',
              top: 8,
              bottom: 8,
              left: `calc(${barLeft}% - 1px)`,
              width: 2,
              background: 'var(--primary-400)',
              borderRadius: 1,
              zIndex: 2
            }}
          />
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, flexWrap: 'wrap' }}>
          {sorted.map((act, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <ClockDot
                name={act.initial}
                type={act.event === 'clockIn' ? 'clockIn' : 'clockOut'}
                time={formatTime(act.time)}
                color={act.color}
              />
              <Text variant="caption" style={{ color: 'var(--neutral-700)' }}>
                {act.initial}, {formatTime(act.time)}
              </Text>
            </div>
          ))}
        </div>
        <Text variant="caption" style={{ color: 'var(--neutral-500)', minWidth: 48, textAlign: 'right' }}>
          {endLabel}
        </Text>
      </div>
    </div>
  );
};

export default HourlySlice; 
