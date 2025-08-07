import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';
import '../styles/Checkbox.css';
import { CheckSquare, Square } from 'phosphor-react';

const Checkbox = ({ testid = "checkbox", label, checked, onChange }) => {
  const handleClick = () => {
    if (onChange) {
      onChange(!checked);
    }
  };

  // Use color variables from the design system
  const checkedColor = 'var(--primary-500)';
  const uncheckedColor = 'var(--neutral-400)';

  return (
    <div data-testid={testid} className="checkbox-container" onClick={handleClick} role="checkbox" aria-checked={checked} tabIndex="0">
      {checked ? (
        <CheckSquare
          size={20}
          weight="fill"
          color={checkedColor}
          aria-hidden="checked"
        />
      ) : (
        <Square
          size={20}
          weight="regular"
          color={uncheckedColor}
          aria-hidden="unchecked"
        />
      )}
      <Text variant="body2" className="checkbox-label">
        {label}
      </Text>
    </div>
  );
};

Checkbox.propTypes = {
  testid: PropTypes.string,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox; 