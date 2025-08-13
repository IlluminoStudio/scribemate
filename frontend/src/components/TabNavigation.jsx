import React from "react";
import Text from "./Text";

const TabNavigation = ({
  tabs = [],
  selectedTab,
  onTabChange,
  variant = "no-icon", // "no-icon", "icon-top", "icon-left"
  iconSize = 20,
  testid,
}) => {
  const handleTabClick = (tabValue) => {
    if (onTabChange) {
      onTabChange(tabValue);
    }
  };

  return (
    <div
      data-testid={testid}
      style={{
        width: "100%",
        borderBottom: "1px solid var(--neutral-300)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {tabs.map((tab, index) => {
        const isSelected = selectedTab === tab.value;
        const isLastTab = index === tabs.length - 1;
        
        return (
          <div
            key={tab.value}
            style={{
              display: "flex",
              flexDirection: variant === "icon-top" ? "column" : "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px 0 12px 0",
              marginRight: isLastTab ? 0 : "24px",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => handleTabClick(tab.value)}
          >
                        {/* Icon rendering based on variant */}
            {variant !== "no-icon" && tab.icon && (
              <div
                style={{
                  marginBottom: variant === "icon-top" ? "4px" : 0,
                  marginRight: variant === "icon-left" ? "4px" : 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {React.cloneElement(tab.icon, {
                  size: iconSize,
                  color: isSelected ? "var(--primary-500)" : "var(--neutral-700)",
                })}
              </div>
            )}
            
            {/* Text label */}
            <Text
              variant="body2"
              style={{
                color: isSelected ? "var(--primary-500)" : "var(--neutral-700)",
                fontWeight: 400,
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {tab.label}
            </Text>
            
            {/* Selected state underline */}
            {isSelected && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  backgroundColor: "var(--primary-500)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TabNavigation;
