import React from 'react';
import '../styles/Toggle.css';
import PropTypes from 'prop-types';

const Toggle = ({ testid = "toggle", isOn, onChange }) => {
  return (
    <button
      data-testid={testid}
      type="button"
      className={`toggle-switch ${isOn ? 'on' : 'off'}`}
      onClick={() => onChange(!isOn)}
      aria-pressed={isOn}
      role="switch"
    >
      <span className="toggle-knob" />
    </button>
  );
};

Toggle.propTypes = {
  testid: PropTypes.string,
  isOn: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Toggle; 