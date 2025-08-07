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
 * Card component for the "How It Works" section
 */
const HowItWorksCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="how-it-works-card">
      <div className="card-icon">
        <Icon size={32} weight="bold" />
      </div>
      <div className="card-content">
        <div className="card-title">{title}</div>
        <div className="card-description">{description}</div>
      </div>
    </div>
  );
};

/**
 * Card component for testimonials
 */
const TestimonialCard = ({ name, profession, comment, avatarSrc }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-content">
        <div className="testimonial-text">
          {comment}
        </div>
        
        <div className="testimonial-author">
          <img 
            src={avatarSrc} 
            alt={`${name} avatar`}
            className="testimonial-avatar"
          />
          <div className="author-info">
            <div className="author-name">{name}</div>
            <div className="author-profession">{profession}</div>
          </div>
        </div>
      </div>
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
                Friends helping friends stick it till the end
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
                src="/landing.svg" 
                alt="Friends celebrating goal achievement with confetti and diverse characters"
                className="hero-illustration"
              />
              
              {/* Animated Confetti Overlay */}
              <div className="confetti-overlay">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="confetti-piece small"
                    style={{
                      backgroundColor: ['#ff6340', '#fbbf24', '#10b981', '#55EDF5', '#f83952'][i % 5],
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 4}s`,
                    }}
                  />
                ))}
                
                {/* Additional larger confetti pieces */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`large-${i}`}
                    className="confetti-piece large"
                    style={{
                      backgroundColor: ['#ff6340', '#fbbf24', '#10b981', '#55EDF5'][i % 4],
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rack #2 - How It Works Section */}
      <div className="rack rack-2">
        <div className="page-container">
          <div className="rack-section">
            <div className="rack-title">How It Works</div>
            <div className="rack-subtitle">Friends build lasting habits together.</div>
            
            <div className="cards-container">
              <HowItWorksCard
                icon={Target}
                title="Create a Task"
                description="Define a single, daily goal for your 14-day sprint. Keep it simple and achievable."
              />
              <HowItWorksCard
                icon={Users}
                title="Invite Friends"
                description="Form a micro-group of 2-3 friends via email to join your sprint and keep each other accountable."
              />
              <HowItWorksCard
                icon={CheckSquare}
                title="Check In Daily"
                description="Tap the check-in button once you've completed your task. The day turns green when everyone's done."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Rack #3 - Core Features Section */}
      <div className="rack rack-3">
        <div className="page-container">
          <div className="rack-section">
            <div className="rack-title">Core Features</div>
            <div className="rack-subtitle">Everything you need to stay motivated and on track.</div>
            
            <div className="features-content">
              <div className="features-text-section">
                <div className="features-list">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <UsersFour size={32} />
                    </div>
                    <div className="feature-content">
                      <div className="feature-title">All In To Win</div>
                      <div className="feature-subtitle">See who's checked in at a glance. The day only counts when every member checks in.</div>
                    </div>
                  </div>
                  
                  <div className="feature-item">
                    <div className="feature-icon">
                      <SketchLogo size={32} />
                    </div>
                    <div className="feature-content">
                      <div className="feature-title">Rewards & Perks</div>
                      <div className="feature-subtitle">Keep the streak alive to earn new badges and small surprises.</div>
                    </div>
                  </div>
                  
                  <div className="feature-item">
                    <div className="feature-icon">
                      <Bell size={32} />
                    </div>
                    <div className="feature-content">
                      <div className="feature-title">Give a Friendly Poke</div>
                      <div className="feature-subtitle">Send friendly nudges to your friends if they forget to check in. No pressure, just support.</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="features-image-section">
                <img 
                  src="/landing1.jpg" 
                  alt="Core Features Demo" 
                  className="features-laptop-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rack #4 - Testimonials Section */}
      <div className="rack rack-4">
        <div className="page-container">
          <div className="rack-section">
            <div className="rack-title">Friends Keeping Friends On Track</div>
            <div className="rack-subtitle">14 days at a time</div>
            
            <div className="testimonials-container">
              <TestimonialCard
                name="Camila R."
                profession="Designer, Dancer"
                comment='"FriendFlare feels like a pocket cheer squad. One tap, quick confetti, and my mates keep me honest. More confetti styles please."'
                avatarSrc="/camila.jpg"
              />
              <TestimonialCard
                name="May L."
                profession="Primary School Teacher"
                comment='"Gentle, simple, and it works. The dark theme and streak bar make checking in oddly satisfying."'
                avatarSrc="/may.jpg"
              />
              <TestimonialCard
                name="Daniel O'Connor"
                profession="Copywriter"
                comment='"Perfect for our 14-day writing sprint. One tap, everyone turns green, momentum stays high."'
                avatarSrc="/daniel.jpg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Rack #5 - FAQ Section */}
      <div className="rack rack-5">
        <div className="page-container">
          <div className="rack-section">
            <div className="rack-title">Frequently Asked Questions</div>
            
            <div className="faq-container">
              <Accordion
                question="How many friends can I add to a group?"
                answer="Groups work best with 2-3 people total. Small groups create stronger accountability without overwhelming social pressure."
              />
              <Accordion
                question="What happens if someone misses a day?"
                answer="The day stays incomplete until everyone checks in. You can still continue your streak the next day - we believe in progress, not perfection."
              />
              <Accordion
                question="Can I do multiple habits at once?"
                answer="We recommend focusing on one habit per 14-day sprint. After completing a sprint, you can start a new one with the same or different habit."
              />
              <Accordion
                question="Is FriendFlare free to use?"
                answer="Yes! FriendFlare is completely free. We believe habit building should be accessible to everyone."
              />
            </div>

            {/* Call to Action Section */}
            <div className="cta-section">
              <div className="cta-box">
                <Text
                  variant="body1"
                  style={{
                    color: '#FFF',
                    textAlign: 'center',
                    fontFamily: 'inherit',
                    fontSize: '36px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                    margin: 0,
                    padding: 0,
                    marginBottom: '22px'
                  }}
                >
                  Ready to Build Your Streak?
                </Text>
                
                <Text
                  variant="body1"
                  style={{
                    color: '#B0B0B0',
                    textAlign: 'center',
                    fontFamily: 'inherit',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '140%',
                    margin: 0,
                    padding: 0,
                    marginBottom: '32px',
                    maxWidth: '642px'
                  }}
                >
                  Stop procrastinating and start achieving. Grab your friends, pick a goal, and let's make it happen together.
                </Text>

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
                    Start Your 14-Day Sprint
                  </Button>
                </Link>
              </div>
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

        .rack-2 {
          background-color: var(--neutral-50);
        }

        .rack-3 {
          background-color: var(--primary-bg);
        }

        .rack-4 {
          background-color: var(--neutral-50);
        }

        .rack-5 {
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

        .confetti-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .confetti-piece {
          position: absolute;
          border-radius: 50%;
          animation: fall 4s infinite linear;
          opacity: 0.8;
        }

        .confetti-piece.small {
          width: 6px;
          height: 6px;
        }

        .confetti-piece.large {
          width: 10px;
          height: 10px;
          animation-duration: 5s;
          opacity: 0.9;
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

        .cards-container {
          display: flex;
          gap: 40px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .how-it-works-card {
          background-color: var(--primary-bg);
          border-radius: 12px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 420px;
          flex: 1;
          min-width: 360px;
        }

        .card-icon {
          margin-bottom: 16px;
          color: var(--primary-500);
        }

        .card-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .card-title {
          color: var(--neutral-999);
          font-size: 18px;
          font-weight: 600;
          line-height: 24px;
        }

        .card-description {
          color: #b0b0b0;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
        }

        /* Rack #3 - Core Features Section */
        .features-content {
          display: flex;
          align-items: center;
          gap: 40px;
          flex-direction: row;
          margin-top: 48px;
          width: 100%;
        }

        .features-text-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 32px;
          text-align: left;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .feature-icon {
          color: var(--primary-500);
          flex-shrink: 0;
        }

        .feature-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .feature-title {
          color: var(--neutral-999);
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: 28px;
        }

        .feature-subtitle {
          color: var(--neutral-600);
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 24px;
        }

        .features-image-section {
          flex: 0 0 560px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .features-laptop-image {
          width: 100%;
          height: auto;
          max-width: 100%;
        }

        /* Rack #4 - Testimonials Section */
        .testimonials-container {
          display: flex;
          gap: 32px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 48px;
        }

        .testimonial-card {
          background: #0A0A0A;
          border-radius: 8px;
          border: 0 solid #E5E7EB;
          padding: 24px;
          display: flex;
          flex-direction: column;
          max-width: 420px;
          flex: 1;
          min-width: 360px;
          text-align: left;
        }

        .testimonial-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          align-items: flex-start;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: auto;
        }

        .testimonial-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
        }

        .author-info {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .testimonial-text {
          color: #B0B0B0;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 1.5;
          margin-bottom: 16px;
          text-align: left;
        }

        .author-name {
          color: #FFF;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: 24px;
          text-align: left;
        }

        .author-profession {
          color: #B0B0B0;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
          text-align: left;
        }

        /* Rack #5 - FAQ Section */
        .faq-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 48px;
          align-items: center;
          width: 100%;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
        }

        .accordion-card {
          border-radius: 12px;
          border: 1px solid #2A2A2A;
          background: #1A1A1A;
          padding: 25px;
          max-width: 768px;
          width: 100%;
        }

        .accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .accordion-content {
          margin-top: 12px;
          cursor: default;
        }

        .accordion-icon {
          flex-shrink: 0;
        }

        /* Call to Action Section */
        .cta-section {
          margin-top: 160px;
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .cta-box {
          border-radius: 16px;
          border: 0 solid #E5E7EB;
          background: rgba(85, 237, 245, 0.10);
          padding-top: 56px;
          padding-bottom: 64px;
          padding-left: 40px;
          padding-right: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 1280px;
          width: 100%;
        }

        .accordion-content {
          margin-top: 12px;
        }

        /* Confetti animation */
        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(400px) rotate(360deg);
            opacity: 0;
          }
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