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
  window.appLoaded = true;
  console.log("React app initialized successfully");
} catch (error) {
  console.error("Error initializing React app:", error);
  
  // Show error message
  if (document.getElementById('loading-spinner')) {
    document.getElementById('loading-spinner').style.display = 'none';
  }
  if (document.getElementById('error-message')) {
    document.getElementById('error-message').style.display = 'block';
  }
}
