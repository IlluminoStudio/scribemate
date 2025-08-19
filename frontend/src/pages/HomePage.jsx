import React from "react";
import Text from "../components/Text";
import Button from "../components/Button";
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
} from "phosphor-react";
import Icon from "../components/Icon";
import Avatar from "../components/Avatar";
import pianoStudioImage from "../assets/piano-studio.jpg";
import cafeImage from "../assets/cafe.jpg";
import gymImage from "../assets/gym.jpg";
import pianoTeacherImage from "../assets/piano-teacher.png";
import cafeOwnerImage from "../assets/cafe-owner.png";
import personalTrainerImage from "../assets/personal-trainer.png";
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
          <div className="header-right">
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
              src="/landing.jpg"
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
          <div className="feature-section-header">
            <Text variant="h1" className="card-title">
              How ScribeMate Works
            </Text>
            <Text variant="body1" className="card-subtitle">
              Four simple steps to create engaging social content
            </Text>
          </div>
        </div>
      </div>

      {/* Rack #3 - Feature Cards */}
      <div className="rack rack-warm">
        <div className="rack-content flex-row-wrap-left">
          {/* Title and Subtitle */}
          <div className="feature-section-header">
            <Text variant="h1" className="card-title">
              Everything you need for social success
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

      <div className="rack rack-warm">
        <div className="rack-content flex-row-wrap-left">
          {/* Title and Subtitle */}
          <div className="feature-section-header">
            <Text variant="h1" className="card-title">
              Simple Pricing
            </Text>
            <Text variant="body1" className="card-subtitle">
              Choose the plan that fits your business needs
            </Text>
          </div>
        </div>
      </div>

      <div className="rack rack-light">
        <div className="rack-content flex-row-wrap-left">
          {/* Title and Subtitle */}
          <div className="feature-section-header">
            <Text variant="h1" className="card-title">
              Frequently Asked Questions
            </Text>
          </div>
        </div>
      </div>

      <div className="rack rack-warm">
        <div className="rack-content flex-row-wrap-left">
          {/* Title and Subtitle */}
          <div className="feature-section-header">
            <Text variant="h1" className="card-title">
              Get in Touch
            </Text>
            <Text variant="body1" className="card-subtitle">
              Have questions? Feature requests? Feedback? We'd love to hear from you!
            </Text>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="footer-content">
          <div className="footer-left">
            <Text variant="body1" className="footer-copyright">
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
              By Jialin Wang - crafted, not cobbled
            </a>
          </div>
        </div>
      </footer>


    </div>
  );
};

export default HomePage;
