import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Vercel Analytics - only load in production and if not blocked
const loadAnalytics = async () => {
  if (process.env.NODE_ENV === 'production') {
    try {
      const { SpeedInsights } = await import('@vercel/speed-insights/react');
      const { Analytics } = await import('@vercel/analytics/react');
      
      return { SpeedInsights, Analytics };
    } catch (error) {
      console.log('Analytics not available (likely blocked by ad blocker)');
      return { SpeedInsights: null, Analytics: null };
    }
  }
  return { SpeedInsights: null, Analytics: null };
};

const AppWithAnalytics = () => {
  const [analytics, setAnalytics] = React.useState({ SpeedInsights: null, Analytics: null });

  React.useEffect(() => {
    loadAnalytics().then(setAnalytics);
  }, []);

  return (
    <React.StrictMode>
      <App />
      {analytics.SpeedInsights && <analytics.SpeedInsights />}
      {analytics.Analytics && <analytics.Analytics />}
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppWithAnalytics />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
