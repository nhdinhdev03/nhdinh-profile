/**
 * Browser-specific optimizations for theme handling
 * Handles differences between Chrome, Edge, Firefox, Safari
 */

export class BrowserThemeOptimizer {
  constructor() {
    this.browser = this.detectBrowser();
    this.init();
  }

  detectBrowser() {
    const ua = navigator.userAgent;
    
    if (ua.includes('Edg/')) return 'edge';
    if (ua.includes('Chrome/') && !ua.includes('Edg/')) return 'chrome';
    if (ua.includes('Firefox/')) return 'firefox';
    if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'safari';
    
    return 'unknown';
  }

  init() {
    document.documentElement.setAttribute('data-browser', this.browser);
    this.applyBrowserSpecificOptimizations();
  }

  applyBrowserSpecificOptimizations() {
    switch (this.browser) {
      case 'edge':
        this.optimizeForEdge();
        break;
      case 'chrome':
        this.optimizeForChrome();
        break;
      case 'firefox':
        this.optimizeForFirefox();
        break;
      case 'safari':
        this.optimizeForSafari();
        break;
      default:
        // No specific optimizations for unknown browsers
        break;
    }
  }

  optimizeForEdge() {
    // Edge-specific fixes for dark mode consistency
    const style = document.createElement('style');
    style.textContent = `
      html[data-browser="edge"].dark {
        background-color: #0f172a !important;
      }
      
      html[data-browser="edge"].dark body {
        background-color: #0f172a !important;
      }
      
      /* Fix Edge's form control styling in dark mode */
      html[data-browser="edge"].dark input,
      html[data-browser="edge"].dark textarea,
      html[data-browser="edge"].dark select {
        background-color: #1e293b;
        border-color: #334155;
        color: #f8fafc;
      }
    `;
    document.head.appendChild(style);
  }

  optimizeForChrome() {
    // Chrome already handles dark mode well, minimal optimizations needed
    const style = document.createElement('style');
    style.textContent = `
      html[data-browser="chrome"] {
        /* Enhance Chrome's native dark mode support */
        color-scheme: light dark;
      }
      
      html[data-browser="chrome"].dark {
        /* Chrome-specific dark mode enhancements */
        color-scheme: dark;
      }
    `;
    document.head.appendChild(style);
  }

  optimizeForFirefox() {
    // Firefox-specific optimizations
    const style = document.createElement('style');
    style.textContent = `
      html[data-browser="firefox"].dark {
        /* Better scrollbar for Firefox */
        scrollbar-width: thin;
        scrollbar-color: #334155 #0f172a;
      }
      
      /* Firefox smooth scrolling enhancement */
      html[data-browser="firefox"] {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);
  }

  optimizeForSafari() {
    // Safari-specific optimizations
    const style = document.createElement('style');
    style.textContent = `
      html[data-browser="safari"] {
        /* Safari smooth transitions */
        -webkit-font-smoothing: antialiased;
      }
      
      html[data-browser="safari"].dark {
        /* Safari dark mode optimizations */
        -webkit-font-smoothing: subpixel-antialiased;
      }
    `;
    document.head.appendChild(style);
  }

  // Method to handle theme transitions more smoothly per browser
  handleThemeTransition(isDark) {
    const root = document.documentElement;
    
    switch (this.browser) {
      case 'edge':
        // Edge needs more aggressive background setting
        root.style.setProperty('--root-bg', isDark ? '#0f172a' : '#ffffff');
        document.body.style.backgroundColor = isDark ? '#0f172a' : '#ffffff';
        break;
        
      case 'chrome':
        // Chrome handles this well natively
        root.style.colorScheme = isDark ? 'dark' : 'light';
        break;
        
      case 'firefox':
        // Firefox benefits from explicit scrollbar color changes
        if (isDark) {
          root.style.scrollbarColor = '#334155 #0f172a';
        } else {
          root.style.scrollbarColor = '#cbd5e1 #f8fafc';
        }
        break;
        
      case 'safari':
        // Safari needs careful font smoothing adjustments
        root.style.webkitFontSmoothing = isDark ? 'subpixel-antialiased' : 'antialiased';
        break;
        
      default:
        // Fallback for unknown browsers
        root.style.colorScheme = isDark ? 'dark' : 'light';
        break;
    }
  }

  // Cleanup method
  cleanup() {
    document.documentElement.removeAttribute('data-browser');
  }
}

// Auto-initialize when imported
let optimizer = null;

export function initBrowserOptimizations() {
  if (typeof window !== 'undefined' && !optimizer) {
    optimizer = new BrowserThemeOptimizer();
  }
  return optimizer;
}

export function getBrowserOptimizer() {
  return optimizer;
}

export function handleBrowserThemeChange(isDark) {
  if (optimizer) {
    optimizer.handleThemeTransition(isDark);
  }
}
