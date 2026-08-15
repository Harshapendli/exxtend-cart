import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from 'react-hot-toast';

// Layout and Global components
import Navbar from './components/Navbar';
import CartSheet from './components/CartSheet';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Success from './pages/Success';
import Admin from './pages/Admin';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>(() => {
    const path = window.location.pathname.toLowerCase();
    if (path === '/admin') return 'admin';
    if (path === '/services') return 'services';
    if (path === '/about') return 'about';
    if (path === '/contact') return 'contact';
    if (path === '/success') return 'success';
    return 'home';
  });

  // Scroll to top on page/tab navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const renderActiveView = () => {
    switch (currentTab) {
      case 'home':
        return <Home onNavigate={setCurrentTab} />;
      case 'services':
        return <Services />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'success':
        return <Success onNavigate={setCurrentTab} />;
      case 'admin':
        return <Admin />;
      default:
        return <Home onNavigate={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-950 font-sans antialiased flex flex-col justify-between selection:bg-[#1D9E75]/20 selection:text-brand" id="app-container">
      {/* Toast Notification Manager */}
      <Toaster 
        position="bottom-left"
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#0a0a0a',
            border: '1px solid #f0f0f0',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            fontSize: '13px',
            fontWeight: '600',
            fontFamily: 'Inter, sans-serif'
          },
          success: {
            iconTheme: {
              primary: '#1D9E75',
              secondary: '#ffffff',
            },
          },
        }}
      />

      {/* Global Navigation Header - Hidden on Admin */}
      {currentTab !== 'admin' && <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />}

      {/* Main Page Area with Route Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer - Hidden on Admin and Success */}
      {currentTab !== 'success' && currentTab !== 'admin' && <Footer onNavigate={setCurrentTab} />}

      {/* Sliding shopping cart drawer - Hidden on Admin */}
      {currentTab !== 'admin' && <CartSheet onSuccessRedirect={() => setCurrentTab('success')} />}

      {/* Floating interactive WhatsApp agent - Hidden on Admin */}
      {currentTab !== 'admin' && <WhatsAppButton />}
    </div>
  );
}
