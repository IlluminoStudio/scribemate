import React from 'react';
import PropTypes from 'prop-types';

/**
 * Text component that handles all text variants in the application
 * Supports h1-h6, body1, body2, and muted text variants
 */
const Text = ({ 
  testid = "text",
  variant = 'body1',
  children,
  className = '',
  color,
  ...props 
}) => {
  // Base styles that apply to all variants
  const baseStyles = {
    fontFamily: 'inherit',
    margin: 0,
  };

  // Variant-specific styles
  const variantStyles = {
    h1: {
      fontWeight: 700,
      fontSize: '36px',
      lineHeight: '44px',
      letterSpacing: '0%',
      color: 'var(--color-text-primary)',
    },
    h2: {
      fontWeight: 600,
      fontSize: '30px',
      lineHeight: '38px',
      letterSpacing: '0%',
      color: 'var(--color-text-primary)',
    },
    h3: {
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '0%',
      color: 'var(--color-text-primary)',
    },
    h4: {
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '0%',
      color: 'var(--color-text-primary)',
    },
    h5: {
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '0%',
      color: 'var(--color-text-primary)',
    },
    h6: {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0%',
      color: 'var(--color-text-primary)',
    },
    body1: {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '28px',
      letterSpacing: '0%',
      color: 'var(--color-text-primary)',
    },
    body2: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '24px',
      letterSpacing: '0%',
      color: 'var(--color-text-secondary)',
    },
    muted1: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: 'normal',
      letterSpacing: '0%',
      color: 'var(--color-text-tertiary)',
    },
    muted2: {
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: 'normal',
      letterSpacing: '0%',
      color: 'var(--color-text-quaternary)',
    },
    caption: {
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: 'normal',
      letterSpacing: '0%',
      color: 'var(--color-text-quaternary)',
    },
  };

  // Determine which HTML element to use based on variant
  const getElement = () => {
    if (variant.startsWith('h')) return variant;
    return 'p';
  };

  const Element = getElement();

  // Merge base, variant, and custom styles (custom style last, so it only overrides what is set)
  const { style: customStyle = {}, ...restProps } = props;

  // Create a style object that can be overridden by CSS classes
  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...(color && { color }),
    ...customStyle,
  };

  // If a className is provided, don't apply color and font-weight from variant styles
  // This allows CSS classes to control these properties
  if (className) {
    const { color: variantColor, fontWeight, ...variantStylesWithoutColor } = variantStyles[variant];
    const finalStyles = {
      ...baseStyles,
      ...variantStylesWithoutColor,
      ...(color && { color }),
      ...customStyle,
    };
    
    return (
      <Element
        data-testid={testid}
        style={finalStyles}
        className={className}
        {...restProps}
      >
        {children}
      </Element>
    );
  }

  return (
    <Element
      data-testid={testid}
      style={combinedStyles}
      className={className}
      {...restProps}
    >
      {children}
    </Element>
  );
};

Text.propTypes = {
  testid: PropTypes.string,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'muted1', 'muted2', 'caption']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
};

export default Text; 