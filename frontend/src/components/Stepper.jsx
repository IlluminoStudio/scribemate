import React from "react";
import PropTypes from "prop-types";
import Text from "./Text";
import "../styles/App.css";

/**
 * Stepper component
 * Props:
 *   - currentStep: number (1-based)
 *   - totalSteps: number
 *   - className: optional string for custom styling
 */
function Stepper({ testid = "stepper", currentStep, totalSteps, className = "" }) {
  // Clamp currentStep between 1 and totalSteps
  const safeStep = Math.max(1, Math.min(currentStep, totalSteps));
  const percent = ((safeStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div data-testid={testid} className={className} style={{ width: "100%" }}>
      {/* Label */}
      <Text variant="muted1" style={{ marginBottom: 12, textAlign: "left", display: "block", width: "100%" }}>
        {`Step ${safeStep} of ${totalSteps}`}
      </Text>
      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          height: 4,
          background: "var(--neutral-300)",
          borderRadius: 999,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Completed section */}
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: "var(--primary-500)",
            borderRadius: 3,
            transition: "width 0.3s cubic-bezier(.4,0,.2,1)",
            position: "absolute",
            left: 0,
            top: 0,
          }}
        />
      </div>
    </div>
  );
}

Stepper.propTypes = {
  testid: PropTypes.string,
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default Stepper; 