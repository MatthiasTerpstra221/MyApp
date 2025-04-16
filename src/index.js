import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // Signal that React has initialized
  window.onAppInit = true;
  console.log("React app initialized successfully");
} catch (error) {
  console.error("Error initializing React app:", error);
  // Show fallback content if available
  const fallbackContent = document.getElementById('fallback-content');
  if (fallbackContent) {
    fallbackContent.style.display = 'flex';
  }
}
