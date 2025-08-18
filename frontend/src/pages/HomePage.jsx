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
              style={{
                width: '32px',
                height: '32px',
                marginRight: '12px'
              }}
            />
            <Text
              variant="body1"
              style={{
                color: 'var(--primary-main)',
                fontSize: '18px',
                fontWeight: 700,
                margin: 0,
                padding: 0
              }}
            >
              ScribeMate
            </Text>
          </div>
          <div className="header-right">
            <Link
              to="/signin"
              state={{ tab: "signin" }}
              style={{
                marginRight: '16px',
                textDecoration: 'none'
              }}
            >
              <Button variant="text" size="sm">
                Sign In
              </Button>
            </Link>
            <Link
              to="/signin"
              state={{ tab: "signup" }}
              style={{
                textDecoration: 'none'
              }}
            >
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Rack #1 - Hero Section */}
      <div className="hero-section">
        <div className="hero-content flex-row-wrap">
          {/* Left side - Text content */}
          <div className="hero-text">
            <Text
              variant="h1"
              style={{
                fontSize: '48px',
                fontWeight: 700,
                color: 'var(--neutral-800)',
                lineHeight: '48px',
                margin: 0,
                padding: 0
              }}
            >
              Create <span style={{ color: 'var(--primary-500)' }}>on-brand</span> social content in minutes
            </Text>
            
            <Text
              variant="body1"
              style={{
                fontSize: '20px',
                fontWeight: 400,
                lineHeight: '33px',
                color: 'var(--neutral-700)',
                margin: '24px 0 0 0',
                padding: 0
              }}
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
                <Check weight="bold" size={16} color="var(--primary-500)" />
                <Text
                  variant="body1"
                  style={{
                    lineHeight: 1.5,
                    margin: 0,
                    padding: 0
                  }}
                >
                  No posting required
                </Text>
              </div>
              <div className="feature-item">
                <Check weight="bold" size={16} color="var(--primary-500)" />
                <Text
                  variant="body1"
                  style={{
                    lineHeight: 1.5,
                    margin: 0,
                    padding: 0
                  }}
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
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '600px'
              }}
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
              style={{
                color: 'rgb(150, 154, 157)',
                fontSize: '14px',
                fontWeight: 400,
                margin: 0,
                padding: 0
              }}
            >
              © {getCurrentYear()} {APP_NAME}. All rights reserved.
            </Text>
          </div>
          <div className="footer-right">
            <a 
              href="https://jialinwang.pro?utm_source=scribemate"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'rgb(150, 154, 157)',
                fontSize: '14px',
                fontWeight: 400,
                textDecoration: 'none',
                margin: 0,
                padding: 0
              }}
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
          background-color: var(--primary-50);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }


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

        .header-right {
          display: flex;
          align-items: center;
        }

        /* Main content area */
        .homepage-wrapper > div:not(.homepage-header):not(.homepage-footer) {
          flex: 1;
          padding: 80px 40px;
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

        /* Hero Section */
        .hero-section {
          background-color: #FCF8F3;
          padding: 100px 80px;
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-text {
          flex: 1;
          max-width: 600px;
        }

        .hero-image {
          flex: 1;
          display: flex;
          justify-content: center;
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

      `}</style>
    </div>
  );
};

export default HomePage; 