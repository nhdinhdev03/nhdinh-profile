import React from 'react';

// Utility to protect form fields from browser extensions
export const protectFromExtensions = () => {
  // Disable QuillBot on all text inputs and textareas
  const disableQuillBot = () => {
    const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
    textInputs.forEach(input => {
      // Add attributes to disable various extensions
      input.setAttribute('data-quillbot-extension', 'false');
      input.setAttribute('data-grammalecte-disabled', 'true');
      input.setAttribute('data-grammarly-reactwrapper-ignore', 'true');
      input.setAttribute('data-enable-grammarly', 'false');
      input.setAttribute('spellcheck', 'false');
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('autocorrect', 'off');
      input.setAttribute('autocapitalize', 'off');
      
      // Prevent extension scripts from interfering
      input.addEventListener('focus', (e) => {
        e.stopImmediatePropagation();
      }, true);
      
      input.addEventListener('input', (e) => {
        e.stopImmediatePropagation();
      }, true);
    });
  };

  // Run immediately and on DOM changes
  disableQuillBot();
  
  // Watch for dynamically added elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        disableQuillBot();
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  return () => observer.disconnect();
};

// Hook for React components
export const useExtensionProtection = () => {
  React.useEffect(() => {
    const cleanup = protectFromExtensions();
    return cleanup;
  }, []);
};

// Component wrapper to protect form fields
export const ExtensionProtectedForm = ({ children, ...props }) => {
  const formRef = React.useRef(null);
  
  React.useEffect(() => {
    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.setAttribute('data-quillbot-extension', 'false');
        input.setAttribute('data-grammarly-reactwrapper-ignore', 'true');
        input.setAttribute('data-enable-grammarly', 'false');
        input.setAttribute('spellcheck', 'false');
      });
    }
  }, [children]);
  
  return (
    <form ref={formRef} {...props}>
      {children}
    </form>
  );
};
