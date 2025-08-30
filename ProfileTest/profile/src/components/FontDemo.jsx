import React from 'react';

const FontDemo = () => {
  return (
    <div className="font-demo-container p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center gradient-text">
        Font Sour Gummy Demo
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Default Font (Sour Gummy) */}
        <div className="card-modern">
          <h3 className="text-xl font-bold mb-4 text-primary-400">Default Font (Sour Gummy)</h3>
          <p className="text-base mb-2">
            This is regular text using Sour Gummy font family.
          </p>
          <p className="text-lg font-semibold mb-2">
            Sour Gummy Bold Text
          </p>
          <p className="text-sm text-gray-300">
            Small text in Sour Gummy font
          </p>
        </div>

        {/* Explicit Sour Gummy Class */}
        <div className="card-modern">
          <h3 className="text-xl font-bold mb-4 text-primary-400">Explicit Sour Gummy</h3>
          <p className="font-sour-gummy text-base mb-2">
            This text uses .font-sour-gummy class
          </p>
          <h4 className="font-sour-gummy text-lg font-bold mb-2">
            Heading with Sour Gummy
          </h4>
          <p className="font-sour-gummy text-sm text-gray-300">
            Small Sour Gummy text
          </p>
        </div>

        {/* Tailwind Sour Gummy */}
        <div className="card-modern">
          <h3 className="text-xl font-bold mb-4 text-primary-400">Tailwind Display Font</h3>
          <p className="font-display text-base mb-2">
            This uses font-display from Tailwind config
          </p>
          <h4 className="font-display text-lg font-bold mb-2">
            Display Font Heading
          </h4>
          <p className="font-display text-sm text-gray-300">
            Small display font text
          </p>
        </div>

        {/* Comparison with Inter */}
        <div className="card-modern">
          <h3 className="text-xl font-bold mb-4 text-primary-400">Inter Font</h3>
          <p className="font-inter text-base mb-2">
            This text uses Inter font for comparison
          </p>
          <h4 className="font-inter text-lg font-bold mb-2">
            Inter Bold Heading
          </h4>
          <p className="font-inter text-sm text-gray-300">
            Small Inter text
          </p>
        </div>

        {/* Monospace Font */}
        <div className="card-modern">
          <h3 className="text-xl font-bold mb-4 text-primary-400">Monospace Font</h3>
          <p className="font-fira-code text-base mb-2">
            const code = "Fira Code font";
          </p>
          <code className="font-mono text-sm bg-gray-800 px-2 py-1 rounded">
            console.log("Code snippet");
          </code>
        </div>

        {/* Font Weight Variations */}
        <div className="card-modern">
          <h3 className="text-xl font-bold mb-4 text-primary-400">Font Weights</h3>
          <p className="font-sour-gummy font-light text-base mb-1">
            Light (100-300)
          </p>
          <p className="font-sour-gummy font-normal text-base mb-1">
            Normal (400)
          </p>
          <p className="font-sour-gummy font-medium text-base mb-1">
            Medium (500)
          </p>
          <p className="font-sour-gummy font-semibold text-base mb-1">
            Semibold (600)
          </p>
          <p className="font-sour-gummy font-bold text-base mb-1">
            Bold (700)
          </p>
          <p className="font-sour-gummy font-extrabold text-base">
            Extra Bold (800-900)
          </p>
        </div>

      </div>

      <div className="mt-8 card-modern">
        <h3 className="text-2xl font-bold mb-4 text-center gradient-text">
          Sour Gummy Typography Showcase
        </h3>
        <div className="text-center space-y-4">
          <h1 className="font-sour-gummy text-6xl font-bold gradient-text">
            H1 Heading
          </h1>
          <h2 className="font-sour-gummy text-5xl font-bold text-white">
            H2 Heading
          </h2>
          <h3 className="font-sour-gummy text-4xl font-semibold text-gray-200">
            H3 Heading
          </h3>
          <p className="font-sour-gummy text-xl text-gray-300 max-w-3xl mx-auto">
            Sour Gummy is a playful, modern font that brings personality to your designs. 
            It works great for headings, body text, and creative elements. 
            The variable font technology allows for smooth weight transitions 
            from 100 to 900, giving you maximum flexibility in your typography.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400">
          Font successfully implemented! Sour Gummy is now your default font family.
        </p>
      </div>
    </div>
  );
};

export default FontDemo;
