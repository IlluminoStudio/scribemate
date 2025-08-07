import React from "react";
import PropTypes from "prop-types";
import Text from "./Text";

// Simple Card component: icon (optional), title, body
const Card = ({ testid = "card", icon, title, body, style = {} }) => {
  return (
    <div
      data-testid={testid}
      style={{
        padding: 32,
        borderRadius: 16,
        border: "1px solid var(--color-border)",
        background: "linear-gradient(135deg, var(--neutral-50) 0%, var(--neutral-100) 100%)",
        boxShadow: "var(--shadow-md)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(10px)",
        transition: "all 0.2s ease-in-out",
        ...style,
      }}
    >
      {icon && <div>{icon}</div>}
      <Text
        variant="h3"
        style={{
          color: "var(--color-text-primary)",
          marginTop: 24,
          marginBottom: 16,
          textAlign: "center",
          wordBreak: "break-word",
          whiteSpace: "normal",
          width: "100%"
        }}
      >
        {title}
      </Text>
      <Text
        variant="body1"
        style={{
          color: "var(--color-text-secondary)",
          textAlign: "center",
          wordBreak: "break-word",
          whiteSpace: "normal",
          width: "100%"
        }}
      >
        {body}
      </Text>
    </div>
  );
};

Card.propTypes = {
  testid: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.node,
  body: PropTypes.node,
  style: PropTypes.object,
};

export default Card; 