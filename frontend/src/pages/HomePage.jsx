import React from 'react';
import Text from '../components/Text';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { Target, Users, CheckSquare, UsersFour, SketchLogo, Bell, CaretUp, CaretDown } from 'phosphor-react';
import { APP_NAME, getCurrentYear } from '../constants';

/**
 * Accordion component for FAQ items
 */
const Accordion = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="accordion-card">
      <button 
        className="accordion-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Text
          variant="body1"
          style={{
            color: '#FFF',
            fontFamily: 'inherit',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            margin: 0,
            padding: 0,
            textAlign: 'left'
          }}
        >
          {question}
        </Text>
        <div className="accordion-icon">
          {isExpanded ? <CaretUp size={16} weight="bold" color="var(--primary-500)" /> : <CaretDown size={16} weight="bold" color="var(--primary-500)" />}
        </div>
      </button>
      
      {isExpanded && (
        <div className="accordion-content">
          <Text
            variant="body1"
            style={{
              color: '#D1D5DB',
              fontFamily: 'inherit',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '1.6',
              margin: 0,
              padding: 0,
              textAlign: 'left'
            }}
          >
            {answer}
          </Text>
        </div>
      )}
    </div>
  );
};

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
      <div className="rack rack-1">
        <div className="page-container">
          {/* Left Section - Text Content */}
          <div className="hero-text-section">
            {/* Main Title */}
            <div>
              <Text
                variant="h1"
                style={{
                  fontSize: '64px',
                  fontWeight: 900,
                  lineHeight: '80px',
                  color: 'var(--neutral-999)',
                  margin: 0,
                  padding: 0
                }}
              >
                Create <span style={{ color: 'var(--primary-500)' }}>on-brand</span> social content in minutes.
              </Text>
            </div>

            {/* Subtitle */}
            <div>
              <Text
                variant="body1"
                style={{
                  fontSize: '20px',
                  fontWeight: 400,
                  lineHeight: '28px',
                  color: '#B0B0B0',
                  fontFamily: 'inherit',
                  fontStyle: 'normal',
                  margin: 0,
                  padding: 0
                }}
              >
                Build daily habits with mates. Check in, win streaks, and stick with it through 14-day sprints - all without the social-media hype.
              </Text>
            </div>

            {/* Call to Action Button */}
            <div style={{ marginTop: '24px' }}>
              <Link
                to="/signin"
                state={{ tab: "signup" }}
                style={{
                  textDecoration: 'none'
                }}
              >
                <Button
                  size="lg"
                  className="landing-page-button"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Section - SVG Illustration */}
          <div className="hero-illustration-section">
            {/* SVG Illustration */}
            <div className="illustration-container">
              <img 
                src="/landing.jpg" 
                alt="yoga teacher using ScribeMate to generate a post"
                className="hero-illustration"
              />
            </div>
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
        /* Base rack styles */
        .homepage-wrapper {
          background-color: var(--primary-bg);
          min-height: 100vh;
        }

        .rack {
          padding: 80px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rack-1 {
          background-color: var(--primary-bg);
        }

        /* Using existing .page-container from global CSS instead of duplicating */

        /* Rack #1 - Hero Section */
        .rack-1 .page-container {
          display: flex;
          align-items: center;
          gap: 80px;
          flex-direction: row;
        }

        .hero-text-section {
          flex: 0.7;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .hero-illustration-section {
          flex: 0.8;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .illustration-container {
          position: relative;
          width: 100%;
          max-width: 680px;
        }

        .hero-illustration {
          width: 100%;
          height: auto;
          max-width: 680px;
        }

        .rack-section {
          text-align: center;
        }

        .rack-title {
          color: var(--neutral-999);
          text-align: center;
          font-size: 36px;
          font-style: normal;
          font-weight: 700;
          line-height: 40px;
          margin-bottom: 12px;
        }

        .rack-subtitle {
          color: #B0B0B0;
          text-align: center;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: 28px;
          margin-bottom: 64px;
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          .homepage-header {
            padding: 20px;
          }

          .header-content {
            flex-direction: column;
            gap: 16px;
          }

          .header-left,
          .header-right {
            width: 100%;
            justify-content: center;
          }

          .rack {
            padding: 60px 20px;
          }
          
          .rack-1 .page-container {
            flex-direction: column;
            gap: 60px;
            text-align: center;
          }
          
          .rack-section {
            text-align: center;
          }
          
          .features-content {
            flex-direction: column;
            gap: 60px;
            text-align: center;
          }
          
          .features-text-section {
            flex: 1;
          }
          
          .features-image-section {
            flex: 1;
          }
          
          .cards-container {
            flex-direction: column;
            align-items: center;
          }
          
          .how-it-works-card {
            max-width: 100%;
            min-width: 0;
          }

          .testimonials-container {
            flex-direction: column;
            align-items: center;
          }

          .testimonial-card {
            max-width: 100%;
            min-width: 0;
          }

                  .accordion-card {
          padding: 20px;
        }
      }

      /* Landing page button styling */
      .landing-page-button {
        font-weight: 700 !important;
      }

      /* Header */
      .homepage-header {
        background-color: rgb(28, 29, 30);
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

      /* Footer */
      .homepage-footer {
        background-color: rgb(28, 29, 30);
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

      /* Responsive footer */
      @media (max-width: 768px) {
        .homepage-footer {
          padding: 20px;
        }

        .footer-content {
          flex-direction: column;
          gap: 16px;
          text-align: center;
        }

        .footer-left,
        .footer-right {
          flex: none;
          text-align: center;
        }
      }
    `}</style>
    </div>
  );
};

export default HomePage; 