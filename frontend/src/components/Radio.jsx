import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';
import '../styles/Radio.css';

const Radio = ({ testid = "radio", label, checked, onChange, name, value, icon }) => {
  const handleKeyDown = (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      onChange(value);
    }
  };
  
  return (
    <label 
      data-testid={testid}
      className="radio-container" 
      onClick={() => onChange(value)}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="radio"
      aria-checked={checked}
    >
      <div
        className={`radio-outer-circle ${checked ? 'checked' : 'unchecked'}`}
      >
        {checked && <div className="radio-inner-dot" />}
      </div>
      {icon && <div className="radio-icon">{icon}</div>}
      <Text variant="body2">{label}</Text>
    </label>
  );
};

Radio.propTypes = {
  testid: PropTypes.string,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

export default Radio; 