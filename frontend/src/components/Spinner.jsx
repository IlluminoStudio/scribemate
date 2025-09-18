import React from "react";
import "./Spinner.css";

/**
 * Spinner component - A simple loading indicator
 * Uses neutral-500 color and custom animation styling
 */
function Spinner({ testid, className = "", ...props }) {
  return (
    <span 
      className={`spinner-loader ${className}`}
      data-testid={testid}
      {...props}
    />
  );
}

export default Spinner;
