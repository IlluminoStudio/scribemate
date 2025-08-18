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
} from "phosphor-react";
import Icon from "../components/Icon";
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
        <div className="rack-content flex-row-wrap">
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
            <div className="hero-buttons flex-row-wrap">
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

      {/* Rack #2 - Feature Cards */}
      <div className="rack rack-light">
        <div className="rack-content flex-row-wrap">
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
          <div className="flex-row-wrap">
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
