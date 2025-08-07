import React from "react";
import PropTypes from "prop-types";
import Text from "./Text";
import { hexToRgba } from "../utils/common";
import "../styles/index.css";

// SegmentedControl: a simple selector for toggling between options (e.g., Solo/Group)
// - options: array of { label, value }
// - value: currently selected value
// - onChange: callback when selection changes
// - selectedColor: color for the selected segment (defaults to primary-500)
function SegmentedControl({ testid = "segmentedcontrol", options, value, onChange, selectedColor = "var(--primary-500)", style = {}, ...props }) {
  // Use the known primary-500 color value directly for reliability
  const primaryColorHex = "#55EDF5"; 
  const transparentPrimaryColor = hexToRgba(primaryColorHex, 0.3); // More transparent background for selected tab
  
  return (
    <div
      data-testid={testid}
      style={{
        display: "flex",
        background: "rgba(77, 77, 77, 0.2)", // neutral-200 with 0.2 transparency
        borderRadius: 6,
        gap: 0,
        padding: 4,
        ...style,
      }}
      {...props}
    >
      {options.map((option, idx) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            style={{
              flex: 1,
              background: isActive ? transparentPrimaryColor : "transparent",
              color: isActive ? "var(--primary-500)" : "var(--neutral-500)",
              border: "none",
              borderRadius: 4,
              margin: 0,
              padding: "8px 24px",
              cursor: "pointer",
              transition: "background 0.15s, color 0.15s",
              boxShadow: "none",
            }}
            onMouseEnter={e => {
              if (!isActive) e.currentTarget.style.background = "transparent";
            }}
            onMouseLeave={e => {
              if (!isActive) e.currentTarget.style.background = "transparent";
            }}
            aria-pressed={isActive}
          >
            <Text variant="h6" style={{
              color: isActive ? "var(--primary-500)" : "var(--neutral-400)",
              fontSize: "14px",
              fontWeight: 400
            }}>{option.label}</Text>
          </button>
        );
      })}
    </div>
  );
}

SegmentedControl.propTypes = {
  testid: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ).isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedColor: PropTypes.string,
  style: PropTypes.object,
};

export default SegmentedControl; 