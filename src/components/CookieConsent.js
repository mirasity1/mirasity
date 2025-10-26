import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { initGA } from './GoogleAnalytics';

const CookieConsent = () => {
  const { t } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Sempre true, não pode ser desativado
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    // Verificar se o utilizador já deu consentimento
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const preferences = JSON.parse(consent);
      setCookiePreferences(preferences);
      
      // Inicializar Google Analytics se o utilizador consentiu
      if (preferences.analytics) {
        initGA();
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    
    setCookiePreferences(preferences);
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
    
    // Inicializar Google Analytics
    initGA();
  };

  const handleRejectAll = () => {
    const preferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    
    setCookiePreferences(preferences);
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(cookiePreferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
    setShowSettings(false);
    
    // Inicializar Google Analytics se consentido
    if (cookiePreferences.analytics) {
      initGA();
    }
  };

  const handlePreferenceChange = (type) => {
    if (type === 'necessary') return; // Não pode ser desativado
    
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const cookieTypes = {
    necessary: {
      title: t.cookies?.types?.necessary?.title || 'Cookies Necessários',
      description: t.cookies?.types?.necessary?.description || 'Essenciais para o funcionamento básico do site. Não podem ser desativados.',
      examples: 'Sessão, preferências de idioma, consentimento de cookies'
    },
    analytics: {
      title: t.cookies?.types?.analytics?.title || 'Cookies de Análise',
      description: t.cookies?.types?.analytics?.description || 'Ajudam-nos a entender como os visitantes interagem com o site.',
      examples: 'Google Analytics, métricas de performance'
    },
    functional: {
      title: t.cookies?.types?.functional?.title || 'Cookies Funcionais',
      description: t.cookies?.types?.functional?.description || 'Melhoram a funcionalidade e personalização do site.',
      examples: 'Preferências de tema, configurações de formulário'
    },
    marketing: {
      title: t.cookies?.types?.marketing?.title || 'Cookies de Marketing',
      description: t.cookies?.types?.marketing?.description || 'Usados para rastrear visitantes em sites para exibir anúncios relevantes.',
      examples: 'Remarketing, publicidade direcionada'
    }
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
        >
          <div className="max-w-7xl mx-auto p-4">
            {!showSettings ? (
              // Banner principal
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <Cookie className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t.cookies?.title || 'Utilizamos Cookies'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t.cookies?.description || 'Este site utiliza cookies para melhorar a sua experiência de navegação, analisar o tráfego e personalizar conteúdo. '}
                      <button
                        onClick={() => setShowSettings(true)}
                        className="text-blue-600 hover:text-blue-800 underline"
                        aria-label="Saber mais sobre cookies"
                      >
                        {t.cookies?.learnMore || 'Saiba mais'}
                      </button>
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                  <button
                    onClick={handleRejectAll}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {t.cookies?.rejectAll || 'Rejeitar Todos'}
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
                  >
                    <Settings size={16} />
                    {t.cookies?.customize || 'Personalizar'}
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {t.cookies?.acceptAll || 'Aceitar Todos'}
                  </button>
                </div>
              </div>
            ) : (
              // Configurações detalhadas
              <div className="max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t.cookies?.settings?.title || 'Configurações de Cookies'}
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-4 mb-6">
                  {Object.entries(cookieTypes).map(([type, info]) => (
                    <div key={type} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{info.title}</h4>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={cookiePreferences[type]}
                            onChange={() => handlePreferenceChange(type)}
                            disabled={type === 'necessary'}
                            className="sr-only peer"
                          />
                          <div className={`relative w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 ${
                            cookiePreferences[type] 
                              ? 'bg-blue-600' 
                              : 'bg-gray-200'
                          } ${type === 'necessary' ? 'opacity-50 cursor-not-allowed' : ''} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{info.description}</p>
                      <p className="text-xs text-gray-500">
                        <strong>Exemplos:</strong> {info.examples}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleRejectAll}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {t.cookies?.rejectAll || 'Rejeitar Todos'}
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Check size={16} />
                    {t.cookies?.savePreferences || 'Guardar Preferências'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;