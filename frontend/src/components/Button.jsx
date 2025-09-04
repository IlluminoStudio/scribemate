import React from "react";
import PropTypes from "prop-types";
import "../styles/index.css";

// Button component supports three variants: "default", "outlined", and "text".
// All colors and styles use CSS variables from index.css as required by project rules.
// The default variant is used if no variant prop is provided.
// The component renders a <button> by default, or an <a> if an href prop is given (best practice for accessibility).

const VARIANTS = {
  default: "default",
  outlined: "outlined",
  text: "text",
};

function Button({
  testid = "button",
  children,
  variant = VARIANTS.default,
  size = "md",
  href,
  type = "button",
  color = "primary",
  style = {},
  fullWidth,
  leftIcon,
  rightIcon,
  ...props
}) {
  // Color maps for primary and secondary
  const colorMap = {
    primary: {
      filled: {
        background: "var(--primary-main)",
        color: "var(--neutral-0)",
        WebkitTextFillColor: "var(--neutral-0)",
        border: "none",
        hoverBg: "var(--primary-600)",
        activeBg: "var(--primary-700)",
        disabledBg: "var(--neutral-300)",
        disabledColor: "var(--neutral-500)",
      },
      outlined: {
        background: "none",
        color: "var(--primary-main)",
        WebkitTextFillColor: "var(--primary-main)",
        border: "2px solid var(--primary-main)",
        hoverBg: "rgba(85, 237, 245, 0.08)",
        activeBg: "rgba(85, 237, 245, 0.12)",
        disabledBorder: "2px solid var(--neutral-300)",
        disabledColor: "var(--neutral-400)",
      },
      text: {
        background: "none",
        color: "var(--primary-main)",
        WebkitTextFillColor: "var(--primary-main)",
        border: "none",
        hoverColor: "var(--primary-600)",
        activeColor: "var(--primary-700)",
        disabledColor: "var(--neutral-400)",
      },
    },
    secondary: {
      filled: {
        background: "var(--secondary-main)",
        color: "var(--neutral-0)",
        WebkitTextFillColor: "var(--neutral-0)",
        border: "none",
        hoverBg: "var(--secondary-600)",
        activeBg: "var(--secondary-700)",
        disabledBg: "var(--neutral-300)",
        disabledColor: "var(--neutral-500)",
      },
      outlined: {
        background: "none",
        color: "var(--secondary-main)",
        WebkitTextFillColor: "var(--secondary-main)",
        border: "2px solid var(--secondary-main)",
        hoverBg: "rgba(255, 99, 64, 0.08)",
        activeBg: "rgba(255, 99, 64, 0.12)",
        disabledBorder: "2px solid var(--neutral-300)",
        disabledColor: "var(--neutral-400)",
      },
      text: {
        background: "none",
        color: "var(--secondary-main)",
        WebkitTextFillColor: "var(--secondary-main)",
        fontWeight: 400,
        border: "none",
        hoverColor: "var(--secondary-700)",
        activeColor: "var(--secondary-800)",
        disabledColor: "var(--neutral-400)",
      },
    },
    neutral: {
      filled: {
        background: "var(--neutral-200)",
        color: "var(--neutral-500)",
        WebkitTextFillColor: "var(--neutral-500)",
        border: "none",
        hoverBg: "var(--neutral-50)",
        activeBg: "var(--neutral-50)",
        disabledBg: "var(--neutral-100)",
        disabledColor: "var(--neutral-200)",
      },
      outlined: {
        background: "none",
        color: "var(--neutral-500)",
        WebkitTextFillColor: "var(--neutral-400)",
        border: "2px solid var(--neutral-400)",
        hoverBg: "rgba(179, 179, 179, 0.08)",
        activeBg: "rgba(179, 179, 179, 0.12)",
        disabledBorder: "2px solid var(--neutral-50)",
        disabledColor: "var(--neutral-200)",
      },
      text: {
        background: "none",
        color: "var(--neutral-500)",
        WebkitTextFillColor: "var(--neutral-500)",
        fontWeight: 500,
        border: "none",
        hoverColor: "var(--neutral-500)",
        activeColor: "var(--neutral-600)",
        disabledColor: "var(--neutral-50)",
      },
    },
    error: {
      filled: {
        background: "var(--error-100)",
        color: "var(--error-500)",
        WebkitTextFillColor: "var(--error-500)",
        border: "none",
        hoverBg: "var(--error-200)",
        activeBg: "var(--error-300)",
        disabledBg: "var(--neutral-300)",
        disabledColor: "var(--neutral-500)",
      },
      outlined: {
        background: "none",
        color: "var(--error-500)",
        WebkitTextFillColor: "var(--error-500)",
        border: "2px solid var(--error-500)",
        hoverBg: "rgba(239, 68, 68, 0.08)",
        activeBg: "rgba(239, 68, 68, 0.12)",
        disabledBorder: "2px solid var(--neutral-300)",
        disabledColor: "var(--neutral-400)",
      },
      text: {
        background: "none",
        color: "var(--error-500)",
        WebkitTextFillColor: "var(--error-500)",
        fontWeight: 500,
        border: "none",
        hoverColor: "var(--error-600)",
        activeColor: "var(--error-700)",
        disabledColor: "var(--neutral-400)",
      },
    },
  };

  // Determine the correct element to render
  const Element = href ? "a" : "button";

  // Base styles for all variants
  const baseStyle = {
    fontFamily: "inherit",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "normal",
    letterSpacing: 0,
    borderRadius: 12,
    padding: "8px 16px",
    cursor: "pointer",
    outline: "none",
    border: "none",
    textDecoration: "none",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    color: "var(--neutral-0)",
    WebkitTextFillColor: "var(--neutral-0)",
    background: "none",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    transform: "translateY(0)",
  };

  // Size styles
  let sizeStyle = {};
  if (size === "lg") {
    sizeStyle = {
      borderRadius: 12,
      fontSize: 18,
      padding: "18px 32px",
    };
  } else if (size === "sm") {
    sizeStyle = {
      borderRadius: 10,
      fontSize: 14,
      padding: "8px 12px",
    };
  }

  // Select color set
  const colorSet = colorMap[color] || colorMap.primary;
  let variantKey = "filled";
  if (variant === VARIANTS.outlined) variantKey = "outlined";
  if (variant === VARIANTS.text) variantKey = "text";
  const variantColors = colorSet[variantKey];

  // Styles for each variant
  let variantStyle = {
    background: variantColors.background,
    color: variantColors.color,
    WebkitTextFillColor: variantColors.WebkitTextFillColor,
    border: variantColors.border,
    // Preserve base font weight unless explicitly overridden by variant
    fontWeight: variantColors.fontWeight || 500,
  };

  // Hover/active/disabled state styles
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  let hoverStyle = {};
  if (isHovered) {
    if (variantKey === "filled") {
      hoverStyle.background = variantColors.hoverBg;
    } else if (variantKey === "outlined") {
      // Simple outlined button hover state
      hoverStyle.background = variantColors.hoverBg;
      hoverStyle.border = variantColors.border;
      if (!style.color) hoverStyle.color = variantColors.color;
    } else if (variantKey === "text") {
      if (!style.color) hoverStyle.color = variantColors.hoverColor;
      if (!style.WebkitTextFillColor && variantColors.hoverColor) hoverStyle.WebkitTextFillColor = variantColors.hoverColor;
    }
  }
  let activeStyle = {};
  if (isActive) {
    if (variantKey === "filled") {
      activeStyle.background = variantColors.activeBg;
    } else if (variantKey === "outlined") {
      activeStyle.background = variantColors.activeBg;
      activeStyle.border = variantColors.border;
      if (!style.color) activeStyle.color = variantColors.color;
    } else if (variantKey === "text") {
      if (!style.color) activeStyle.color = variantColors.activeColor;
      if (!style.WebkitTextFillColor && variantColors.activeColor) activeStyle.WebkitTextFillColor = variantColors.activeColor;
    }
  }
  // Disabled state
  let disabledStyle = {};
  if (props.disabled) {
    if (variantKey === "filled") {
      disabledStyle.background = variantColors.disabledBg;
      disabledStyle.color = variantColors.disabledColor;
      disabledStyle.WebkitTextFillColor = variantColors.disabledColor;
      disabledStyle.cursor = "not-allowed";
    } else if (variantKey === "outlined") {
      disabledStyle.background = "none";
      disabledStyle.border = variantColors.disabledBorder;
      disabledStyle.color = variantColors.disabledColor;
      disabledStyle.WebkitTextFillColor = variantColors.disabledColor;
      disabledStyle.cursor = "not-allowed";
    } else if (variantKey === "text") {
      disabledStyle.background = "none";
      disabledStyle.color = variantColors.disabledColor;
      disabledStyle.WebkitTextFillColor = variantColors.disabledColor;
      disabledStyle.cursor = "not-allowed";
    }
  }

  // Handle custom colors for iOS compatibility
  const customStyle = { ...style };
  if (customStyle.color) {
    customStyle.WebkitTextFillColor = customStyle.color;
  }

  return (
    <Element
      data-testid={testid}
      type={Element === "button" ? type : undefined}
      href={href}
      style={{
        ...baseStyle,
        ...sizeStyle,
        ...variantStyle,
        ...hoverStyle,
        ...activeStyle,
        ...disabledStyle,
        ...customStyle,
        ...(fullWidth ? { width: "100%" } : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onBlur={() => setIsActive(false)}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </Element>
  );
}

Button.propTypes = {
  testid: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "outlined", "text"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  href: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.oneOf(["primary", "secondary", "neutral", "error"]),
  style: PropTypes.object,
  fullWidth: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
};

export default Button; 