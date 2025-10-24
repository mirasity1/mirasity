import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const translations = {
  pt: {
    // Navigation
    nav: {
      home: 'Início',
      about: 'Sobre',
      skills: 'Competências',
      experience: 'Experiência',
      projects: 'Projetos',
      contact: 'Contacto'
    },
    // Hero Section
    hero: {
      greeting: '👋 Olá, eu sou',
      role: 'Full-Stack Developer especializado em',
      and: 'e',
      description: 'Criando soluções digitais completas do frontend ao backend',
      viewProjects: 'Ver Projetos',
      getInTouch: 'Entrar em Contacto'
    },
    // About Section
    about: {
      title: 'Sobre',
      subtitle: 'Mim',
      description: 'Full-Stack Developer apaixonado por criar soluções tecnológicas completas',
      greeting: 'Olá! Eu sou o Filipe Braga 👋',
      paragraph1: 'Sou um Full-Stack Developer de Portugal com experiência sólida em desenvolvimento web completo. Actualmente trabalho como',
      paragraph2: 'na Landbell Software, onde desenvolvo APIs em Laravel e trabalho com optimização de bases de dados SQL.',
      paragraph3: 'Tenho experiência em',
      paragraph4: 'desenvolvimento frontend e backend, administração de servidores, e integração de sistemas. Trabalhei anteriormente na Real Vida Seguros onde liderei implementações de melhorias estruturais e desenvolvi sistemas completos.',
      paragraph5: 'Desde suporte técnico a POS até desenvolvimento full-stack, tenho uma trajectória diversificada que me permite entender todas as camadas de um projecto tecnológico.',
      viewResume: 'Ver Currículo Completo',
      quickFacts: 'Factos Rápidos',
      location: '📍 Localização: Agualva-Cacém, Portugal',
      company: '💼 Empresa: Landbell Software S.A.',
      studying: '🎓 Formação: Técnico de Gestão e Programação de Sistemas Informáticos',
      fact: '⚡ Facto curioso: Do suporte POS ao desenvolvimento full-stack!',
      highlights: {
        frontend: {
          title: 'Full-Stack Developer',
          description: 'Especializado em React, Laravel, Python e desenvolvimento completo de aplicações'
        },
        agile: {
          title: 'APIs & Backend',
          description: 'Desenvolvimento de APIs em Laravel, optimização SQL e integração de sistemas'
        },
        learning: {
          title: 'Sempre a Evoluir',
          description: 'Da Real Vida Seguros à Landbell Software, sempre em crescimento técnico'
        },
        company: {
          title: 'Experiência Diversa',
          description: 'Desde suporte técnico a desenvolvimento, administração de servidores a consultoria'
        }
      }
    },
    // Skills Section
    skills: {
      title: 'Competências &',
      subtitle: 'Tecnologias',
      description: 'Tecnologias e ferramentas que domino para criar soluções completas',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend & Bases de Dados',
        tools: 'Ferramentas & DevOps',
        pm: 'Gestão de Projectos',
        design: 'Design & UI/UX',
        telecom: 'Telecomunicações & Sistemas'
      },
      alwaysLearning: 'Sempre a Aprender 📚',
      learningDescription: 'Actualmente a consolidar conhecimentos em React e TypeScript na Landbell Software, e sempre a explorar novas tecnologias para melhorar a qualidade dos projectos.'
    },
    // Experience Section
    experience: {
      title: 'Experiência',
      subtitle: 'Profissional',
      description: 'Trajectória profissional focada em tecnologias modernas e metodologias ágeis',
      current: 'Presente',
      remote: 'Remoto',
      fulltime: 'Tempo integral',
      freelance: 'Freelancer',
      education: 'Educação',
      methodologies: 'Metodologias &',
      tools: 'Ferramentas',
      positions: {
        landbell: {
          company: 'Landbell Software S.A.',
          position: 'Junior Developer',
          period: 'Nov 2024 - Presente',
          location: 'Lisboa, Portugal',
          type: 'Tempo integral',
          description: 'Desenvolvimento de APIs em backend utilizando Laravel e optimização de bases de dados.',
          highlights: [
            'Desenvolvimento de código para APIs em backend utilizando Laravel',
            'Configuração e optimização de queries SQL',
            'Utilização do Postman para testes e validação de APIs',
            'Documentação de funcionalidades e processos',
            'Trabalho em equipa com metodologias ágeis',
            'Manutenção e melhoria de sistemas existentes'
          ]
        },
        realvida: {
          company: 'Real Vida Seguros',
          position: 'Full-Stack Developer',
          period: 'Jul 2023 - Dez 2024',
          location: 'Lisboa, Portugal',
          type: 'Tempo integral',
          description: 'Desenvolvedor na equipa de marketing com experiência completa em stack tecnológica moderna.',
          highlights: [
            'Liderança na implementação de melhorias estruturais em páginas web',
            'Desenvolvimento de landing pages inovadoras',
            'Integração do Strapi (headless CMS) para optimizar operações',
            'Colaboração com equipa de marketing para UX',
            'Desenvolvimento de sistema de recepção de leads e relatórios',
            'Administração de servidores e infraestrutura'
          ]
        },
        hexsicor: {
          company: 'Hexsicor Unipessoal LDA',
          position: 'Full-Stack Developer',
          period: 'Jul 2022 - Mai 2023',
          location: 'Almada, Portugal',
          type: 'Tempo integral',
          description: 'Desenvolvimento de CRM para empresas de contact center com integração de sistemas de telecomunicações.',
          highlights: [
            'Desenvolvimento de CRM completo para contact centers',
            'Programação em Laravel, PHP, React, TypeScript',
            'Desenvolvimento com Next.js e Vue.js',
            'Integração com sistemas Freeswitch em Python e Lua',
            'Arquitectura de soluções completas',
            'Consultoria técnica especializada'
          ]
        },
        gasodata: {
          company: 'Gasodata',
          position: 'Técnico de Help Desk',
          period: 'Set 2021 - Jul 2022',
          location: 'Lisboa, Portugal',
          type: 'Tempo integral',
          description: 'Suporte técnico especializado em sistemas POS e assistência remota.',
          highlights: [
            'Resolução remota de problemas técnicos',
            'Apoio especializado a sistemas POS Dresser Wayne',
            'Atendimento e suporte a clientes',
            'Diagnóstico e resolução de falhas de sistema',
            'Manutenção preventiva e correctiva',
            'Documentação de procedimentos técnicos'
          ]
        },
        typing: {
          company: 'Typing Unipessoal LDA',
          position: 'Técnico de TIC',
          period: 'Set 2020 - Set 2021',
          location: 'Lisboa, Portugal',
          type: 'Tempo integral',
          description: 'Primeiro emprego com responsabilidades em programação e suporte técnico.',
          highlights: [
            'Programação de sistemas para Call Center',
            'Desenvolvimento de websites em Laravel',
            'Programação de aplicações em Vue.js',
            'Apoio técnico ao utilizador',
            'Manutenção de sistemas informáticos',
            'Desenvolvimento de soluções personalizadas'
          ]
        }
      },
      methodologyList: [
        {
          name: 'Scrum',
          description: 'Experiência com sprints, daily standups, retrospectivas'
        },
        {
          name: 'Kanban',
          description: 'Gestão visual de fluxo de trabalho e entrega contínua'
        },
        {
          name: 'Jira',
          description: 'Planeamento, acompanhamento e relatórios de projectos ágeis'
        },
        {
          name: 'Suite Atlassian',
          description: 'Bitbucket, Confluence e ferramentas de colaboração'
        }
      ]
    },
    // Projects Section
    projects: {
      title: 'Os Meus',
      subtitle: 'Projectos',
      description: 'Uma selecção dos melhores projectos que desenvolvi, mostrando diferentes tecnologias e soluções',
      completed: 'Concluído',
      inProgress: 'Em desenvolvimento',
      features: 'Funcionalidades:',
      viewProject: 'Ver Projecto',
      code: 'Código',
      callToAction: 'Gostaste do que viste? Vamos trabalhar juntos no teu próximo projecto!',
      startProject: 'Iniciar Projecto',
      categories: {
        web: 'Desenvolvimento Web',
        game: 'Desenvolvimento de Jogos',
        mobile: 'Desenvolvimento Mobile'
      },
      list: [
        {
          title: 'Advcatia - Sistema de Advocacia',
          description: 'Aplicação web completa para gestão de escritórios de advocacia com funcionalidades avançadas de gestão de casos, clientes e documentos.',
          category: 'Sistema de Gestão Jurídica',
          features: [
            'Gestão completa de casos jurídicos',
            'Sistema de clientes e contactos',
            'Gestão de documentos e contratos',
            'Dashboard analytics para advogados',
            'Sistema de agenda e compromissos',
            'Relatórios e estatísticas detalhadas',
            'Interface moderna e responsiva'
          ]
        },
        {
          title: 'Sistema de Leads - Real Vida Seguros',
          description: 'Sistema completo de recepção e gestão de leads com integração Strapi e relatórios avançados desenvolvido para a equipa de marketing.',
          category: 'Sistema de Gestão de Leads',
          features: [
            'Sistema de captura de leads automático',
            'Integração com Strapi headless CMS',
            'Relatórios e analytics avançados',
            'Dashboard para equipa de marketing',
            'Optimização de conversões',
            'Interface administrativa completa',
            'Gestão de campanhas de marketing'
          ]
        },
        {
          title: 'Real Vida Trip',
          description: 'Plataforma web para gestão de viagens da Real Vida Seguros com sistema completo de itinerários e conteúdo progressivo.',
          category: 'Plataforma de Viagens',
          features: [
            'Sistema de gestão de viagens completo',
            'Itinerários detalhados por dias',
            'Liberação progressiva de conteúdo',
            'Interface responsiva e moderna',
            'Integração com Strapi CMS',
            'Dashboard administrativo',
            'Gestão de grupos de viagem'
          ]
        },
        {
          title: 'Wein.plus',
          description: 'Colaboração no desenvolvimento de funcionalidades para plataforma de vinhos, incluindo sistema de emails automáticos para clientes e cron jobs.',
          category: 'Plataforma de Vinhos',
          features: [
            'Sistema de emails automáticos para clientes',
            'Implementação de cron jobs',
            'Gestão de notificações',
            'Integração com base de dados',
            'Optimização de performance',
            'Funcionalidades de backend',
            'Sistema de alertas personalizados'
          ]
        },
        {
          title: 'Real Business Center',
          description: 'Plataforma web empresarial completa desenvolvida para centro de negócios. Sistema robusto com gestão de utilizadores e funcionalidades administrativas avançadas.',
          category: 'Plataforma Empresarial',
          features: [
            'Sistema de gestão empresarial completo',
            'Dashboard administrativo avançado',
            'Gestão de utilizadores e permissões',
            'Interface moderna e responsiva',
            'Integração com sistemas de pagamento',
            'Relatórios e analytics detalhados'
          ]
        },
        {
          title: 'CRM Contact Center - Hexsicor',
          description: 'Sistema CRM desenvolvido para empresas de contact center entre 2022-2023. Apenas imagem demonstrativa, sem links ou código público.',
          category: 'CRM Empresarial (2022-2023)',
          features: [
            'CRM especializado para contact centers',
            'Gestão de campanhas e contactos',
            'Dashboard de performance em tempo real',
            'Sistema de relatórios avançados',
            'Projeto empresarial confidencial',
            'Apenas demonstração visual'
          ]
        }
      ]
    },
    // Contact Section
    // Contact Section
    contact: {
      title: 'Vamos',
      subtitle: 'Trabalhar Juntos',
      description: 'Tem um projeto em mente? Vamos conversar e criar algo incrível juntos!',
      info: 'Informações de Contato',
      infoDescription: 'Estou sempre disponível para discutir novos projetos, oportunidades criativas ou simplesmente para trocar ideias sobre tecnologia.',
      quickActions: 'Ações Rápidas',
      viewResume: 'Ver Currículo',
      downloadResume: 'Baixar Currículo',
      viewFullPortfolio: 'Ver Portfólio Completo',
      sendMessage: 'Envie uma Mensagem',
      form: {
        name: 'Nome',
        email: 'Email',
        subject: 'Assunto',
        message: 'Mensagem',
        namePlaceholder: 'Seu nome',
        emailPlaceholder: 'seu@email.com',
        subjectPlaceholder: 'Sobre o que você gostaria de falar?',
        messagePlaceholder: 'Conte-me sobre seu projeto ou ideia...',
        mathVerification: 'Verificação de Segurança',
        refreshMath: 'Gerar nova pergunta',
        sending: 'Enviando...',
        send: 'Enviar Mensagem',
        successMessage: 'Mensagem enviada com sucesso! Entrarei em contato em breve.',
        errorMessage: 'Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.',
        required: '*'
      },
      mathError: 'Resposta matemática incorreta. Tente novamente.',
      contactTypes: {
        email: 'Email',
        linkedin: 'LinkedIn',
        github: 'GitHub',
        location: 'Localização'
      },
      footer: '© 2024 Filipe Braga. Feito com ❤️ em Portugal usando React e Tailwind CSS.'
    },
    // Common
    common: {
      mainActivities: 'Principais actividades:',
      technologies: 'Tecnologias:',
      year: 'ano',
      years: 'anos'
    },
    // Cookies
    cookies: {
      title: 'Utilizamos Cookies',
      description: 'Este site utiliza cookies para melhorar a sua experiência de navegação, analisar o tráfego e personalizar conteúdo.',
      learnMore: 'Saiba mais',
      acceptAll: 'Aceitar Todos',
      rejectAll: 'Rejeitar Todos',
      customize: 'Personalizar',
      savePreferences: 'Guardar Preferências',
      settings: {
        title: 'Configurações de Cookies'
      },
      types: {
        necessary: {
          title: 'Cookies Necessários',
          description: 'Essenciais para o funcionamento básico do site. Não podem ser desativados.'
        },
        analytics: {
          title: 'Cookies de Análise',
          description: 'Ajudam-nos a entender como os visitantes interagem com o site.'
        },
        functional: {
          title: 'Cookies Funcionais',
          description: 'Melhoram a funcionalidade e personalização do site.'
        },
        marketing: {
          title: 'Cookies de Marketing',
          description: 'Usados para rastrear visitantes em sites para exibir anúncios relevantes.'
        }
      }
    }
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact'
    },
    // Hero Section
    hero: {
      greeting: '👋 Hello, I\'m',
      role: 'Full-Stack Developer specialized in',
      and: 'and',
      description: 'Creating complete digital solutions from frontend to backend',
      viewProjects: 'View Projects',
      getInTouch: 'Get In Touch'
    },
    // About Section
    about: {
      title: 'About',
      subtitle: 'Me',
      description: 'Full-Stack Developer passionate about creating complete technological solutions',
      greeting: 'Hello! I\'m Filipe Braga 👋',
      paragraph1: 'I\'m a Full-Stack Developer from Portugal with solid experience in complete web development. Currently working as',
      paragraph2: 'at Landbell Software, where I develop Laravel APIs and work with SQL database optimization.',
      paragraph3: 'I have experience in',
      paragraph4: 'frontend and backend development, server administration, and system integration. Previously worked at Real Vida Seguros where I led structural improvement implementations and developed complete systems.',
      paragraph5: 'From POS technical support to full-stack development, I have a diverse background that allows me to understand all layers of a technological project.',
      viewResume: 'View Full Resume',
      quickFacts: 'Quick Facts',
      location: '📍 Location: Agualva-Cacém, Portugal',
      company: '💼 Company: Landbell Software S.A.',
      studying: '🎓 Education: Computer Systems Management and Programming Technician',
      fact: '⚡ Fun fact: From POS support to full-stack development!',
      highlights: {
        frontend: {
          title: 'Full-Stack Developer',
          description: 'Specialized in React, Laravel, Python and complete application development'
        },
        agile: {
          title: 'APIs & Backend',
          description: 'Laravel API development, SQL optimization and system integration'
        },
        learning: {
          title: 'Always Evolving',
          description: 'From Real Vida Seguros to Landbell Software, always growing technically'
        },
        company: {
          title: 'Diverse Experience',
          description: 'From technical support to development, server administration to consulting'
        }
      }
    },
    // Skills Section
    skills: {
      title: 'Skills &',
      subtitle: 'Technologies',
      description: 'Technologies and tools I master to create complete solutions',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend & Databases',
        tools: 'Tools & DevOps',
        pm: 'Project Management',
        design: 'Design & UI/UX',
        telecom: 'Telecommunications & Systems'
      },
      alwaysLearning: 'Always Learning 📚',
      learningDescription: 'Currently consolidating knowledge in React and TypeScript at Landbell Software, and always exploring new technologies to improve project quality.'
    },
    // Experience Section
    experience: {
      title: 'Professional',
      subtitle: 'Experience',
      description: 'Professional journey focused on modern technologies and agile methodologies',
      current: 'Present',
      remote: 'Remote',
      fulltime: 'Full-time',
      freelance: 'Freelance',
      education: 'Education',
      methodologies: 'Methodologies &',
      tools: 'Tools',
      positions: {
        landbell: {
          company: 'Landbell Software S.A.',
          position: 'Junior Developer',
          period: 'Nov 2024 - Present',
          location: 'Lisbon, Portugal',
          type: 'Full-time',
          description: 'Backend API development using Laravel and database optimization.',
          highlights: [
            'Backend API development using Laravel',
            'SQL query configuration and optimization',
            'Postman usage for API testing and validation',
            'Feature and process documentation',
            'Team collaboration with agile methodologies',
            'Maintenance and improvement of existing systems'
          ]
        },
        realvida: {
          company: 'Real Vida Seguros',
          position: 'Full-Stack Developer',
          period: 'Jul 2023 - Dec 2024',
          location: 'Lisbon, Portugal',
          type: 'Full-time',
          description: 'Developer in marketing team with complete experience in modern tech stack.',
          highlights: [
            'Leadership in implementing structural web improvements',
            'Development of innovative landing pages',
            'Strapi (headless CMS) integration for operation optimization',
            'Collaboration with marketing team for UX',
            'Development of lead reception system and reports',
            'Server administration and infrastructure'
          ]
        },
        hexsicor: {
          company: 'Hexsicor Unipessoal LDA',
          position: 'Full-Stack Developer',
          period: 'Jul 2022 - May 2023',
          location: 'Almada, Portugal',
          type: 'Full-time',
          description: 'CRM development for contact center companies with telecommunications system integration.',
          highlights: [
            'Complete CRM development for contact centers',
            'Programming in Laravel, PHP, React, TypeScript',
            'Development with Next.js and Vue.js',
            'Freeswitch system integration in Python and Lua',
            'Complete solution architecture',
            'Specialized technical consulting'
          ]
        },
        gasodata: {
          company: 'Gasodata',
          position: 'Help Desk Technician',
          period: 'Sep 2021 - Jul 2022',
          location: 'Lisbon, Portugal',
          type: 'Full-time',
          description: 'Specialized technical support for POS systems and remote assistance.',
          highlights: [
            'Remote technical problem resolution',
            'Specialized support for Dresser Wayne POS systems',
            'Customer service and support',
            'System failure diagnosis and resolution',
            'Preventive and corrective maintenance',
            'Technical procedure documentation'
          ]
        },
        typing: {
          company: 'Typing Unipessoal LDA',
          position: 'ICT Technician',
          period: 'Sep 2020 - Sep 2021',
          location: 'Lisbon, Portugal',
          type: 'Full-time',
          description: 'First job with responsibilities in programming and technical support.',
          highlights: [
            'Call Center system programming',
            'Laravel website development',
            'Vue.js application programming',
            'User technical support',
            'IT system maintenance',
            'Custom solution development'
          ]
        }
      },
      methodologyList: [
        {
          name: 'Scrum',
          description: 'Experience with sprints, daily standups, retrospectives'
        },
        {
          name: 'Kanban',
          description: 'Visual workflow management and continuous delivery'
        },
        {
          name: 'Jira',
          description: 'Planning, tracking and reporting of agile projects'
        },
        {
          name: 'Atlassian Suite',
          description: 'Bitbucket, Confluence, and collaboration tools'
        }
      ]
    },
    // Projects Section
    projects: {
      title: 'My',
      subtitle: 'Projects',
      description: 'A selection of the best projects I\'ve developed, showcasing different technologies and solutions',
      completed: 'Completed',
      inProgress: 'In development',
      features: 'Features:',
      viewProject: 'View Project',
      code: 'Code',
      callToAction: 'Liked what you saw? Let\'s work together on your next project!',
      startProject: 'Start Project',
      categories: {
        web: 'Web Development',
        game: 'Game Development',
        mobile: 'Mobile Development'
      },
      list: [
        {
          title: 'Advcatia - Legal System',
          description: 'Complete web application for law firm management with advanced case, client and document management features.',
          category: 'Legal Management System',
          features: [
            'Complete legal case management',
            'Client and contact system',
            'Document and contract management',
            'Analytics dashboard for lawyers',
            'Schedule and appointment system',
            'Detailed reports and statistics',
            'Modern and responsive interface'
          ]
        },
        {
          title: 'Lead Management System - Real Vida Seguros',
          description: 'Complete lead reception and management system with Strapi integration and advanced reports developed for the marketing team.',
          category: 'Lead Management System',
          features: [
            'Automatic lead capture system',
            'Strapi headless CMS integration',
            'Advanced reports and analytics',
            'Dashboard for marketing team',
            'Conversion optimization',
            'Complete administrative interface',
            'Marketing campaign management'
          ]
        },
        {
          title: 'Real Vida Trip',
          description: 'Web platform for Real Vida Seguros travel management with complete itinerary system and progressive content.',
          category: 'Travel Platform',
          features: [
            'Complete travel management system',
            'Detailed day-by-day itineraries',
            'Progressive content release',
            'Responsive and modern interface',
            'Strapi CMS integration',
            'Administrative dashboard',
            'Travel group management'
          ]
        },
        {
          title: 'Wein.plus',
          description: 'Collaboration in developing features for wine platform, including automatic email system for clients and cron jobs.',
          category: 'Wine Platform',
          features: [
            'Automatic email system for clients',
            'Cron jobs implementation',
            'Notification management',
            'Database integration',
            'Performance optimization',
            'Backend functionalities',
            'Personalized alert system'
          ]
        },
        {
          title: 'Real Business Center',
          description: 'Complete business web platform developed for business center. Robust system with user management and advanced administrative features.',
          category: 'Business Platform',
          features: [
            'Complete business management system',
            'Advanced administrative dashboard',
            'User and permission management',
            'Modern and responsive interface',
            'Payment system integration',
            'Detailed reports and analytics'
          ]
        },
        {
          title: 'Contact Center CRM - Hexsicor',
          description: 'CRM system developed for contact center companies between 2022-2023. Image demonstration only, no links or public code.',
          category: 'Business CRM (2022-2023)',
          features: [
            'Specialized CRM for contact centers',
            'Campaign and contact management',
            'Real-time performance dashboard',
            'Advanced reporting system',
            'Confidential business project',
            'Visual demonstration only'
          ]
        }
      ]
    },
    // Contact Section
    contact: {
      title: 'Let\'s Work',
      subtitle: 'Together',
      description: 'Have a project in mind? Let\'s talk and create something amazing together!',
      info: 'Contact Information',
      infoDescription: 'I\'m always available to discuss new projects, creative opportunities or simply to exchange ideas about technology.',
      quickActions: 'Quick Actions',
      viewResume: 'View Resume',
      downloadResume: 'Download Resume',
      viewFullPortfolio: 'View Full Portfolio',
      sendMessage: 'Send a Message',
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'your@email.com',
        subjectPlaceholder: 'What would you like to talk about?',
        messagePlaceholder: 'Tell me about your project or idea...',
        mathVerification: 'Security Verification',
        refreshMath: 'Generate new question',
        sending: 'Sending...',
        send: 'Send Message',
        successMessage: 'Message sent successfully! I\'ll get back to you soon.',
        errorMessage: 'Error sending message. Please try again or contact me directly.',
        required: '*'
      },
      mathError: 'Incorrect math answer. Please try again.',
      contactTypes: {
        email: 'Email',
        linkedin: 'LinkedIn',
        github: 'GitHub',
        location: 'Location'
      },
      footer: '© 2024 Filipe Braga. Made with ❤️ in Portugal using React and Tailwind CSS.'
    },
    // Common
    common: {
      mainActivities: 'Main activities:',
      technologies: 'Technologies:',
      year: 'year',
      years: 'years'
    },
    // Cookies
    cookies: {
      title: 'We Use Cookies',
      description: 'This site uses cookies to improve your browsing experience, analyze traffic and personalize content.',
      learnMore: 'Learn more',
      acceptAll: 'Accept All',
      rejectAll: 'Reject All',
      customize: 'Customize',
      savePreferences: 'Save Preferences',
      settings: {
        title: 'Cookie Settings'
      },
      types: {
        necessary: {
          title: 'Necessary Cookies',
          description: 'Essential for basic site functionality. Cannot be disabled.'
        },
        analytics: {
          title: 'Analytics Cookies',
          description: 'Help us understand how visitors interact with the site.'
        },
        functional: {
          title: 'Functional Cookies',
          description: 'Improve site functionality and personalization.'
        },
        marketing: {
          title: 'Marketing Cookies',
          description: 'Used to track visitors across sites to display relevant ads.'
        }
      }
    }
  }
};

export const LanguageProvider = ({ children }) => {
  // Detectar idioma do browser
  const getBrowserLanguage = () => {
    const browserLang = navigator.language || navigator.languages[0];
    return browserLang.startsWith('pt') ? 'pt' : 'en';
  };

  const [language, setLanguage] = useState(getBrowserLanguage);

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      toggleLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};