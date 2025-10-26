import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, MapPin, Linkedin, Github, Shield, FileText, Cookie } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';

const Footer = () => {
  const { language } = useLanguage();
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    pt: {
      contact: 'Contacto',
      legal: 'Legal',
      privacy: 'Política de Privacidade',
      terms: 'Termos de Uso',
      cookies: 'Preferências de Cookies',
      madeWith: 'Feito com',
      by: 'por',
      location: 'Agualva-Cacém, Portugal'
    },
    en: {
      contact: 'Contact',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Preferences',
      madeWith: 'Made with',
      by: 'by',
      location: 'Agualva-Cacém, Portugal'
    }
  };

  const text = footerLinks[language];

  const handleCookieSettings = () => {
    // Remove o consentimento atual para mostrar o banner novamente
    localStorage.removeItem('cookieConsent');
    window.location.reload();
  };

  return (
    <>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-400">{text.contact}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-blue-400" />
                    <a 
                      href="mailto:filipe.ac.braga@gmail.com" 
                      className="hover:text-blue-400 transition-colors"
                    >
                      filipe.ac.braga@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-blue-400" />
                    <span>{text.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-400">Social</h3>
                <div className="flex gap-4">
                  <motion.a
                    href="https://linkedin.com/in/filipe-braga"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="Perfil LinkedIn de Filipe Braga"
                  >
                    <Linkedin size={20} />
                  </motion.a>
                  <motion.a
                    href="https://github.com/mirasity1"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="Perfil GitHub de Filipe Braga"
                  >
                    <Github size={20} />
                  </motion.a>
                </div>
              </div>

              {/* Legal Links */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-400">{text.legal}</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setShowPrivacyPolicy(true)}
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
                    aria-label="Ver política de privacidade"
                  >
                    <Shield size={16} />
                    {text.privacy}
                  </button>
                  <button
                    onClick={() => setShowTermsOfService(true)}
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
                    aria-label="Ver termos de serviço"
                  >
                    <FileText size={16} />
                    {text.terms}
                  </button>
                  <button
                    onClick={handleCookieSettings}
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <Cookie size={16} />
                    {text.cookies}
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Copyright */}
                <div className="flex items-center gap-2 text-gray-400">
                  <span>© {currentYear} Filipe Braga. </span>
                  <span className="flex items-center gap-1">
                    {text.madeWith} <Heart size={16} className="text-red-500" /> {text.by} Filipe Braga
                  </span>
                </div>

                {/* Tech Stack */}
                <div className="text-gray-400 text-sm">
                  React • Tailwind CSS • Framer Motion
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PrivacyPolicy 
        isOpen={showPrivacyPolicy} 
        onClose={() => setShowPrivacyPolicy(false)} 
      />
      <TermsOfService 
        isOpen={showTermsOfService} 
        onClose={() => setShowTermsOfService(false)} 
      />
    </>
  );
};

export default Footer;