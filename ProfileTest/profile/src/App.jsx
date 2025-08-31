import React from 'react';
import { CustomThemeProvider } from './theme/ThemeContext';
import AppRouter from './router';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <CustomThemeProvider>
      <div className="App">
        <AppRouter />
      </div>
    </CustomThemeProvider>
  );
}

export default App;
