export function trackPageView(page) {
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    if (window.va && typeof window.va.track === 'function') {
      window.va.track(page);
    }
  }
} 