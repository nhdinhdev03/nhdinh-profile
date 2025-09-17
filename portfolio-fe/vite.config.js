import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'assets': path.resolve(__dirname, './src/assets'),
      'router': path.resolve(__dirname, './src/router'),
      'components': path.resolve(__dirname, './src/components'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'layouts': path.resolve(__dirname, './src/Layouts'),
      'pages': path.resolve(__dirname, './src/pages'),
      'styles': path.resolve(__dirname, './src/styles')
    }
  },
  server: {
    host: true, // Expose to network
    port: 5173,
    strictPort: false,
    open: false
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: false,
    open: false
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // Use modern Dart Sass API
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Performance optimizations
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    // Using default esbuild minifier (removed explicit 'terser' to avoid optional dependency build error)
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          router: ['react-router-dom'],
          i18n: ['react-i18next', 'i18next'],
          icons: ['react-icons'],
          utils: ['react-intersection-observer']
        },
        // Optimize chunk file names
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(assetInfo.name)) {
            return `media/[name]-[hash].${extType}`;
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return `img/[name]-[hash].${extType}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return `fonts/[name]-[hash].${extType}`;
          }
          return `assets/[name]-[hash].${extType}`;
        }
      }
    }
  },
  // Performance optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'react-i18next'
    ]
  }
})
