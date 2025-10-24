import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SEO from './components/SEO';
import GoogleAnalytics from './components/GoogleAnalytics';
import CookieConsent from './components/CookieConsent';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <div className="App">
          <SEO />
          <GoogleAnalytics />
          <Navigation />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
          <CookieConsent />
        </div>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
