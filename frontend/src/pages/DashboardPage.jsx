import React from "react";
import Text from "../components/Text";
import Icon from "../components/Icon";
import Button from "../components/Button";
import Chip from "../components/Chip";
import Input from "../components/Input";
import InputBox from "../components/InputBox";
import Radio from "../components/Radio";
import {
  Lightbulb,
  Folder,
  Palette,
  Question,
  ArrowClockwise,
  FacebookLogo,
  LinkedinLogo,
  BookOpen,
} from "phosphor-react";
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

function TopicCard({ title, body, tag, tagVariant }) {
  return (
    <div
      style={{
        background: "var(--primary-bg)",
        border: "1px solid var(--neutral-300)",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        height: "100%",
      }}
    >
      <Text variant="h6" style={{ marginBottom: "4px" }}>
        {title}
      </Text>
      <Text
        variant="body2"
        style={{
          color: "var(--neutral-700)",
          lineHeight: "20px",
          marginBottom: "8px",
        }}
      >
        {body}
      </Text>
      <div style={{ alignSelf: "flex-start", marginTop: "auto" }}>
        <Chip label={tag} variant={tagVariant} size="xs" />
      </div>
    </div>
  );
}

function DashboardPage() {
  const [socialMediaOption, setSocialMediaOption] = React.useState("facebook");
  
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
                body={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "24px",
                    }}
                  >
                    {/* Header with Refresh button */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text variant="h6">Trending Topics</Text>
                      <Button
                        testid="refresh-topics"
                        color="primary"
                        variant="text"
                        size="sm"
                        leftIcon={<ArrowClockwise weight="fill" size={16} />}
                      >
                        Refresh
                      </Button>
                    </div>

                    {/* Topic Cards Grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "12px",
                        width: "100%",
                      }}
                    >
                      <TopicCard
                        title="Spring Recital Preparation Tips"
                        body="Help students prepare for their upcoming performances"
                        tag="Trending"
                        tagVariant="light"
                      />
                      <TopicCard
                        title="Benefits of Learning Piano for Kids"
                        body="Showcase the cognitive benefits of music education"
                        tag="Evergreen"
                        tagVariant="success"
                      />
                      <TopicCard
                        title="Adult Piano Lessons: It's Never Too Late"
                        body="Encourage adult learners to start their musical journey"
                        tag="Trending"
                        tagVariant="light"
                      />
                      <TopicCard
                        title="Practice Tips for Busy Families"
                        body="Share strategies for consistent practice routines"
                        tag="Evergreen"
                        tagVariant="success"
                      />
                    </div>
                    {/* Or Create Your Own Topic Card */}
                    <div
                      style={{
                        background: "var(--primary-bg)",
                        borderTop: "1px solid var(--neutral-300)",
                        paddingTop: "25px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <Text variant="h5">Or Create Your Own Topic</Text>
                      <Input
                        testid="topic-input"
                        label="Topic/Heading"
                        placeholder="Enter your topic idea..."
                      />
                      <InputBox
                        testid="context-inputbox"
                        title="Additional Context"
                        placeholder="Provide more details about your topic, target audience, or specific points you'd like to cover..."
                      />
                    </div>
                  </div>
                }
              />
              
              <DashboardCard
                title="Select Platform"
                body={
                  <div
                    style={{
                      display: "flex",
                      gap: "24px",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        border: "1px solid var(--neutral-300)",
                        borderRadius: "8px",
                        padding: "16px",
                        background: "none",
                        flex: "1",
                        minWidth: "200px",
                      }}
                    >
                      <Radio
                        testid="facebook-radio"
                        label="Facebook"
                        name="socialMediaOptions"
                        value="facebook"
                        checked={socialMediaOption === "facebook"}
                        onChange={setSocialMediaOption}
                        icon={<FacebookLogo weight="fill" size={16} />}
                      />
                    </div>
                    <div
                      style={{
                        border: "1px solid var(--neutral-300)",
                        borderRadius: "8px",
                        padding: "16px",
                        background: "none",
                        flex: "1",
                        minWidth: "200px",
                      }}
                    >
                      <Radio
                        testid="linkedin-radio"
                        label="LinkedIn"
                        name="socialMediaOptions"
                        value="linkedin"
                        checked={socialMediaOption === "linkedin"}
                        onChange={setSocialMediaOption}
                        icon={<LinkedinLogo weight="fill" size={16} />}
                      />
                    </div>
                    <div
                      style={{
                        border: "1px solid var(--neutral-300)",
                        borderRadius: "8px",
                        padding: "16px",
                        background: "none",
                        flex: "1",
                        minWidth: "200px",
                      }}
                    >
                      <Radio
                        testid="blog-radio"
                        label="Blog"
                        name="socialMediaOptions"
                        value="blog"
                        checked={socialMediaOption === "blog"}
                        onChange={setSocialMediaOption}
                        icon={<BookOpen weight="fill" size={16} />}
                      />
                    </div>
                  </div>
                }
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        paddingTop: "4px",
                      }}
                    >
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
