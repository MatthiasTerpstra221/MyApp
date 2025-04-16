import React, { useEffect, useRef, useState } from 'react';

const HubSpotFormModal = ({ isOpen, onClose, selectedPackages, onSuccess }) => {
  const formContainerRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  // If not open, don't render
  if (!isOpen) return null;

  // Create and inject the HubSpot form when the modal is opened
  useEffect(() => {
    if (!isOpen || !formContainerRef.current) return;

    // Clear any existing content
    formContainerRef.current.innerHTML = '';

    // Wait for HubSpot script to be ready
    const checkHubSpotLoaded = setInterval(() => {
      if (window.hbspt) {
        clearInterval(checkHubSpotLoaded);
        createForm();
      }
    }, 100);

    // Cleanup interval on unmount
    return () => {
      clearInterval(checkHubSpotLoaded);
    };
  }, [isOpen, formContainerRef.current]);

  // Create the HubSpot form
  const createForm = () => {
    if (!window.hbspt || !formContainerRef.current) return;

    // Prepare the package keys
    const packageKeys = selectedPackages.map(pkg => {
      // Format matches the spreadsheet: marketing_hub_starter_diy
      const hub = pkg.hub.toLowerCase().replace(/\s+/g, '_');
      const tier = pkg.tier.toLowerCase();
      const model = pkg.model.toLowerCase().replace(/\s+/g, '_');
      
      // Get model suffix (diy, dwme, difme)
      let modelSuffix = '';
      if (model.includes('yourself')) modelSuffix = 'diy';
      else if (model.includes('with_me')) modelSuffix = 'dwme';
      else if (model.includes('for_me')) modelSuffix = 'difme';
      
      return `${hub}_${tier}_${modelSuffix}`;
    }).join(';');

    console.log('Creating form with package keys:', packageKeys);

    // Create the form
    window.hbspt.forms.create({
      portalId: "7208949",
      formId: "699d6d6a-52b4-4439-b6ea-2584491b8baa",
      region: "na1",
      target: "#hubspotFormContainer",
      formData: {
        hubspot_standard_onboarding_key: packageKeys
      },
      onFormSubmit: function($form, data) {
        console.log("Form submitted with data:", data);
      },
      onFormSubmitted: function() {
        console.log("Form successfully submitted");
        setSubmitted(true);
        
        // Show the results after a short delay
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          }
          onClose();
        }, 1500);
      }
    });

    // Add global event listener for form submit - extra safety measure
    const originalSubmit = window.XMLHttpRequest.prototype.send;
    window.XMLHttpRequest.prototype.send = function() {
      // Watch for HubSpot form submissions
      if (this._url && this._url.includes('hubspot') && this._url.includes('forms')) {
        this.addEventListener('load', function() {
          if (this.status >= 200 && this.status < 300) {
            console.log("Detected successful form submission");
            setSubmitted(true);
            
            // Show the results after a short delay
            setTimeout(() => {
              if (onSuccess) {
                onSuccess();
              }
              onClose();
            }, 1500);
          }
        });
      }
      return originalSubmit.apply(this, arguments);
    };
  };

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
      
      // Restore original XMLHttpRequest
      if (window.originalSubmit) {
        window.XMLHttpRequest.prototype.send = window.originalSubmit;
      }
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
          aria-label="Close"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Modal title */}
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Get Your Custom HubSpot Onboarding Quote
        </h2>

        {/* HubSpot form container */}
        <div id="hubspotFormContainer" ref={formContainerRef} className="min-h-[250px]">
          <div className="flex items-center justify-center py-8">
            <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ml-2 text-gray-600">Loading form...</span>
          </div>
        </div>

        {/* Form status message */}
        {submitted && (
          <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded text-green-700 text-center">
            Form submitted successfully! Showing your results...
          </div>
        )}

        {/* Footer note */}
        <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500">
          <p>Your selected package(s) will be included in your request.</p>
        </div>
      </div>
    </div>
  );
};

export default HubSpotFormModal;
