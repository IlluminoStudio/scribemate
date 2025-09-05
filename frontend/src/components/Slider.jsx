import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Text from './Text';

/**
 * Slider component for selecting values within a range
 * Displays min, max, and current values with proper styling
 */
const Slider = ({ 
  testid = "slider",
  min = 0,
  max = 1000,
  unit = "words",
  value,
  onChange,
  className = '',
  ...props 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const [internalValue, setInternalValue] = useState(value || min);

  // Use internal value if no external value is provided
  const currentValue = value !== undefined ? value : internalValue;

  // Calculate percentage position (0-100)
  const percentage = ((currentValue - min) / (max - min)) * 100;

  // Calculate the actual value based on percentage (rounded to nearest 10% increment)
  const getValueFromPercentage = useCallback((percent) => {
    const range = max - min;
    const step = range * 0.1; // 10% of the range
    const rawValue = min + (percent / 100) * range;
    
    // Special handling for min and max values to ensure they're always selectable
    if (percent <= 5) return min; // First 5% always selects min
    if (percent >= 95) return max; // Last 5% always selects max
    
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  }, [min, max]);

  // Handle mouse down on slider track
  const handleMouseDown = useCallback((e) => {
    if (!sliderRef.current) return;
    
    setIsDragging(true);
    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = (clickX / rect.width) * 100;
    const newValue = getValueFromPercentage(percent);
    
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  }, [getValueFromPercentage, onChange]);

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (mouseX / rect.width) * 100));
    const newValue = getValueFromPercentage(percent);
    
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  }, [isDragging, getValueFromPercentage, onChange]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add event listeners for mouse move and up
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    const range = max - min;
    const step = range * 0.1; // 10% of the range
    let newValue = currentValue;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        newValue = Math.max(min, currentValue - step);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        newValue = Math.min(max, currentValue + step);
        break;
      case 'Home':
        e.preventDefault();
        newValue = min;
        break;
      case 'End':
        e.preventDefault();
        newValue = max;
        break;
      default:
        return;
    }

    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  }, [currentValue, min, max, onChange]);

  return (
    <div 
      data-testid={testid}
      className={className}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        ...props.style
      }}
      {...props}
    >
      {/* Slider Track Container */}
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        style={{
          position: 'relative',
          width: '100%',
          height: '8px',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        {/* Background Track */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '9999px',
            border: '0.5px solid var(--neutral-400)',
            background: 'var(--neutral-300)',
            position: 'relative'
          }}
        />
        
        {/* Filled Track */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${percentage}%`,
            borderRadius: '9999px',
            background: 'var(--primary-500)',
            transition: isDragging ? 'none' : 'width 0.2s ease'
          }}
        />
        
        {/* Thumb */}
        <div
          tabIndex={0}
          onKeyDown={handleKeyDown}
          style={{
            position: 'absolute',
            top: '50%',
            left: `${percentage}%`,
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'var(--primary-500)',
            border: '2px solid var(--neutral-0)',
            cursor: 'grab',
            outline: 'none',
            transition: isDragging ? 'none' : 'left 0.2s ease'
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsDragging(true);
          }}
        />
      </div>

      {/* Value Labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}
      >
        {/* Min Value */}
        <Text 
          variant="caption" 
          color="var(--neutral-600)"
        >
          {min} {unit}
        </Text>
        
        {/* Current Value */}
        <Text 
          variant="caption" 
          color="var(--primary-500)"
        >
          {Math.round(currentValue)} {unit}
        </Text>
        
        {/* Max Value */}
        <Text 
          variant="caption" 
          color="var(--neutral-600)"
        >
          {max} {unit}
        </Text>
      </div>
    </div>
  );
};

Slider.propTypes = {
  testid: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  unit: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Slider;
