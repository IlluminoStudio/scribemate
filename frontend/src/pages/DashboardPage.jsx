import React from "react";
import Text from "../components/Text";
import Icon from "../components/Icon";
import Button from "../components/Button";
import { Lightbulb, Folder, Palette, Question } from "phosphor-react";
import { DEFAULT_USER_NAME } from "../constants";

// Local, file-scoped card for dashboard only. Do not change global Card.
function DashboardCard({ title, subtitle, body }) {
  return (
    <div
      className="dashboard-local-card"
      style={{
        borderRadius: 12,
        border: "1px solid var(--neutral-300)",
        background: "var(--primary-bg)",
        boxShadow: "var(--shadow-xs)",
        padding: 24,
      }}
    >
      {title ? <Text variant="h5">{title}</Text> : null}
      {subtitle ? (
        <Text variant="h6" style={{ marginTop: title ? 12 : 0 }}>
          {subtitle}
        </Text>
      ) : null}
      {body ? (
        <div
          style={{
            marginTop: title || subtitle ? 16 : 0,
            lineHeight: 1.5,
          }}
        >
          {body}
        </div>
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
        <div className="page-container max-width" style={{ padding: "24px 0" }}>
          <div
            className="flex-row-wrap"
            style={{ maxWidth: "100%", alignItems: "flex-start" }}
          >
            {/* Left column - 2 parts width*/}
            <div className="content-left" style={{ flex: 2, maxWidth: 800 }}>
              <DashboardCard
                title="Choose Your Topic"
                subtitle="Trending Topics"
                body="Add topic suggestions here."
              />
            </div>

            {/* Right column - 1 part width */}
            <div
              className="content-right"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <DashboardCard
                subtitle="This Month"
                body={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        variant="body1"
                        style={{ color: "var(--neutral-700)" }}
                      >
                        Posts Created
                      </Text>
                      <Text variant="h6">12</Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        variant="body1"
                        style={{ color: "var(--neutral-700)" }}
                      >
                        Drafts Saved
                      </Text>
                      <Text variant="h6">5</Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        variant="body1"
                        style={{ color: "var(--neutral-700)" }}
                      >
                        Images Generated
                      </Text>
                      <Text variant="h6">18</Text>
                    </div>
                  </div>
                }
              />

              <DashboardCard
                title="Quick Actions"
                body={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}
                  >
                    <Button
                      testid="content-library"
                      color="grey"
                      variant="text"
                      size="sm"
                      leftIcon={<Folder weight="fill" size={20} />}
                      style={{ paddingLeft: 0 }}
                    >
                      Content Library
                    </Button>
                    <Button
                      testid="brand-assets"
                      color="grey"
                      variant="text"
                      size="sm"
                      leftIcon={<Palette weight="fill" size={20} />}
                      style={{ paddingLeft: 0 }}
                    >
                      Brand Assets
                    </Button>
                    <Button
                      testid="help-support"
                      color="grey"
                      variant="text"
                      size="sm"
                      leftIcon={<Question weight="fill" size={20} />}
                      style={{ paddingLeft: 0 }}
                    >
                      Help & Support
                    </Button>
                  </div>
                }
              />

              <DashboardCard
                body={
                                     <div
                     style={{
                       display: "flex",
                       alignItems: "flex-start",
                       gap: "8px",
                       background: "var(--primary-100)",
                       border: "1px solid var(--primary-200)",
                       borderRadius: "12px",
                       padding: "24px",
                       boxShadow: "var(--shadow-sm)",
                       margin: "-24px", // Compensate for DashboardCard's internal padding
                     }}
                   >
                     <div style={{ 
                       display: "flex", 
                       alignItems: "flex-start",
                       paddingTop: "4px"
                     }}>
                       <Lightbulb
                         weight="fill"
                         size={16}
                         style={{ color: "var(--primary-500)" }}
                       />
                     </div>
                     <div
                       style={{
                         display: "flex",
                         flexDirection: "column",
                         gap: "8px",
                       }}
                     >
                       <Text variant="h6">Pro Tip</Text>
                       <Text variant="body2" style={{ lineHeight: "20px" }}>
                         Try combining seasonal topics with your teaching
                         expertise for higher engagement rates!
                       </Text>
                     </div>
                   </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
