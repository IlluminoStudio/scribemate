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
  MagicWand,
  Check,
} from "phosphor-react";
import { DEFAULT_USER_NAME } from "../constants";
import TabNavigation from "../components/TabNavigation";
import Slider from "../components/Slider";
import Spinner from "../components/Spinner";
import GeneratedPostCard from "../modules/GeneratedPostCard";
import postImage1 from "../assets/post-img1.jpg";
import postImage2 from "../assets/post-img2.jpg";
import postImage3 from "../assets/post-img3.jpg";
import { useUserData } from "../hooks/useSession";
import { useTopics } from "../hooks/useTopics";
import { usePosts } from "../hooks/usePosts";

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

function TopicCard({ title, tag, tagVariant, onClick }) {
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
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--primary-300)";
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--neutral-300)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Text variant="h6" style={{ marginBottom: "4px" }}>
        {title}
      </Text>
      <div style={{ alignSelf: "flex-start", marginTop: "auto" }}>
        <Chip label={tag} variant={tagVariant} size="xs" />
      </div>
    </div>
  );
}

function DashboardPage() {
  const [socialMediaOption, setSocialMediaOption] = React.useState("facebook");
  const [selectedTab, setSelectedTab] = React.useState("facebook");
  const [showGeneratedPost, setShowGeneratedPost] = React.useState(false);
  const [fetchedTopics, setFetchedTopics] = React.useState([]);
  const [generatedPostContent, setGeneratedPostContent] = React.useState(null);
  const [generatedPostTopic, setGeneratedPostTopic] = React.useState("");
  const [wordCount, setWordCount] = React.useState(200);
  const [customTopic, setCustomTopic] = React.useState("");
  const [topicsToAvoid, setTopicsToAvoid] = React.useState("");
  const [additionalContext, setAdditionalContext] = React.useState("");
  
  // Get user data from localStorage
  const { userData, updateUserData } = useUserData();
  const { first_name, last_name, business, industry, tone_guide, topics, pro_tips } = userData || {};
  
  // Topics hook for fetching topic suggestions
  const { loading: topicsLoading, error: topicsError, fetchTopicSuggestions } = useTopics();
  
  // Posts hook for generating content
  const { loading: postsLoading, error: postsError, generatePost } = usePosts();
  
  // Handle refresh topics button click
  const handleRefreshTopics = async () => {
    try {
      console.log('Fetching topics for industry:', industry);
      console.log('Topics to avoid:', topicsToAvoid);
      const newTopics = await fetchTopicSuggestions(industry, topicsToAvoid);
      console.log('Fetched new topics:', newTopics);
      
      // Update topics in localStorage
      const success = updateUserData({ topics: newTopics });
      if (success) {
        console.log('Topics updated in localStorage');
        // Clear fetchedTopics state since we're now using localStorage data
        setFetchedTopics([]);
      } else {
        console.error('Failed to update topics in localStorage');
        // Fallback: still update local state
        setFetchedTopics(newTopics);
      }
    } catch (error) {
      console.error('Failed to refresh topics:', error);
    }
  };
  
  // Handle generate content button click
  const handleGenerateContent = async () => {
    // Only proceed if custom topic is not empty
    if (!customTopic.trim()) {
      return;
    }
    
    // Call generatePostContent with the custom topic
    await generatePostContent(customTopic.trim());
  };
  
  // Generate post content for a given topic
  const generatePostContent = async (topicTitle) => {
    try {
      const generatedPost = await generatePost(topicTitle, tone_guide, socialMediaOption, wordCount, additionalContext);
      
      // Store the generated post content and topic
      setGeneratedPostContent(generatedPost);
      setGeneratedPostTopic(topicTitle);
      
      // Show the generated post
      setShowGeneratedPost(true);
    } catch (error) {
      console.error('Failed to generate content for topic:', error);
    }
  };
  
  // Get first pro tip
  const proTip = pro_tips && pro_tips.length > 0 
    ? pro_tips[0]
    : "Share behind-the-scenes content from your piano lessons to build trust with potential students. Parents love seeing the teaching environment!";
  
  // Get first 4 topics for display from localStorage
  const displayTopics = topics && topics.length > 0 
    ? topics.slice(0, 4)
    : [];

  
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
              Welcome back, {first_name || DEFAULT_USER_NAME.split(" ")[0]}!
            </Text>
            <Text
              variant="body1"
              style={{
                color: "var(--neutral-700)",
              }}
            >
              Ready to create engaging content for your {business || "piano studio"}?
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
            className="flex-row-wrap-left"
            style={{ maxWidth: "100%", alignItems: "flex-start" }}
          >
            {/* Left column - 2 parts width*/}
            <div className="content-left" style={{ flex: 2, maxWidth: 800 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
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
                          onClick={handleRefreshTopics}
                          disabled={topicsLoading}
                        >
                          {topicsLoading ? 'Loading...' : 'Refresh'}
                        </Button>
                      </div>

                      {/* Topic Cards Grid */}
                      <div
                        style={{
                          position: "relative",
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(280px, 1fr))",
                          gap: "12px",
                          width: "100%",
                        }}
                      >
                        {displayTopics.map((topic, index) => (
                          <TopicCard
                            key={index}
                            title={topic.topic}
                            tag={topic.type}
                            tagVariant={topic.type === "Trending" ? "light" : "success"}
                            onClick={() => generatePostContent(topic.topic)}
                          />
                        ))}
                        
                        {/* Spinner Overlay */}
                        {topicsLoading && (
                          <div className="spinner-overlay">
                            <Spinner testid="topics-loading-spinner" />
                          </div>
                        )}
                      </div>
                      
                      {/* Topics to Avoid Section */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        {/* Header with title and help icon */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Text variant="body2" color="var(--neutral-700)">
                            Topics to Avoid
                          </Text>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              color: "var(--neutral-500)",
                              cursor: "help",
                            }}
                            title="Filtering topics helps avoid suggestions that are repetitive, irrelevant, or not useful for your audience."
                          >
                            <Question weight="fill" size={16} />
                            <Text variant="body2" color="var(--neutral-500)">
                              Why filter topics?
                            </Text>
                          </div>
                        </div>
                        
                        {/* Input box */}
                        <InputBox
                          testid="topics-to-avoid-input"
                          placeholder="Enter topics to filter out (eg. competition, advanced theory, performance anxiety)"
                          value={topicsToAvoid}
                          onChange={setTopicsToAvoid}
                        />
                        
                        {/* Helper text */}
                        <Text 
                          variant="caption" 
                          color="var(--neutral-600)"
                        >
                          Separate topics with semicolon. This helps us suggest more relevant content for your business.
                        </Text>
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
                          value={customTopic}
                          onChange={(e) => setCustomTopic(e.target.value)}
                        />
                        <InputBox
                          testid="context-inputbox"
                          title="Additional Context"
                          placeholder="Provide more details about your topic, target audience, or specific points you'd like to cover..."
                          value={additionalContext}
                          onChange={setAdditionalContext}
                        />
                      </div>
                      {/*  Word Limit */}
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
                        <Text variant="label">Word Limit</Text>
                        <Slider
                          testid="word-count-slider"
                          min={50}
                          max={1000}
                          unit="words"
                          value={wordCount}
                          onChange={setWordCount}
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
                
                <DashboardCard
                  body={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        testid="generate-content-btn"
                        leftIcon={<MagicWand weight="fill" size={20} />}
                        onClick={handleGenerateContent}
                        disabled={postsLoading || !customTopic.trim()}
                      >
                        {postsLoading ? 'Generating...' : 'Generate Content'}
                      </Button>
                      <Text
                        variant="muted2"
                        style={{ color: "var(--neutral-700)" }}
                      >
                        AI will create tailored content for your selected platforms
                      </Text>
                    </div>
                  }
                />
                                 
                 {showGeneratedPost && (
                   <div style={{ position: "relative" }}>
                     <DashboardCard
                       body={
                         <div
                           style={{
                             display: "flex",
                             flexDirection: "column",
                             gap: "24px",
                           }}
                         >
                         {/* Header Section */}
                         <div
                           style={{
                             display: "flex",
                             justifyContent: "space-between",
                             alignItems: "flex-start",
                           }}
                         >
                           {/* Left side - Checkmark icon + title/subtitle stack */}
                           <div
                             style={{
                               display: "flex",
                               alignItems: "flex-start",
                               gap: "12px",
                             }}
                           >
                             {/* Green checkmark icon */}
                             <Icon 
                               variant="circle" 
                               size={40} 
                               noBg={false}
                               style={{ 
                                 background: "var(--success-100)",
                                 flexShrink: 0,
                               }}
                             >
                               <Check weight="bold" size={20} style={{ color: "var(--success-600)" }} />
                             </Icon>
                             
                             {/* Title and subtitle stack */}
                             <div
                               style={{
                                 display: "flex",
                                 flexDirection: "column",
                                 gap: "0px",
                               }}
                             >
                               <Text variant="h5">Here's your generated post</Text>
                               <Text
                                 variant="body2"
                                 style={{
                                   color: "var(--neutral-700)",
                                   marginTop: "0px",
                                 }}
                               >
                                 AI-generated content ready for your review
                               </Text>
                             </div>
                           </div>
                           
                           {/* Right side - Regenerate All button */}
                           <Button
                             testid="regenerate-all-btn"
                             color="secondary"
                             variant="outlined"
                             size="sm"
                             leftIcon={<ArrowClockwise weight="fill" size={16} />}
                           >
                             Regenerate All
                           </Button>
                         </div>
                         
                         {/* Divider line */}
                         <div
                           style={{
                             height: "1px",
                             background: "var(--neutral-300)",
                             width: "100%",
                           }}
                         />
                         
                         {/* Tab Navigation */}
                         <TabNavigation
                           testid="social-media-tabs"
                           tabs={[
                             { label: "Facebook", value: "facebook", icon: <FacebookLogo weight="fill" size={16} /> },
                             { label: "LinkedIn", value: "linkedin", icon: <LinkedinLogo weight="fill" size={16} /> },
                             { label: "Blog", value: "blog", icon: <BookOpen weight="fill" size={16} /> },
                           ]}
                           selectedTab={selectedTab}
                           onTabChange={setSelectedTab}
                           variant="icon-left"
                           iconSize={16}
                         />
                         
                        {/* Generated Post Card */}
                        <GeneratedPostCard
                          title={generatedPostTopic || "Generated Post"}
                          post={generatedPostContent?.post_content || "No content generated yet"}
                           image={
                             selectedTab === "facebook" ? postImage2 :
                             selectedTab === "linkedin" ? postImage1 :
                             selectedTab === "blog" ? postImage3 : postImage2
                           }
                           platform={
                             selectedTab === "facebook" ? "Facebook" :
                             selectedTab === "linkedin" ? "LinkedIn" :
                             selectedTab === "blog" ? "Blog" : "Facebook"
                           }
                           style={{ marginTop: '24px' }}
                         />
                       </div>
                     }
                   />
                   
                   {/* Spinner Overlay for Generated Post */}
                   {postsLoading && (
                     <div className="spinner-overlay">
                       <Spinner testid="posts-loading-spinner" />
                     </div>
                   )}
                   </div>
                 )}
              </div>
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
                      color="primary"
                      variant="text"
                      size="sm"
                      leftIcon={<Folder weight="fill" size={20} />}
                      style={{ paddingLeft: 0 }}
                    >
                      Content Library
                    </Button>
                    <Button
                      testid="brand-assets"
                      color="primary"
                      variant="text"
                      size="sm"
                      leftIcon={<Palette weight="fill" size={20} />}
                      style={{ paddingLeft: 0 }}
                    >
                      Brand Assets
                    </Button>
                    <Button
                      testid="help-support"
                      color="primary"
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
                        {proTip}
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
