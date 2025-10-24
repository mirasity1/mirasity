import { motion } from 'framer-motion';
import { X, Shield, Eye, Database, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const PrivacyPolicy = ({ isOpen, onClose }) => {
  const { language } = useLanguage();

  const privacyContent = {
    pt: {
      title: 'Política de Privacidade',
      lastUpdated: 'Última atualização: 24 de outubro de 2024',
      sections: [
        {
          icon: Shield,
          title: '1. Informações que Coletamos',
          content: [
            'Informações de contato fornecidas voluntariamente através do formulário (nome, email, assunto, mensagem)',
            'Dados de navegação através do Google Analytics (páginas visitadas, tempo de permanência, origem do tráfego)',
            'Informações técnicas (endereço IP, tipo de navegador, dispositivo utilizado)',
            'Cookies e tecnologias similares para melhorar a experiência do utilizador'
          ]
        },
        {
          icon: Eye,
          title: '2. Como Utilizamos as Informações',
          content: [
            'Responder às suas mensagens e pedidos de contacto',
            'Melhorar o nosso website e experiência do utilizador',
            'Analisar o tráfego e comportamento no site',
            'Cumprir obrigações legais e regulamentares',
            'Prevenir fraudes e garantir a segurança do site'
          ]
        },
        {
          icon: Database,
          title: '3. Partilha de Informações',
          content: [
            'Não vendemos, alugamos ou partilhamos informações pessoais com terceiros',
            'Podemos partilhar dados com prestadores de serviços (Google Analytics, serviços de email)',
            'Informações podem ser divulgadas se exigido por lei',
            'Todos os prestadores de serviços estão vinculados a acordos de confidencialidade'
          ]
        },
        {
          icon: Shield,
          title: '4. Segurança dos Dados',
          content: [
            'Utilizamos medidas de segurança técnicas e organizacionais apropriadas',
            'Comunicação encriptada (HTTPS) em todo o website',
            'Acesso restrito aos dados pessoais apenas ao pessoal autorizado',
            'Revisões regulares das nossas práticas de segurança'
          ]
        },
        {
          icon: Mail,
          title: '5. Os Seus Direitos (RGPD)',
          content: [
            'Direito de acesso às suas informações pessoais',
            'Direito de retificação de dados incorretos',
            'Direito de apagamento ("direito ao esquecimento")',
            'Direito de portabilidade dos dados',
            'Direito de oposição ao tratamento',
            'Direito de limitação do tratamento'
          ]
        }
      ],
      contact: {
        title: '6. Contacto',
        content: 'Para exercer os seus direitos ou esclarecer dúvidas sobre esta política, contacte-nos através de filipe.ac.braga@gmail.com'
      },
      cookies: {
        title: '7. Cookies',
        content: 'Utilizamos cookies essenciais para o funcionamento do site e cookies de análise (Google Analytics) para melhorar a experiência. Pode gerir as suas preferências através do banner de cookies.'
      }
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: October 24, 2024',
      sections: [
        {
          icon: Shield,
          title: '1. Information We Collect',
          content: [
            'Contact information voluntarily provided through the contact form (name, email, subject, message)',
            'Navigation data through Google Analytics (pages visited, time spent, traffic source)',
            'Technical information (IP address, browser type, device used)',
            'Cookies and similar technologies to improve user experience'
          ]
        },
        {
          icon: Eye,
          title: '2. How We Use Information',
          content: [
            'Respond to your messages and contact requests',
            'Improve our website and user experience',
            'Analyze traffic and behavior on the site',
            'Comply with legal and regulatory obligations',
            'Prevent fraud and ensure site security'
          ]
        },
        {
          icon: Database,
          title: '3. Information Sharing',
          content: [
            'We do not sell, rent or share personal information with third parties',
            'We may share data with service providers (Google Analytics, email services)',
            'Information may be disclosed if required by law',
            'All service providers are bound by confidentiality agreements'
          ]
        },
        {
          icon: Shield,
          title: '4. Data Security',
          content: [
            'We use appropriate technical and organizational security measures',
            'Encrypted communication (HTTPS) throughout the website',
            'Restricted access to personal data only to authorized personnel',
            'Regular reviews of our security practices'
          ]
        },
        {
          icon: Mail,
          title: '5. Your Rights (GDPR)',
          content: [
            'Right of access to your personal information',
            'Right to rectification of incorrect data',
            'Right to erasure ("right to be forgotten")',
            'Right to data portability',
            'Right to object to processing',
            'Right to restriction of processing'
          ]
        }
      ],
      contact: {
        title: '6. Contact',
        content: 'To exercise your rights or clarify doubts about this policy, contact us at filipe.ac.braga@gmail.com'
      },
      cookies: {
        title: '7. Cookies',
        content: 'We use essential cookies for site functionality and analytics cookies (Google Analytics) to improve experience. You can manage your preferences through the cookie banner.'
      }
    }
  };

  const content = privacyContent[language];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{content.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <p className="text-sm text-gray-600 mb-6">{content.lastUpdated}</p>

          <div className="space-y-8">
            {content.sections.map((section, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-6">
                <div className="flex items-center gap-3 mb-4">
                  <section.icon className="text-blue-500" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-500 mt-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Section */}
            <div className="border-l-4 border-green-500 pl-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="text-green-500" size={24} />
                <h3 className="text-xl font-semibold text-gray-900">{content.contact.title}</h3>
              </div>
              <p className="text-gray-700">{content.contact.content}</p>
            </div>

            {/* Cookies Section */}
            <div className="border-l-4 border-orange-500 pl-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-orange-500" size={24} />
                <h3 className="text-xl font-semibold text-gray-900">{content.cookies.title}</h3>
              </div>
              <p className="text-gray-700">{content.cookies.content}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyPolicy;