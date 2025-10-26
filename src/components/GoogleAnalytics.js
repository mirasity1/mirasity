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

// Função específica para rastrear downloads de CV
export const trackCVDownload = (language = 'unknown') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'file_download', {
      event_category: 'CV',
      event_label: `CV_${language}`,
      file_extension: 'pdf',
      file_name: `CV_Filipe_Braga_${language}.pdf`,
    });
  }
};

// Função para rastrear cliques em botões
export const trackButtonClick = (buttonName, section = 'Unknown', additionalData = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'Button',
      event_label: `${section}_${buttonName}`,
      custom_map: {
        button_name: buttonName,
        section: section,
        ...additionalData
      }
    });
  }
};

// Função para rastrear envios de formulário
export const trackFormSubmission = (formType, status, errorDetails = '') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      event_category: 'Form',
      event_label: `${formType}_${status}`,
      form_type: formType,
      form_status: status,
      error_details: errorDetails,
    });
  }
};

// Função para rastrear navegação entre seções
export const trackNavigation = (sectionId, method = 'menu') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'navigate', {
      event_category: 'Navigation',
      event_label: `${method}_to_${sectionId}`,
      destination: sectionId,
      navigation_method: method,
    });
  }
};

// Função para rastrear visualizações de projetos
export const trackProjectView = (projectName, action = 'view') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'project_interaction', {
      event_category: 'Project',
      event_label: `${projectName}_${action}`,
      project_name: projectName,
      action_type: action,
    });
  }
};

// Função para rastrear links externos
export const trackExternalLink = (url, linkText = '', section = 'Unknown') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'External Link',
      event_label: `${section}_${linkText}`,
      link_url: url,
      link_text: linkText,
      outbound: true,
    });
  }
};

// Função para rastrear tempo gasto em seções
export const trackSectionTime = (sectionId, timeSpent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: 'section_view_time',
      value: timeSpent,
      event_category: 'Engagement',
      event_label: sectionId,
    });
  }
};

// Função para rastrear mudanças de idioma
export const trackLanguageChange = (fromLang, toLang) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'language_change', {
      event_category: 'Localization',
      event_label: `${fromLang}_to_${toLang}`,
      previous_language: fromLang,
      new_language: toLang,
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
    // Só inicializa se o utilizador já deu consentimento para analytics
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