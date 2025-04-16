import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

console.log("React index.js initializing...");

// Ensure fallbackUrl is defined
let fallbackUrl = window.location.origin + "/fallback.html";
if (window.fallbackUrl) {
  fallbackUrl = window.fallbackUrl;
}

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  
  console.log("React root created, rendering application...");
  
  // Mark app as loaded AFTER render completes successfully
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // Set a timeout to make sure the app is fully initialized
  setTimeout(() => {
    // Signal that React has initialized
    window.appLoaded = true;
    console.log("React app initialized successfully");
    
    // Hide loading screen
    if (document.getElementById('root-loading')) {
      document.getElementById('root-loading').style.display = 'none';
    }
  }, 100);
  
} catch (error) {
  console.error("Error initializing React app:", error);
  
  // Show error message
  if (document.getElementById('loading-spinner')) {
    document.getElementById('loading-spinner').style.display = 'none';
  }
  if (document.getElementById('error-message')) {
    document.getElementById('error-message').style.display = 'block';
  }
  
  // After 3 seconds, redirect to fallback
  setTimeout(() => {
    console.log("Redirecting to fallback page due to initialization error:", fallbackUrl);
    window.location.href = fallbackUrl;
  }, 3000);
}
