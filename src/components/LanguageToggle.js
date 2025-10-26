import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackLanguageChange } from './GoogleAnalytics';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  const handleLanguageToggle = () => {
    const newLanguage = language === 'pt' ? 'en' : 'pt';
    trackLanguageChange(language, newLanguage);
    toggleLanguage();
  };

  return (
    <motion.button
      onClick={handleLanguageToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-all duration-300 text-gray-300 hover:text-white"
      title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      <Globe size={18} />
      <div className="flex items-center space-x-2">
        <div className={`flex items-center space-x-1 px-2 py-1 rounded transition-all duration-300 ${
          language === 'pt' ? 'bg-green-500/20 text-green-400' : 'text-gray-500'
        }`}>
          <span className="text-sm font-medium">🇵🇹</span>
          <span className="text-xs font-medium">PT</span>
        </div>
        <div className="text-gray-400">|</div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded transition-all duration-300 ${
          language === 'en' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-500'
        }`}>
          <span className="text-sm font-medium">🇬🇧</span>
          <span className="text-xs font-medium">EN</span>
        </div>
      </div>
    </motion.button>
  );
};

export default LanguageToggle;