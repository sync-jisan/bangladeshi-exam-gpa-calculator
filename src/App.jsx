import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import CardNav from './components/CardNav';
import CalculatorPage from './components/CalculatorPage';
import HomePage from './components/HomePage';
import BgcAgentPage from './components/BgcAgentPage';
import ChatBot from './components/ChatBot';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ContactSupport from './components/ContactSupport';
import { translations } from './utils/translations';

function AppContent() {
  const location = useLocation();
  const isAiPage = location.pathname === '/bgc-agent-ai';

  // Initialize Lenis for Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Language state: 'en' (English) or 'bn' (Bangla)
  const [language, setLanguage] = useState('en');

  // Disable Inspect & Right-Click
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'j' || e.key.toLowerCase() === 'c')) ||
        (e.ctrlKey && e.key.toLowerCase() === 'u')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Translation helper function
  const t = useCallback((key) => {
    return translations[language][key] || key;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  };

  // Font class based on language
  const fontClass = language === 'bn' ? 'font-hind' : 'font-sans';

  return (
    <div className={`min-h-screen bg-white selection:bg-[#006a4e]/20 selection:text-[#006a4e] ${fontClass}`}>

      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{ backgroundImage: 'radial-gradient(#006a4e 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-10">
        {/* Navigation Bar */}
        <div className="mb-8">
          <CardNav
            logo="/bd-calculatorlogo.png"
            logoAlt="Bangladeshi GPA Calculator"
            logoHeight="50px"
            baseColor="#ffffff"
            menuColor="#006a4e"
            buttonBgColor="#f42a41"
            buttonTextColor="#fff"
            language={language}
            toggleLanguage={toggleLanguage}
            t={t}
            items={[
              {
                label: t('nav_jsc'),
                bgColor: "#006a4e",
                textColor: "#fff",
                links: [
                  { label: t('nav_calc_gpa'), href: "/jsc-gpa-calculator", ariaLabel: "Calculate JSC GPA" },
                  { label: t('nav_official_results'), href: "http://www.educationboardresults.gov.bd/", ariaLabel: "JSC Result" },
                  { label: t('res_link_ministry'), href: "https://moedu.gov.bd/", ariaLabel: "Ministry of Education" }
                ]
              },
              {
                label: t('nav_ssc'),
                bgColor: "#f42a41",
                textColor: "#fff",
                links: [
                  { label: t('nav_calc_gpa'), href: "/ssc-gpa-calculator", ariaLabel: "SSC GPA" },
                  { label: t('nav_official_results'), href: "http://www.educationboardresults.gov.bd/", ariaLabel: "SSC Result" },
                  { label: t('nav_scholarship'), href: "https://mcas.moedu.gov.bd/", ariaLabel: "Scholarship" }
                ]
              },
              {
                label: t('nav_hsc'),
                bgColor: "#1e293b",
                textColor: "#fff",
                links: [
                  { label: t('nav_calc_gpa'), href: "/hsc-gpa-calculator", ariaLabel: "HSC GPA" },
                  { label: t('nav_official_results'), href: "http://www.educationboardresults.gov.bd/", ariaLabel: "HSC Result" },
                  { label: t('nav_admission'), href: "https://xiclassadmission.gov.bd/", ariaLabel: "Admission" }
                ]
              },
              {
                label: t('nav_ai_assistant'),
                bgColor: "#0f172a",
                textColor: "#fff",
                links: [
                  { label: t('nav_bgc_agent'), href: "/bgc-agent-ai", ariaLabel: "BGC Agent AI" },
                  { label: "Community", href: "/bgc-agent-ai", ariaLabel: "Community" }
                ]
              }
            ]}
          />
        </div>

        <Routes>
          <Route path="/" element={<HomePage language={language} t={t} />} />
          <Route path="/ssc-gpa-calculator" element={
            <CalculatorPage examType="SSC" language={language} t={t} />
          } />
          <Route path="/jsc-gpa-calculator" element={
            <CalculatorPage examType="JSC" language={language} t={t} />
          } />
          <Route path="/hsc-gpa-calculator" element={
            <CalculatorPage examType="HSC" language={language} t={t} />
          } />
          <Route path="/bgc-agent-ai" element={<BgcAgentPage language={language} />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/contact" element={<ContactSupport />} />
        </Routes>

        {!isAiPage && <ChatBot language={language} />}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
