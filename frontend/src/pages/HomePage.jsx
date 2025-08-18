import React from 'react';
import Text from '../components/Text';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { APP_NAME, getCurrentYear } from '../constants';

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
      <div>
        this is the hero section
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
          background-color: var(--primary-bg);
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

      `}</style>
    </div>
  );
};

export default HomePage; 