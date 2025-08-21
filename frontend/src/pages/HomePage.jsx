import React from "react";
import Text from "../components/Text";
import Button from "../components/Button";
import Input from "../components/Input";
import InputBox from "../components/InputBox";
import { Link } from "react-router-dom";
import { APP_NAME, getCurrentYear } from "../constants";
import {
  Check,
  Brain,
  MagnifyingGlass,
  Palette,
  Clock,
  ShareNetwork,
  CheckCircle,
  HeartStraight,
  ChatCircle,
  Upload,
  Question,
  MagicWand,
  Download,
} from "phosphor-react";
import Icon from "../components/Icon";
import Avatar from "../components/Avatar";
import pianoStudioImage from "../assets/piano-studio.jpg";
import cafeImage from "../assets/cafe.jpg";
import gymImage from "../assets/gym.jpg";
import pianoTeacherImage from "../assets/piano-teacher.png";
import cafeOwnerImage from "../assets/cafe-owner.png";
import personalTrainerImage from "../assets/personal-trainer.png";
import jwLogo from "../assets/jw-logo.svg";
import curvePenSvg from "/curve-pen.svg";
import "../styles/HomePage.css";

/**
 * Reusable FeatureCard component for displaying feature information
 */
const FeatureCard = ({ icon: IconComponent, title, subtitle }) => {
  return (
    <div className="feature-card">
      <Icon
        testid="feature-card-icon"
        variant="circle"
        size={44}
        noBg={false}
      >
        <IconComponent />
      </Icon>
      <Text variant="h4" className="card-card-title">
        {title}
      </Text>
      <Text variant="body1" className="card-card-subtitle">
        {subtitle}
      </Text>
    </div>
  );
};

/**
 * SamplePost component for displaying example social media posts
 * Shows an image with job title and description below
 */
const SamplePost = ({ image, jobTitle, description, businessName, avatarImage, postText, socialStats }) => {
  return (
    <div className="sample-post">
      {/* Inner card with image */}
      <div className="sample-post-inner">
        <img 
          src={image} 
          alt={`Example post for ${jobTitle}`}
          className="sample-post-image"
        />
        
        {/* Avatar and business name duo */}
        <div className="sample-post-avatar-section">
          <Avatar variant="sm" image={avatarImage} />
          <Text variant="label" weight={600} className="sample-post-business-name">
            {businessName}
          </Text>
        </div>
        
        {/* Paragraph text */}
        <Text variant="body2" className="sample-post-text">
          {postText}
        </Text>
        
        {/* Social media widgets */}
        <div className="sample-post-social-widgets">
          <div className="sample-post-social-item">
            <HeartStraight variant="light" size={12} className="sample-post-social-icon" />
            <Text variant="caption" className="sample-post-social-count">{socialStats.likes}</Text>
          </div>
          <div className="sample-post-social-item">
            <ChatCircle variant="light" size={12} className="sample-post-social-icon" />
            <Text variant="caption" className="sample-post-social-count">{socialStats.comments}</Text>
          </div>
          <div className="sample-post-social-item">
            <ShareNetwork variant="fill" size={12} className="sample-post-social-icon" />
            <Text variant="caption" className="sample-post-social-count">{socialStats.reposts}</Text>
          </div>
        </div>
      </div>
      
      {/* Job title and description */}
      <div className="sample-post-content">
        <Text variant="h6" className="sample-job-title">
          {jobTitle}
        </Text>
        <Text variant="body2" className="sample-description">
          {description}
        </Text>
      </div>
    </div>
  );
};

/**
 * ProcessStepCard component for displaying individual steps in the process
 * Shows an icon, title, and description for each step
 */
const ProcessStepCard = ({ icon: IconComponent, title, subtitle }) => {
  return (
    <div className="process-step-card">
      <Icon
        testid="process-step-icon"
        variant="circle"
        size={56}
        noBg={false}
        color="var(--neutral-0)"
        style={{ background: "var(--primary-500)", marginBottom: "24px" }}
      >
        <IconComponent weight="bold" size={32} />
      </Icon>
      <Text variant="h4" className="process-step-title">
        {title}
      </Text>
      <Text variant="body1" className="process-step-subtitle">
        {subtitle}
      </Text>
    </div>
  );
};

/**
 * FAQCard component for displaying individual FAQ items
 * Shows a question and answer in a styled card format
 */
const FAQCard = ({ question, answer }) => {
  return (
    <div className="faq-card">
      <Text variant="h6" color="var(--secondary-500)" className="faq-question">
        {question}
      </Text>
      <Text variant="body1" color="var(--neutral-700)" className="faq-answer">
        {answer}
      </Text>
    </div>
  );
};

/**
 * Landing page component that displays the main value proposition
 * and call-to-action for the Scribemate app
 */
const HomePage = () => {
  // Feature cards data
  const featureCards = [
    {
      icon: Brain,
      title: "AI-Powered Content",
      subtitle:
        "Generate engaging posts tailored to your brand voice and current trends with advanced AI technology.",
    },
    {
      icon: MagnifyingGlass,
      title: "SEO Optimization",
      subtitle:
        "Every post is crafted with SEO best practices to help your content reach the right audience.",
    },
    {
      icon: Palette,
      title: "Brand Consistency",
      subtitle:
        "Maintain your unique brand voice and visual identity across all social media platforms.",
    },
    {
      icon: Clock,
      title: "Time-Saving",
      subtitle:
        "Create weeks of content in minutes, not hours. Focus on running your business, not content creation.",
    },
    {
      icon: ShareNetwork,
      title: "Multi-Platform",
      subtitle:
        "Optimize content for Facebook, Instagram, LinkedIn, and more with platform-specific formatting.",
    },
    {
      icon: CheckCircle,
      title: "Compliant",
      subtitle:
        "Stay within platform guidelines with content that's designed for manual posting by you.",
    },
  ];

  // Example cards data for "See ScribeMate in Action" section
  const exampleCards = [
    {
      image: pianoStudioImage,
      jobTitle: "Piano Teacher",
      description: "Educational content that builds trust",
      businessName: "Harmony Piano Studio",
      avatarImage: pianoTeacherImage,
      postText: "🎹 Did you know that playing piano can improve memory and cognitive function? Our adult beginner classes start next week - it's never too late to learn! #PianoLessons #AdultLearning #MusicEducation",
      socialStats: { likes: 24, comments: 8, reposts: 3 }
    },
    {
      image: cafeImage,
      jobTitle: "Local Cafe",
      description: "Engaging community-focused posts",
      businessName: "Bean & Brew Cafe",
      avatarImage: cafeOwnerImage,
      postText: "☕ Monday motivation starts with our signature Ethiopian blend! Ethically sourced, perfectly roasted. What's your go-to coffee order? #MondayMotivation #EthicalCoffee #LocalCafe",
      socialStats: { likes: 18, comments: 12, reposts: 5 }
    },
    {
      image: gymImage,
      jobTitle: "Personal Trainer",
      description: "Motivational content that converts",
      businessName: "FitLife Personal Training",
      avatarImage: personalTrainerImage,
      postText: "💪 Transformation Tuesday! Small consistent actions lead to big results. Here's a simple 10-minute morning routine to energize your day. DM for your free consultation! #TransformationTuesday #FitnessMotivation #PersonalTrainer",
      socialStats: { likes: 31, comments: 15, reposts: 7 }
    },
  ];

  return (
    <div className="homepage-wrapper">
      {/* Top Bar */}
      <header className="homepage-header">
        <div className="header-content">
          <div className="header-left">
            <img
              src="/logo.svg"
              alt="Scribemate Logo"
              className="header-logo"
            />
            <Text variant="body1" className="header-title">
              ScribeMate
            </Text>
          </div>
          <div className="header-right" style={{ display: "none" }}>
            <Link
              to="/signin"
              state={{ tab: "signin" }}
              className="header-link"
            >
              <Button variant="text" size="sm">
                Sign In
              </Button>
            </Link>
            <Link
              to="/signin"
              state={{ tab: "signup" }}
              className="header-link"
            >
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Rack #1 - Hero Section */}
      <div className="rack rack-warm hero-section">
        <div className="rack-content flex-row-wrap-left">
          {/* Left side - Text content */}
          <div className="hero-text">
            <Text variant="h1" className="hero-title">
              Create <span className="hero-highlight">on-brand</span> social
              content in minutes
            </Text>

            <Text variant="body1" className="hero-subtitle">
              ScribeMate helps busy small business owners craft SEO-conscious
              social media posts that showcase expertise and nurture community
              growth.
            </Text>

            {/* Buttons */}
            <div className="hero-buttons flex-row-wrap-left">
              <Button size="lg">Start Creating Content</Button>
              <Button color="primary" variant="outlined" size="lg">
                See How It Works
              </Button>
            </div>

            {/* Icon-text pairs */}
            <div className="hero-features">
              <div className="feature-item">
                <Check weight="bold" size={16} className="feature-icon" />
                <Text variant="body1" className="feature-text">
                  No posting required
                </Text>
              </div>
              <div className="feature-item">
                <Check weight="bold" size={16} className="feature-icon" />
                <Text variant="body1" className="feature-text">
                  Brand-aligned content
                </Text>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="hero-image">
            <img
              src="/landing.png"
              alt="ScribeMate landing page illustration"
              className="hero-illustration"
            />
          </div>
        </div>
      </div>

      {/* Rack #2 - How ScribeMate Works */}
      <div className="rack rack-light">
        <div className="rack-content flex-row-wrap-left">
          {/* Title and Subtitle */}
          <div className="feature-section-header" style={{ marginBottom: "-10px" }}>
            <Text variant="h1" className="card-title">
              How ScribeMate Works
            </Text>
            <Text variant="body1" className="card-subtitle">
              Four simple steps to create engaging social content
            </Text>
          </div>
          
          {/* Process Steps */}
          <div className="process-steps-container">
            <ProcessStepCard
              icon={Upload}
              title="Upload Brand Assets"
              subtitle="Add your logo, colors, and brand guidelines to ensure consistent messaging"
            />
            <ProcessStepCard
              icon={Question}
              title="Choose Topics"
              subtitle="Select from trending topics or input your own ideas for content generation"
            />
            <ProcessStepCard
              icon={MagicWand}
              title="Generate Content"
              subtitle="AI creates on-brand posts with images optimized for your chosen platforms"
            />
            <ProcessStepCard
              icon={Download}
              title="Export & Post"
              subtitle="Download your content and post directly to your social media platforms"
            />
          </div>
        </div>
      </div>

      {/* Rack #3 - Feature Cards */}
      <div className="rack rack-warm">
        <div className="rack-content flex-row-wrap-left">
          {/* Title and Subtitle */}
          <div className="feature-section-header">
            <Text variant="h1" className="card-title">
              Everything you need for social{" "}
              <span className="success-highlight">
                success
                <img 
                  src={curvePenSvg} 
                  alt="Decorative underline" 
                  className="success-underline"
                />
              </span>
            </Text>
            <Text variant="body1" className="card-subtitle">
              Designed specifically for busy small business owners who need
              consistent, professional content
            </Text>
          </div>

          {/* Feature Cards Grid */}
          <div className="flex-row-wrap-center">
            {featureCards.map((card, index) => (
              <FeatureCard
                key={index}
                icon={card.icon}
                title={card.title}
                subtitle={card.subtitle}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Rack #4 - See ScribeMate in Action */}
      <div className="rack rack-light">
        <div className="rack-content flex-row-wrap-left">
          {/* Title and Subtitle */}
          <div className="feature-section-header">
            <Text variant="h1" className="card-title">
              See ScribeMate in Action
            </Text>
            <Text variant="body1" className="card-subtitle">
              Real posts generated for businesses like yours
            </Text>
          </div>
          
          {/* Example Cards */}
          <div className="flex-row-wrap-center">
            {exampleCards.map((card, index) => (
              <SamplePost
                key={index}
                image={card.image}
                jobTitle={card.jobTitle}
                description={card.description}
                businessName={card.businessName}
                avatarImage={card.avatarImage}
                postText={card.postText}
                socialStats={card.socialStats}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Rack #5 - Frequently Asked Questions */}
      <div className="rack rack-warm">
        <div className="rack-content flex-row-wrap-left">
          {/* Title and Subtitle */}
          <div className="feature-section-header">
            <Text variant="h1" className="card-title">
              Frequently Asked Questions
            </Text>
            <Text variant="body1" className="card-subtitle">
              Answers to common questions about ScribeMate
            </Text>
          </div>
          
          {/* FAQ Cards */}
          <div className="faq-container">
            <FAQCard
              question="How does ScribeMate ensure content matches my brand?"
              answer="Upload your logo, colours, and sample posts. ScribeMate learns your voice and style, ensuring every draft feels authentic and uniquely yours."
            />
            <FAQCard
              question="How does ScribeMate choose topics?"
              answer="Our AI engine analyses search trends, industry insights, and seasonal events to suggest both evergreen and trending ideas. You'll always have engaging and timely content that connect with your audience."
            />
            <FAQCard
              question="What social media platforms does ScribeMate support?"
              answer="Currently Facebook, Instagram, LinkedIn, and Blogs. Each post is tailored to the platform's style - from audience preferences and word limits to hashtag formats, image sizing, and orientation."
            />
            <FAQCard
              question="Will using ScribeMate break social media rules?"
              answer="Not at all. ScribeMate only generates drafts. You stay in control of posting, ensuring compliance with each platform's terms while saving valuable time. Every draft can also be edited before you publish."
            />
          </div>
        </div>
      </div>

      <div className="rack rack-light">
        <div className="rack-content flex-row-wrap-left">
          {/* Title and Subtitle */}
          <div className="feature-section-header">
            <Text variant="h1" className="card-title">
              Get in Touch
            </Text>
            <Text variant="body1" className="card-subtitle">
              Questions? Feature requests? Drop us a line and we'll see what we can do!
            </Text>
          </div>
          
          {/* Contact Form */}
          <div className="contact-form-card">
            <div className="contact-form-row">
              <Input 
                testid="contact-name"
                placeholder="Your Name"
              />
              <Input 
                testid="contact-email"
                placeholder="Your Email"
              />
            </div>
            <Input 
              testid="contact-subject"
              placeholder="Subject"
            />
            <InputBox 
              testid="contact-message"
              placeholder="Your Message"
            />
            <Button 
              testid="contact-submit"
              size="lg"
              className="contact-submit-btn"
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="footer-content">
          <div className="footer-left">
            <Text variant="body2" className="footer-copyright">
              © {getCurrentYear()} {APP_NAME}. All rights reserved.
            </Text>
          </div>
          <div className="footer-right">
            <a
              href="https://jialinwang.pro?utm_source=scribemate"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-credit"
            >
              <img 
                src={jwLogo} 
                alt="JW Logo" 
                className="footer-logo"
              />
              By Jialin Wang - crafted, not cobbled
            </a>
          </div>
        </div>
      </footer>


    </div>
  );
};

export default HomePage;
