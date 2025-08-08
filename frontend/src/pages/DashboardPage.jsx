import React from "react";
import Text from "../components/Text";
import Icon from "../components/Icon";
import { Lightbulb } from "phosphor-react";

function DashboardPage() {
  return (
    <div className="page-container">
      {/* Main content rack - first of many children racks */}
      <div style={{ padding: "24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          {/* Left side content */}
          <div style={{ flex: 1 }}>
            <Text 
              variant="h3" 
              style={{ 
                fontWeight: 700, 
                marginBottom: 0,
                color: "var(--color-text-primary)"
              }}
            >
              Welcome back, Camera!
            </Text>
            <Text 
              variant="body1" 
              style={{ 
                color: "var(--neutral-700)",
                marginTop: 0
              }}
            >
              Ready to create engaging content for your piano studio?
            </Text>
          </div>
          
          {/* Right side content */}
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "flex-end",
            gap: 0,
            marginLeft: "16px"
          }}>
            <Icon 
              variant="roundedSquare" 
              size={56} 
              noBg={false}
              style={{ 
                background: "var(--primary-500)",
                marginBottom: 0
              }}
              color="white"
            >
              <Lightbulb weight="fill" />
            </Icon>
            <Text 
              variant="body2" 
              style={{ 
                color: "var(--neutral-600)",
                marginTop: 0,
                marginBottom: 0
              }}
            >
              Content Ideas
            </Text>
            <Text 
              variant="label" 
              style={{ 
                color: "var(--neutral-900)",
                marginTop: 0
              }}
            >
              Always Fresh
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
