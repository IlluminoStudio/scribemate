import React from 'react';
import Text from '../components/Text';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { APP_NAME, getCurrentYear } from '../constants';
import Icon from '../components/Icon';
import { Check } from 'phosphor-react';

/**
 * Landing page component that displays the main value proposition
 * and call-to-action for the Scribemate app
 */
const HomePage = () => {
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
        }
      `}</style>
    </div>
  );
};

export default HomePage; 