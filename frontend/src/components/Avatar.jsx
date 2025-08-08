import React from "react";
import PropTypes from "prop-types";
import "../styles/Avatar.css";
import harmoniousColors from "../color";

// Accept a style prop for custom background color
function Avatar({ testid = "avatar", initials, image, color = "primary", variant, style = {}, colorName }) {
  let textColor, backgroundColor, borderColor;
  
  if (colorName) {
    // Look up color from harmoniousColors when colorName is provided
    const colorData = harmoniousColors.find(c => c.name === colorName);
    if (colorData) {
      textColor = colorData.hex;
      backgroundColor = colorData.tinge;
      borderColor = colorData.hex;
    } else {
      // Fallback to original behavior if colorName not found
      textColor = color === "secondary" ? "var(--secondary-500)" : "var(--primary-500)";
      backgroundColor = "transparent";
      borderColor = textColor;
    }
  } else {
    // Original behavior for "primary"/"secondary" types - no background color
    textColor = color === "secondary" ? "var(--secondary-700)" : "var(--primary-700)";
    backgroundColor = "transparent";
    borderColor = textColor;
  }
  
  let size = 40;
  let fontSize = "14px";
  if (variant === "sm") {
    size = 32;
    fontSize = "12px";
  } else if (variant === "lg") {
    size = 48;
    fontSize = "18px";
  } else if (variant === "outlined") {
    size = 32;
    fontSize = "12px";
  }
  
  // Merge incoming style with sizing and background color
  const mergedStyle = { 
    width: size, 
    height: size, 
    minWidth: size, 
    minHeight: size,
    borderRadius: '50%',
    overflow: 'hidden',
    ...style 
  };
  
  // Handle outlined variant styling
  if (variant === "outlined") {
    mergedStyle.background = "transparent";
    mergedStyle.border = `2px solid ${borderColor}`;
  } else {
    // Only add background color if it's not transparent (i.e., from colorName)
    if (backgroundColor !== "transparent") {
      mergedStyle.background = backgroundColor;
    }
  }

  // Determine content to render
  const renderContent = () => {
    if (image) {
      // Render image
      return (
        <img 
          src={image} 
          alt="Avatar" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            display: 'block'
          }} 
        />
      );
    } else if (initials) {
      // Render initials
      return (
        <span style={{ 
          fontSize, 
          fontWeight: 600, 
          color: textColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}>
          {initials}
        </span>
      );
    }
    return null;
  };
  
  return (
    <div data-testid={testid} className={`avatar avatar--${color}`} style={mergedStyle}>
      {renderContent()}
    </div>
  );
}

Avatar.propTypes = {
  testid: PropTypes.string,
  initials: PropTypes.string,
  image: PropTypes.string,
  color: PropTypes.oneOf(["primary", "secondary"]),
  variant: PropTypes.oneOf(["sm", "lg", "outlined"]),
  style: PropTypes.object,
  colorName: PropTypes.string,
};

export default Avatar; 