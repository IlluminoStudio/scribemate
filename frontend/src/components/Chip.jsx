import React from 'react';
import PropTypes from 'prop-types';

/**
 * Chip component with primary and secondary variants.
 * Supports an optional icon to the left of the label (gap=4px).
 * Also supports an optional icon to the right of the label.
 */
const VARIANT_STYLES = {
  primary: {
    backgroundColor: 'var(--primary-500)',
    color: 'var(--neutral-0)',
  },
  secondary: {
    backgroundColor: 'var(--secondary-500)',
    color: 'var(--neutral-0)',
  },
  light: {
    backgroundColor: 'var(--primary-100)',
    color: 'var(--primary-600)',
    cursor: 'pointer',
  },
};

const chipBaseStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '999px',
  fontFamily: 'inherit',
  fontWeight: 400,
  lineHeight: 'normal',
  border: 'none',
  outline: 'none',
  cursor: 'default',
  gap: '4px',
};

const CHIP_SIZES = {
  lg: {
    height: '48px',
    fontSize: '16px',
    padding: '0 20px 0 20px',
  },
  md: {
    height: '40px',
    fontSize: '14px',
    padding: '0 16px 0 16px',
  },
  sm: {
    height: '28px',
    fontSize: '12px',
    padding: '0 10px 0 10px',
  },
  xs: {
    height: '20px',
    fontSize: '10px',
    padding: '0 6px 0 6px',
  },
};

const Chip = ({ testid = "chip", label, variant = 'primary', icon, rightIcon, size = 'md' }) => (
  <span
    data-testid={testid}
    style={{
      ...chipBaseStyle,
      ...CHIP_SIZES[size],
      ...VARIANT_STYLES[variant],
    }}
  >
    {icon}
    {label}
    {rightIcon && (
      <span style={{ display: 'flex', alignItems: 'center', marginLeft: '4px' }}>
        {rightIcon}
      </span>
    )}
  </span>
);

Chip.propTypes = {
  testid: PropTypes.string,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'light']),
  icon: PropTypes.node,
  rightIcon: PropTypes.node,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
};

export default Chip; 