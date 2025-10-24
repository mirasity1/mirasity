import { useEffect } from 'react';

// Substitua por seu ID do Google Analytics
const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || 'G-ET9PL2MG7D';

// Função para inicializar o Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // Carrega o script do Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Configura o gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
      anonymize_ip: true, // Para GDPR compliance
      allow_google_signals: false, // Desabilita sinais do Google por padrão
      allow_ad_personalization_signals: false, // Desabilita personalização de anúncios
    });
  }
};

// Função para rastrear eventos
export const trackEvent = (action, category = 'General', label = '', value = 0) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Função para rastrear page views
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: title,
      page_location: window.location.origin + path,
    });
  }
};

// Hook para rastrear mudanças de página (apenas para SPAs com React Router)
// export const usePageTracking = () => {
//   const location = useLocation();
//   useEffect(() => {
//     trackPageView(location.pathname, document.title);
//   }, [location]);
// };

// Componente principal do Google Analytics
const GoogleAnalytics = () => {
  useEffect(() => {
    // Só inicializa se o usuário já deu consentimento para analytics
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      const preferences = JSON.parse(consent);
      if (preferences.analytics) {
        initGA();
      }
    }
  }, []);

  return null; // Este componente não renderiza nada
};

export default GoogleAnalytics;