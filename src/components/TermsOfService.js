import { motion } from 'framer-motion';
import { X, FileText, AlertTriangle, Scale, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TermsOfService = ({ isOpen, onClose }) => {
  const { language } = useLanguage();

  const termsContent = {
    pt: {
      title: 'Termos de Uso',
      lastUpdated: 'Última atualização: 24 de outubro de 2024',
      sections: [
        {
          icon: FileText,
          title: '1. Aceitação dos Termos',
          content: [
            'Ao aceder e utilizar este website, aceita estar vinculado a estes termos de uso',
            'Se não concordar com qualquer parte destes termos, não deve utilizar o website',
            'Reservamo-nos o direito de modificar estes termos a qualquer momento',
            'É da sua responsabilidade verificar periodicamente as atualizações'
          ]
        },
        {
          icon: Globe,
          title: '2. Utilização do Website',
          content: [
            'Este website destina-se a fornecer informações sobre os meus serviços profissionais',
            'É permitido navegar, visualizar e partilhar o conteúdo para fins pessoais e comerciais legítimos',
            'É proibido utilizar o website para atividades ilegais ou não autorizadas',
            'Não deve tentar hackear, danificar ou comprometer a segurança do website'
          ]
        },
        {
          icon: Scale,
          title: '3. Propriedade Intelectual',
          content: [
            'Todo o conteúdo do website (textos, imagens, código, design) é propriedade de Filipe Braga',
            'O código fonte está disponível publicamente no GitHub sob licença open source',
            'As imagens e textos estão protegidos por direitos de autor',
            'Pode partilhar links para o website, mas não reproduzir conteúdo sem autorização'
          ]
        },
        {
          icon: AlertTriangle,
          title: '4. Limitação de Responsabilidade',
          content: [
            'O website é fornecido "como está" sem garantias de qualquer tipo',
            'Não garantimos que o website estará sempre disponível ou livre de erros',
            'Não somos responsáveis por danos diretos ou indiretos resultantes do uso do website',
            'As informações do website são apenas para fins informativos'
          ]
        },
        {
          icon: FileText,
          title: '5. Contacto e Comunicação',
          content: [
            'O formulário de contacto destina-se apenas a comunicação profissional legítima',
            'Não utilize o formulário para spam, publicidade não solicitada ou conteúdo ofensivo',
            'Reservamo-nos o direito de não responder a mensagens inadequadas',
            'As respostas serão enviadas no prazo razoável durante horário comercial'
          ]
        }
      ],
      jurisdiction: {
        title: '6. Lei Aplicável',
        content: 'Estes termos são regidos pela lei portuguesa. Qualquer disputa será resolvida nos tribunais competentes de Portugal.'
      },
      modifications: {
        title: '7. Modificações',
        content: 'Podemos modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no website.'
      }
    },
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: October 24, 2024',
      sections: [
        {
          icon: FileText,
          title: '1. Acceptance of Terms',
          content: [
            'By accessing and using this website, you agree to be bound by these terms of use',
            'If you do not agree with any part of these terms, you should not use the website',
            'We reserve the right to modify these terms at any time',
            'It is your responsibility to periodically check for updates'
          ]
        },
        {
          icon: Globe,
          title: '2. Website Usage',
          content: [
            'This website is intended to provide information about my professional services',
            'You are allowed to browse, view and share content for legitimate personal and commercial purposes',
            'It is prohibited to use the website for illegal or unauthorized activities',
            'You must not attempt to hack, damage or compromise the security of the website'
          ]
        },
        {
          icon: Scale,
          title: '3. Intellectual Property',
          content: [
            'All website content (texts, images, code, design) is owned by Filipe Braga',
            'The source code is publicly available on GitHub under open source license',
            'Images and texts are protected by copyright',
            'You may share links to the website, but not reproduce content without authorization'
          ]
        },
        {
          icon: AlertTriangle,
          title: '4. Limitation of Liability',
          content: [
            'The website is provided "as is" without warranties of any kind',
            'We do not guarantee that the website will always be available or error-free',
            'We are not responsible for direct or indirect damages resulting from website use',
            'Website information is for informational purposes only'
          ]
        },
        {
          icon: FileText,
          title: '5. Contact and Communication',
          content: [
            'The contact form is intended only for legitimate professional communication',
            'Do not use the form for spam, unsolicited advertising or offensive content',
            'We reserve the right not to respond to inappropriate messages',
            'Responses will be sent within reasonable time during business hours'
          ]
        }
      ],
      jurisdiction: {
        title: '6. Applicable Law',
        content: 'These terms are governed by Portuguese law. Any dispute will be resolved in the competent courts of Portugal.'
      },
      modifications: {
        title: '7. Modifications',
        content: 'We may modify these terms at any time. Changes will take effect immediately upon publication on the website.'
      }
    }
  };

  const content = termsContent[language];

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

            {/* Jurisdiction Section */}
            <div className="border-l-4 border-green-500 pl-6">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="text-green-500" size={24} />
                <h3 className="text-xl font-semibold text-gray-900">{content.jurisdiction.title}</h3>
              </div>
              <p className="text-gray-700">{content.jurisdiction.content}</p>
            </div>

            {/* Modifications Section */}
            <div className="border-l-4 border-orange-500 pl-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-orange-500" size={24} />
                <h3 className="text-xl font-semibold text-gray-900">{content.modifications.title}</h3>
              </div>
              <p className="text-gray-700">{content.modifications.content}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TermsOfService;