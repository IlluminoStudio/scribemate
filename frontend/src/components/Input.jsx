import React from "react";
import PropTypes from "prop-types";
import Text from "./Text";
import "../styles/Input.css";

const Input = ({ testid = "input", label, placeholder, leftIcon, rightIcon, ...props }) => {
  return (
    <div data-testid={testid} className="ff-input-group">
      {label && (
        <Text variant="body2" className="ff-input-label">{label}</Text>
      )}
      <div className="ff-input-wrapper">
        {leftIcon && <span className="ff-input-icon ff-input-icon-left">{leftIcon}</span>}
        <input
          className="ff-input"
          placeholder={placeholder}
          style={{
            paddingLeft: leftIcon ? 42 : undefined,
          }}
          {...props}
        />
        {rightIcon && <span className="ff-input-icon ff-input-icon-right">{rightIcon}</span>}
      </div>
    </div>
  );
};

Input.propTypes = {
  testid: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
};

export default Input; 