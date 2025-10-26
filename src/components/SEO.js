import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

const SEO = ({ 
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  section = ''
}) => {
  const { language } = useLanguage();

  // Dados padrão do site
  const siteData = {
    pt: {
      siteName: 'Filipe Braga - Full-Stack Developer',
      defaultTitle: 'Filipe Braga - Full-Stack Developer | React, Laravel, Python',
      defaultDescription: 'Full-Stack Developer de Portugal especializado em React, Laravel e Python. Desenvolvimento web completo, APIs e soluções digitais inovadoras.',
      defaultKeywords: 'full-stack developer, react developer, laravel developer, python developer, desenvolvimento web, programador portugal, filipe braga, frontend, backend, api development',
      author: 'Filipe Braga',
      locale: 'pt_PT'
    },
    en: {
      siteName: 'Filipe Braga - Full-Stack Developer',
      defaultTitle: 'Filipe Braga - Full-Stack Developer | React, Laravel, Python',
      defaultDescription: 'Full-Stack Developer from Portugal specialized in React, Laravel and Python. Complete web development, APIs and innovative digital solutions.',
      defaultKeywords: 'full-stack developer, react developer, laravel developer, python developer, web development, programmer portugal, filipe braga, frontend, backend, api development',
      author: 'Filipe Braga',
      locale: 'en_US'
    }
  };

  const currentSiteData = siteData[language];
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://mirasity.pt';
  const currentUrl = url ? `${siteUrl}${url}` : siteUrl;
  // Usar imagem OG otimizada (1200x630) baseada na main.jpeg
  const currentImage = image || `${siteUrl}/images/og-main.jpeg`;

  // Structured Data para Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Filipe Braga",
    "jobTitle": "Full-Stack Developer",
    "description": currentSiteData.defaultDescription,
    "url": siteUrl,
    "sameAs": [
      "https://linkedin.com/in/filipe-braga",
      "https://github.com/mirasity1",
      "https://twitter.com/filipebraga"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Landbell Software S.A."
    },
    "knowsAbout": [
      "React",
      "Laravel",
      "Python",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Full-Stack Development",
      "Web Development",
      "API Development"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Agualva-Cacém",
      "addressCountry": "Portugal"
    }
  };

  return (
    <Helmet>
      {/* Título da página */}
      <title>{title ? `${title} | ${currentSiteData.siteName}` : currentSiteData.defaultTitle}</title>
      
      {/* Meta tags básicas */}
      <meta name="description" content={description || currentSiteData.defaultDescription} />
      <meta name="keywords" content={keywords || currentSiteData.defaultKeywords} />
      <meta name="author" content={currentSiteData.author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={language} />
      <meta name="revisit-after" content="7 days" />
      
      {/* Viewport e mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || currentSiteData.defaultTitle} />
      <meta property="og:description" content={description || currentSiteData.defaultDescription} />
      <meta property="og:image" content={currentImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={currentSiteData.siteName} />
      <meta property="og:locale" content={currentSiteData.locale} />
      {language === 'pt' && <meta property="og:locale:alternate" content="en_US" />}
      {language === 'en' && <meta property="og:locale:alternate" content="pt_PT" />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@filipebraga" />
      <meta name="twitter:title" content={title || currentSiteData.defaultTitle} />
      <meta name="twitter:description" content={description || currentSiteData.defaultDescription} />
      <meta name="twitter:image" content={currentImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Hreflang para idiomas */}
      <link rel="alternate" hreflang="pt" href={`${siteUrl}${url || ''}`} />
      <link rel="alternate" hreflang="en" href={`${siteUrl}/en${url || ''}`} />
      <link rel="alternate" hreflang="x-default" href={`${siteUrl}${url || ''}`} />
      
      {/* Preconnect para performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="192x192" href="/logo192.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Theme color */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Google Site Verification - DESCOMENTAR E ADICIONAR SEU CÓDIGO */}
      {/* 
        1. Acesse: https://search.google.com/search-console
        2. Adicione sua propriedade (mirasity.pt)
        3. Escolha "HTML tag" como método de verificação
        4. Copie o código e descomente a linha abaixo:
      */}
      <meta name="google-site-verification" content="CP3raxXK4mrP1QHZ78jdJfLql4zPVZTDVhoF3ZAtchs" />
      
      {/* Bing Site Verification - DESCOMENTAR E ADICIONAR SEU CÓDIGO */}
      {/* 
        1. Acesse: https://www.bing.com/webmasters/
        2. Adicione seu site
        3. Copie o código e descomente a linha abaixo:
      */}
      {/* <meta name="msvalidate.01" content="your-verification-code" /> */}
    </Helmet>
  );
};

export default SEO;