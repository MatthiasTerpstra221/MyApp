import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';

const HubSpotFormModal = ({ isOpen, onClose, selectedPackages, onSuccess }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [formLoading, setFormLoading] = useState(true);
  const [formError, setFormError] = useState(false);

  // Load HubSpot script dynamically
  useEffect(() => {
    const loadHubspotScript = () => {
      if (!window.hbspt && !document.getElementById('hubspot-form-script')) {
        const script = document.createElement('script');
        script.id = 'hubspot-form-script';
        script.src = 'https://js.hsforms.net/forms/v2.js';
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          console.log('HubSpot script loaded successfully');
          setScriptLoaded(true);
          setFormLoading(false);
        };
        
        script.onerror = () => {
          console.error('Failed to load HubSpot script');
          setFormError(true);
          setFormLoading(false);
        };
        
        document.head.appendChild(script);
      } else if (window.hbspt) {
        console.log('HubSpot script already exists');
        setScriptLoaded(true);
        setFormLoading(false);
      }
    };

    if (isOpen) {
      loadHubspotScript();
    }
  }, [isOpen]);

  // Create form when modal is opened and script is loaded
  useEffect(() => {
    const createHubspotForm = () => {
      if (!isOpen || !scriptLoaded || !window.hbspt) {
        return;
      }

      // Clear any existing form
      const formContainer = document.getElementById('hubspotForm');
      if (formContainer) {
        formContainer.innerHTML = '';
      }

      setFormLoading(true);

      try {
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

        console.log('Creating HubSpot form with package keys:', packageKeys);
        console.log('HubSpot object available:', !!window.hbspt);
        console.log('Target element exists:', !!document.getElementById('hubspotForm'));
        
        // Create the form using hbspt
        window.hbspt.forms.create({
          portalId: "7208949",
          formId: "699d6d6a-52b4-4439-b6ea-2584491b8baa",
          region: "na1",
          target: '#hubspotForm',
          formData: {
            hubspot_standard_onboarding_key: packageKeys
          },
          onFormReady: function() {
            console.log('Form is ready');
            setFormLoading(false);
          },
          onFormSubmit: function($form, data) {
            console.log('Form submitted with data:', data);
          },
          onFormSubmitted: function() {
            console.log('Form submitted successfully');
            if (onSuccess) {
              setTimeout(() => {
                onSuccess();
                onClose();
              }, 1000);
            }
          },
          onFormError: function(error) {
            console.error('Form error:', error);
            setFormError(true);
            setFormLoading(false);
          }
        });
      } catch (error) {
        console.error('Error creating HubSpot form:', error);
        setFormError(true);
        setFormLoading(false);
      }
    };

    // Small delay to ensure script is fully initialized
    if (isOpen && scriptLoaded) {
      const timer = setTimeout(() => {
        createHubspotForm();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedPackages, onClose, onSuccess, scriptLoaded]);

  const handleOpenInNewTab = () => {
    // Direct link to HubSpot form
    const url = `https://info.leapforce.nl/hubspot-onboarding-quote`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg max-w-md w-full mx-auto p-6">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close"
            >
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

          {formError ? (
            <div className="text-center py-6">
              <p className="text-red-600 mb-4">We encountered an issue loading the form.</p>
              <button
                onClick={handleOpenInNewTab}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Open Form in New Tab
              </button>
            </div>
          ) : (
            <div>
              <div id="hubspotForm" className="hubspot-form-container min-h-[200px]">
                {formLoading && (
                  <div className="flex items-center justify-center py-10">
                    <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="ml-2 text-gray-600">Loading form...</span>
                  </div>
                )}
              </div>
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>Having trouble with the form? <button onClick={handleOpenInNewTab} className="text-orange-600 hover:text-orange-800 underline">Open in new tab</button></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default HubSpotFormModal;
