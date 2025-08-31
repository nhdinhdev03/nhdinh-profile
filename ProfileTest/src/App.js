import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import { Toaster } from 'react-hot-toast';

// Contexts
import { ThemeProvider } from './contexts/ThemeContext';

// Layout Components
import Layout from './components/Layout/Layout';

// Page Components
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Blog from './pages/Blog/Blog';
import Contact from './pages/Contact/Contact';

// Utilities
import ScrollToTop from './utils/ScrollToTop';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 100,
    });
  }, []);

  return (
    <ThemeProvider>
      <div className="App relative">
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
            },
          }}
        />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
