import React from "react";
import PropTypes from "prop-types";
import Text from "./Text";
import "../styles/InputBox.css";

const InputBox = ({ testid = "inputbox", placeholder, maxLength, value, onChange }) => {
  const charCountText = () => {
    if (maxLength != null) {
      return `${value?.length || 0}/${maxLength} characters`;
    }
    return `${value?.length || 0} characters`;
  }

  // Only controlled if both value and onChange are provided
  const textareaProps = { 
    className: "input-box-textarea",
    placeholder,
    maxLength
  };
  if (typeof value !== "undefined" && typeof onChange === "function") {
    textareaProps.value = value;
    textareaProps.onChange = onChange;
  } else {
    textareaProps.defaultValue = value || "";
  }

  return (
    <div data-testid={testid} className="input-box-container">
      <textarea {...textareaProps} />
      <div className="input-box-footer">
        <div className="input-box-char-count">
          <Text variant="body2">{charCountText()}</Text>
        </div>
      </div>
    </div>
  );
};

InputBox.propTypes = {
  testid: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputBox; 