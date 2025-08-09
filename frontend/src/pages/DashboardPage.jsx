import React from "react";
import Text from "../components/Text";
import Icon from "../components/Icon";
import { Lightbulb } from "phosphor-react";
import { DEFAULT_USER_NAME } from "../constants";

// Local, file-scoped card for dashboard only. Do not change global Card.
function DashboardCard({ title, subtitle, body }) {
  return (
    <div
      className="dashboard-local-card"
      style={{
        borderRadius: 12,
        border: "1px solid var(--neutral-300)",
        background: "var(--paper-background, var(--primary-bg))",
        boxShadow: "var(--shadow-sm)",
        padding: 24,
      }}
    >
      {title ? (
        <Text variant="h5">{title}</Text>
      ) : null}
      {subtitle ? (
        <Text variant="h6" style={{ marginTop: title ? 12 : 0 }}>
          {subtitle}
        </Text>
      ) : null}
      {body ? (
        <Text variant="body2" style={{ marginTop: subtitle ? 14 : 0, lineHeight: 1.5 }}>
          {body}
        </Text>
      ) : null}
    </div>
  );
}

function DashboardPage() {
  return (
    <>
      {/* Greeting block */}
      <div
        className="greeting-block"
        style={{
          borderBottom: "1px solid var(--neutral-300)",
          backgroundColor: "var(--primary-bg)",
        }}
      >
        <div
          className="page-container max-width"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "16px",
            padding: "24px 0",
          }}
        >
          {/* Left side - Welcome text */}
          <div style={{ flex: 1 }}>
            <Text
              variant="h3"
              style={{
                fontWeight: 700,
                color: "var(--color-text-primary)",
              }}
            >
              Welcome back, {DEFAULT_USER_NAME.split(" ")[0]}!
            </Text>
            <Text
              variant="body1"
              style={{
                color: "var(--neutral-700)",
              }}
            >
              Ready to create engaging content for your piano studio?
            </Text>
          </div>

          {/* Right side - Lightbulb icon only */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon variant="roundedSquare" size={40} noBg={false}>
              <Lightbulb weight="fill" size={24} />
            </Icon>
          </div>
        </div>
      </div>

      {/* Content block */}
      <div className="content-block">
        <div className="page-container max-width flex-row-wrap" style={{ padding: "24px 0" }}>
          {/* Left column - 2 parts width */}
          <div
            className="content-left"
            style={{ flex: 2, maxWidth: 800 }}
          >
            <DashboardCard
              title="Choose Your Topic"
              subtitle="Trending Topics"
              body="Add topic suggestions here."
            />
          </div>

          {/* Right column - 1 part width */}
          <div className="content-right" style={{ flex: 1 }}>
            <DashboardCard
              subtitle="This Month"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac feugiat urna."
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
