import React, { useEffect, useState, useCallback } from 'react';

const HubSpotFormModal = ({ isOpen, onClose, selectedPackages, onSuccess }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [formLoading, setFormLoading] = useState(true);
  const [formError, setFormError] = useState(false);
  const [formInstance, setFormInstance] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // If not open, don't render anything
  if (!isOpen) return null;

  // Handle successful form submission
  const handleSuccess = useCallback(() => {
    console.log('Form submission successful, triggering success callback');
    setFormSubmitted(true);
    
    // Ensure onSuccess is called
    if (onSuccess) {
      onSuccess();
    }
    
    // Close the modal with a slight delay
    setTimeout(() => {
      onClose();
    }, 1000);
  }, [onSuccess, onClose]);

  // For testing only - simulate form submission
  const handleTestSubmit = () => {
    console.log('Test submit triggered');
    handleSuccess();
  };

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
      // Reset form submitted state when reopening
      setFormSubmitted(false);
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
        const form = window.hbspt.forms.create({
          portalId: "7208949",
          formId: "699d6d6a-52b4-4439-b6ea-2584491b8baa",
          region: "na1",
          target: '#hubspotForm',
          onFormReady: function($form) {
            console.log('Form is ready');
            
            // Set hidden field value using the correct HubSpot approach after form is ready
            try {
              // Get the hidden field by name
              const hiddenField = $form.find('input[name="hubspot_standard_onboarding_key"]');
              
              if (hiddenField.length) {
                hiddenField.val(packageKeys);
                console.log('Hidden field found and value set:', packageKeys);
              } else {
                console.error('Hidden field not found in the form');
                
                // Fallback: try to create the field if it doesn't exist
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'hubspot_standard_onboarding_key';
                hiddenInput.value = packageKeys;
                
                // Find the form element within our container
                const formElement = document.querySelector('#hubspotForm form');
                if (formElement) {
                  formElement.appendChild(hiddenInput);
                  console.log('Added hidden field manually:', packageKeys);
                }
              }

              // Add a listener for the default HubSpot submit button
              const submitButton = $form.find('input[type="submit"]');
              if (submitButton.length) {
                // Monitor the submit event of the entire form
                $form.on('submit', function() {
                  console.log('Form submit detected');
                  // We'll let HubSpot handle the actual submission
                  // Just set a flag to remember that submit was clicked
                  window.hsFormSubmitted = true;
                });
              }
            } catch (error) {
              console.error('Error setting hidden field:', error);
            }
            
            setFormLoading(false);
            setFormInstance($form);
          },
          onFormSubmit: function($form, data) {
            console.log('Form submitted with data:', data);
            
            // Double check that our field is included
            const formData = $form.serializeArray();
            const hasPackageKeys = formData.some(item => 
              item.name === 'hubspot_standard_onboarding_key' && item.value === packageKeys
            );
            
            if (!hasPackageKeys) {
              console.warn('Package keys not found in form submission, attempting to add manually');
              data.hubspot_standard_onboarding_key = packageKeys;
            }
          },
          onFormSubmitted: function($form) {
            console.log('Form submitted successfully');
            // Handle success and show results
            handleSuccess();
          },
          onFormError: function(error) {
            console.error('Form error:', error);
            setFormError(true);
            setFormLoading(false);
          }
        });
        
        // Store the form instance
        setFormInstance(form);
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
  }, [isOpen, selectedPackages, handleSuccess, scriptLoaded]);

  const handleOpenInNewTab = () => {
    // Direct link to HubSpot form
    const url = `https://info.leapforce.nl/hubspot-onboarding-quote`;
    window.open(url, '_blank');
    
    // Even if they use the external form, show the results
    handleSuccess();
  };

  // Handle clicking outside to close
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto modal-overlay" onClick={handleOverlayClick}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black opacity-30"></div>

        <div className="relative bg-white rounded-lg max-w-md w-full mx-auto p-6 z-10">
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

          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Get Your Custom HubSpot Onboarding Quote
          </h2>

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
              
              {/* For testing only - remove in production */}
              <div className="mt-4 text-center hidden">
                <button 
                  onClick={handleTestSubmit}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  Test Submit
                </button>
              </div>
            </div>
          )}
          
          <div className="mt-4 border-t pt-4 text-xs text-gray-500">
            <p>Your selected package(s) will be automatically included in your request.</p>
            {formSubmitted && (
              <p className="mt-2 text-green-600 font-medium">Form submitted successfully! Showing your quote details...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubSpotFormModal;
