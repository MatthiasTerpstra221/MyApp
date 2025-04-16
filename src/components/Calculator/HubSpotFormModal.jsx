import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';

const HubSpotFormModal = ({ isOpen, onClose, selectedPackages, onSuccess }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load HubSpot script dynamically
  useEffect(() => {
    if (!window.hbspt && !scriptLoaded) {
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/v2.js';
      script.async = true;
      script.onload = () => {
        console.log('HubSpot script loaded successfully');
        setScriptLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load HubSpot script');
      };
      document.head.appendChild(script);
    } else if (window.hbspt) {
      setScriptLoaded(true);
    }
  }, [scriptLoaded]);

  // Create form when modal is opened and script is loaded
  useEffect(() => {
    if (isOpen && (window.hbspt || scriptLoaded)) {
      // Clear any existing form
      const formContainer = document.getElementById('hubspotForm');
      if (formContainer) {
        formContainer.innerHTML = '';
      }

      // Generate package key string
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
      }).join(';'); // Use semicolon as separator instead of comma

      // Small delay to ensure script is fully initialized
      setTimeout(() => {
        if (window.hbspt) {
          console.log('Creating HubSpot form with package keys:', packageKeys);
          window.hbspt.forms.create({
            portalId: "7208949",
            formId: "699d6d6a-52b4-4439-b6ea-2584491b8baa",
            region: "na1",
            target: '#hubspotForm',
            formData: {
              hubspot_standard_onboarding_key: packageKeys
            },
            onFormSubmit: function($form, data) {
              console.log('Form submitted with data:', data);
            },
            onFormSubmitted: function() {
              console.log('Form submitted successfully');
              setTimeout(() => {
                if (onSuccess) onSuccess();
                onClose();
              }, 2000);
            }
          });
        } else {
          console.error("HubSpot forms script not loaded properly or not available");
        }
      }, 500);
    }
  }, [isOpen, selectedPackages, onClose, onSuccess, scriptLoaded]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
            Get Your Custom HubSpot Onboarding Quote
          </Dialog.Title>

          <div id="hubspotForm" className="hubspot-form-container">
            {!scriptLoaded && (
              <div className="text-center py-4">
                <p>Loading form...</p>
              </div>
            )}
            {/* HubSpot form will be injected here */}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default HubSpotFormModal;
