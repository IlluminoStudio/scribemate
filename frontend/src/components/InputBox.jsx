import React, { useState } from "react";
import PropTypes from "prop-types";
import Text from "./Text";
import "../styles/InputBox.css";

const InputBox = ({ testid = "inputbox", title, placeholder, maxLength, value, onChange }) => {
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState("");
  
  // Determine if component is controlled or uncontrolled
  const isControlled = typeof value !== "undefined" && typeof onChange === "function";
  const currentValue = isControlled ? (value || "") : internalValue;

  const charCountText = () => {
    if (maxLength != null) {
      return `${currentValue.length}/${maxLength} characters`;
    }
    return `${currentValue.length} characters`;
  }

  const handleChange = (e) => {
    const newValue = e.target.value;
    
    if (isControlled) {
      // Controlled mode: call parent's onChange
      onChange(newValue);
    } else {
      // Uncontrolled mode: update internal state
      setInternalValue(newValue);
    }
  };

  return (
    <div data-testid={testid} style={{ width: "100%" }}>
      {title && (
        <Text variant="label" style={{ marginBottom: "6px" }}>
          {title}
        </Text>
      )}
      <div className="input-box-container">
        <textarea 
          className="input-box-textarea"
          placeholder={placeholder}
          maxLength={maxLength}
          value={currentValue}
          onChange={handleChange}
        />
        <div className="input-box-footer">
          {maxLength != null && (
            <div className="input-box-char-count">
              <Text variant="body2">{charCountText()}</Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

InputBox.propTypes = {
  testid: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputBox; 