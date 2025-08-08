import React from "react";
import PropTypes from "prop-types";
import "../styles/index.css";
import { hexToRgba } from "../utils/common";

// We use the --primary-dark variable for both icon and background (with opacity)
// This component renders a Lucide icon with a circular or rounded-square background
const Icon = ({
  testid = "icon",
  children, // The Lucide icon component (e.g. <Trophy size={...} />)
  variant = "circle", // "circle" or "roundedSquare"
  size = 64, // Size in px
  style = {}, // Allow custom styles
  noBg = true, // If true, render icon with no background (default: true)
  color = null, // Allow custom color override
  ...rest
}) => {
  const bgColor = "var(--primary-100)";

  // Choose border radius based on variant
  const borderRadius = variant === "circle" ? "50%" : "8px";

  return (
    <div
      data-testid={testid}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        ...(noBg
          ? {} // No background or border radius
          : { background: bgColor, borderRadius }),
        // Allow custom styles to override
        ...style,
      }}
      {...rest}
    >
      {/* If child is an <img>, set its size manually. Otherwise, clone Lucide icon with color/size. */}
      {children.type === "img" ? (
        React.cloneElement(children, {
          style: {
            width: size * 0.5,
            height: size * 0.5,
            objectFit: "contain",
            ...children.props.style,
          },
        })
      ) : (
        React.cloneElement(children, {
          color: color || "var(--primary-500)",
          size: size * 0.5,
        })
      )}
    </div>
  );
};

Icon.propTypes = {
  testid: PropTypes.string,
  children: PropTypes.element.isRequired, // Lucide icon
  variant: PropTypes.oneOf(["circle", "roundedSquare"]),
  size: PropTypes.number,
  style: PropTypes.object,
  noBg: PropTypes.bool, // If true, render icon with no background
  color: PropTypes.string, // Allow custom color override
};

export default Icon; 