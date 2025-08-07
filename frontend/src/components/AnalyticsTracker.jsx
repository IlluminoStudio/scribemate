import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

/**
 * Component that tracks page views when routes change
 * Only tracks in production environment
 */
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Add a small delay to ensure Vercel Analytics script has loaded
    const timer = setTimeout(() => {
      trackPageView(location.pathname);
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);

  // This component doesn't render anything
  return null;
};

export default AnalyticsTracker; 