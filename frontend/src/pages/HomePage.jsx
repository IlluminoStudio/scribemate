import React from 'react';
import Text from '../components/Text';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { APP_NAME, getCurrentYear } from '../constants';
import { Check, Brain, MagnifyingGlass, Palette, Clock, ShareNetwork, CheckCircle } from 'phosphor-react';

/**
 * Reusable FeatureCard component for displaying feature information
 */
const FeatureCard = ({ icon: IconComponent, title, subtitle }) => {
  return (
    <div className="feature-card">
      <IconComponent weight="regular" size={48} className="card-icon" />
      <Text
        variant="h4"
        className="card-card-title"
      >
        {title}
      </Text>
      <Text
        variant="body1"
        className="card-card-subtitle"
      >
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
      subtitle: "Generate engaging posts tailored to your brand voice and current trends with advanced AI technology."
    },
    {
      icon: MagnifyingGlass,
      title: "SEO Optimization",
      subtitle: "Every post is crafted with SEO best practices to help your content reach the right audience."
    },
    {
      icon: Palette,
      title: "Brand Consistency",
      subtitle: "Maintain your unique brand voice and visual identity across all social media platforms."
    },
    {
      icon: Clock,
      title: "Time-Saving",
      subtitle: "Create weeks of content in minutes, not hours. Focus on running your business, not content creation."
    },
    {
      icon: ShareNetwork,
      title: "Multi-Platform",
      subtitle: "Optimize content for Facebook, Instagram, LinkedIn, and more with platform-specific formatting."
    },
    {
      icon: CheckCircle,
      title: "Compliant",
      subtitle: "Stay within platform guidelines with content that's designed for manual posting by you."
    }
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
            <Text
              variant="body1"
              className="header-title"
            >
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
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Rack #1 - Hero Section */}
      <div className="rack rack-warm hero-section">
        <div className="rack-content flex-row-wrap">
          {/* Left side - Text content */}
          <div className="hero-text">
            <Text
              variant="h1"
              className="hero-title"
            >
              Create <span className="hero-highlight">on-brand</span> social content in minutes
            </Text>
            
            <Text
              variant="body1"
              className="hero-subtitle"
            >
              ScribeMate helps busy small business owners craft SEO-conscious social media posts that showcase expertise and nurture community growth.
            </Text>
            
            {/* Buttons */}
            <div className="hero-buttons flex-row-wrap">
              <Button size="lg">
                Start Creating Content
              </Button>
              <Button color="primary" variant="outlined" size="lg">
                See How It Works
              </Button>
            </div>
            
            {/* Icon-text pairs */}
            <div className="hero-features">
              <div className="feature-item">
                <Check weight="bold" size={16} className="feature-icon" />
                <Text
                  variant="body1"
                  className="feature-text"
                >
                  No posting required
                </Text>
              </div>
              <div className="feature-item">
                <Check weight="bold" size={16} className="feature-icon" />
                <Text
                  variant="body1"
                  className="feature-text"
                >
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
            <Text
              variant="h1"
              className="card-title"
            >
              Everything you need for social success
            </Text>
            <Text
              variant="body1"
              className="card-subtitle"
            >
              Designed specifically for busy small business owners who need consistent, professional content
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
            <Text
              variant="body1"
              className="footer-copyright"
            >
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

      {/* Styles */}
      <style>{`
        /* Base layout styles */
        .homepage-wrapper {
          background-color: var(--neutral-0);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .homepage-header {
          background-color: var(--neutral-0);
          width: 100%;
          padding: 12px 24px;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .header-left {
          display: flex;
          align-items: center;
        }

        .header-logo {
          width: 32px;
          height: 32px;
          margin-right: 12px;
        }

        .header-title {
          color: var(--primary-main);
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          padding: 0;
        }

        .header-right {
          display: flex;
          align-items: center;
        }

        .header-link {
          margin-right: 16px;
          text-decoration: none;
        }

        .header-link:last-child {
          margin-right: 0;
        }

        /* Main content area */
        .homepage-wrapper > div:not(.homepage-header):not(.homepage-footer) {
          flex: 1;
          padding: 80px 40px;
        }

        /* Rack System - Reusable Classes */
        .rack {
          padding: 100px 80px;
        }

        .rack-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        /* Rack Background Variants */
        .rack-light {
          background-color: var(--neutral-0);
        }

        .rack-warm {
          background-color: #FCF8F3;
        }

        /* Hero Section - Now uses rack classes */
        .hero-section {
          /* Inherits from .rack and .rack-warm */
        }

        .hero-content {
          /* Inherits from .rack-content */
        }

        .hero-text {
          flex: 1;
          max-width: 600px;
        }

        .hero-title {
          font-size: 48px;
          font-weight: 700;
          color: var(--neutral-800);
          line-height: 48px;
          margin: 0;
          padding: 0;
        }

        .hero-highlight {
          color: var(--primary-500);
        }

        .hero-subtitle {
          font-size: 20px;
          font-weight: 400;
          line-height: 33px;
          color: var(--neutral-700);
          margin: 24px 0 0 0;
          padding: 0;
        }

        .hero-buttons {
          margin-top: 32px;
        }

        .hero-features {
          display: flex;
          gap: 24px;
          margin-top: 32px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .feature-icon {
          color: var(--primary-500);
        }

        .feature-text {
          line-height: 1.5;
          margin: 0;
          padding: 0;
        }

        .hero-image {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .hero-illustration {
          width: 100%;
          height: auto;
          max-width: 600px;
        }

        /* Feature Cards Section */
        .feature-section-header {
          margin-bottom: 40px;
          width: 100%;
        }

        .card-title {
          font-size: 36px;
          font-weight: 700;
          line-height: 40px;
          color: var(--neutral-800);
          margin: 0;
          padding: 0;
        }

        .card-subtitle {
          margin-top: 12px;
          font-weight: 400;
          font-size: 20px;
          line-height: 28px;
          color: var(--neutral-700);
          margin-bottom: 40px;
          margin-left: 0;
          margin-right: 0;
        }

        .feature-card {
          background-color: var(--neutral-100);
          border-radius: 12px;
          border: none;
          box-shadow: var(--shadow-sm);
          padding: 32px;
          max-width: 384px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          flex: 1;
          min-width: 300px;
        }

        .card-icon {
          color: var(--primary-500);
          margin: 0 0 0 0;
          padding: 0;
        }

        .feature-card .card-card-title {
          font-size: 20px;
          font-weight: 600;
          color: var(--neutral-800);
          margin: 28px 0 14px 0 !important;
          padding: 0;
          line-height: 1.2;
        }

        .card-card-subtitle {
          font-size: 16px;
          font-weight: 400;
          color: var(--neutral-700);
          line-height: 1.5;
          margin: 0;
          padding: 0;
        }

        /* Footer */
        .homepage-footer {
          background-color: var(--primary-200);
          width: 100%;
          padding: 16px 40px;
          margin-top: auto;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .footer-left {
          flex: 1;
        }

        .footer-right {
          flex: 1;
          text-align: right;
        }

        .footer-copyright {
          color: var(--neutral-600);
          font-size: 14px;
          font-weight: 400;
          margin: 0;
          padding: 0;
        }

        .footer-credit {
          color: var(--neutral-600);
          font-size: 14px;
          font-weight: 400;
          text-decoration: none;
          margin: 0;
          padding: 0;
        }

        .footer-credit:hover {
          color: var(--neutral-700);
        }

        /* Responsive adjustments for rack system */
        @media (max-width: 768px) {
          .rack {
            padding: 60px 40px;
          }
          
          .hero-title {
            font-size: 36px;
            line-height: 40px;
          }
          
          .hero-subtitle {
            font-size: 18px;
            line-height: 28px;
          }
          

          
          .card-title {
            font-size: 32px;
            line-height: 36px;
          }
          
          .card-subtitle {
            font-size: 18px;
            line-height: 26px;
          }
        }

        @media (max-width: 640px) {
          .homepage-wrapper > div:not(.homepage-header):not(.homepage-footer) {
            padding: 40px 20px;
          }
          
          .rack {
            padding: 40px 20px;
          }
          
          .homepage-header {
            padding: 12px 20px;
          }
          
          .homepage-footer {
            padding: 16px 20px;
          }
          

          
          .card-title {
            font-size: 28px;
            line-height: 32px;
          }
          
          .card-subtitle {
            font-size: 16px;
            line-height: 24px;
          }
          
          .feature-card {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage; 