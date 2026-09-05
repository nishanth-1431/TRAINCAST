import React, { useEffect } from 'react';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  useEffect(() => {
    const savedScale = localStorage.getItem('traincast-font-scale');
    if (savedScale) {
      document.documentElement.style.setProperty('--font-scale', savedScale);
    }
  }, []);

  return (
    <div className="app">
      <AppRoutes />
    </div>
  );
}

export default App;
