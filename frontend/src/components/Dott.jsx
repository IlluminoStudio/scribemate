import React from "react";
import PropTypes from "prop-types";

const Dott = ({ 
  testid = "dott",
  color = "var(--neutral-600)", 
  variant = "solid",
  size = 10 
}) => {
  const borderWidth = 2;
  const dotStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    backgroundColor: variant === "solid" ? color : "transparent",
    border: `${borderWidth}px solid ${color}`,
    boxSizing: "border-box",
  };

  return <div data-testid={testid} style={dotStyle} />;
};

Dott.propTypes = {
  testid: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.number,
};

export default Dott; 