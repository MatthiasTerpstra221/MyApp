import React, { useEffect, useRef, useState, useCallback } from 'react';

const HubSpotFormModal = ({ isOpen, onClose, selectedPackages, onSuccess, onError }) => {
  const formContainerRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [formLoading, setFormLoading] = useState(true);
  const [formError, setFormError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [showDirectLink, setShowDirectLink] = useState(false);

  // If not open, don't render
  if (!isOpen) return null;

  // Report errors to parent
  const reportError = useCallback((message) => {
    console.error(`HubSpotFormModal error: ${message}`);
    setFormError(true);
    
    // Pass error to parent component if possible
    if (typeof onError === 'function') {
      onError();
    }
  }, [onError]);

  // Handle unexpected errors during render
  const handleRenderError = (error) => {
    console.error('Error rendering HubSpot form:', error);
    
    // Show direct link after a short delay
    setTimeout(() => {
      setShowDirectLink(true);
    }, 1000);
    
    // Report to parent
    if (typeof onError === 'function') {
      onError();
    }
    
    return (
      <div className="p-6 bg-red-50 rounded-lg text-center">
        <p className="text-red-600 mb-4">Unable to load form.</p>
        <button 
          onClick={handleOpenInNewTab}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md shadow-sm"
        >
          Open Form in New Tab
        </button>
      </div>
    );
  };

  // Load HubSpot script when modal is opened
  useEffect(() => {
    let mounted = true;
    
    try {
      if (!isOpen) return;

      // Set a global flag to detect if we're in the loading process
      window.__hubspotLoading = true;
      
      // Check if script is already loaded
      if (window.hbspt) {
        console.log('HubSpot script already loaded');
        if (mounted) {
          setScriptLoaded(true);
          window.__hubspotLoading = false;
        }
        return;
      }

      // Load the script if needed
      const loadHubspotScript = () => {
        console.log('Loading HubSpot script');
        
        // Use script already in the page if available
        const existingScript = document.querySelector('script[src*="hsforms.net/forms"]');
        if (existingScript) {
          console.log('Found existing HubSpot forms script');
          if (mounted) {
            setScriptLoaded(true);
            window.__hubspotLoading = false;
          }
          return;
        }
        
        const script = document.createElement('script');
        script.src = '//js.hsforms.net/forms/embed/v2.js';
        script.charset = 'utf-8';
        script.type = 'text/javascript';
        script.async = true;
        
        script.onload = () => {
          console.log('HubSpot script loaded successfully');
          if (mounted) {
            setScriptLoaded(true);
            window.__hubspotLoading = false;
          }
        };
        
        script.onerror = () => {
          console.error('Failed to load HubSpot script');
          if (mounted) {
            setFormError(true);
            window.__hubspotLoading = false;
            reportError('Script loading failed');
          }
        };
        
        document.head.appendChild(script);
      };

      loadHubspotScript();
      
      // Set a timeout to show error if script doesn't load within 5 seconds
      const timeoutId = setTimeout(() => {
        if (!window.hbspt && mounted) {
          console.error('HubSpot script loading timed out');
          setFormError(true);
          window.__hubspotLoading = false;
          reportError('Script loading timed out');
          setShowDirectLink(true);
        }
      }, 5000);
      
      return () => {
        mounted = false;
        clearTimeout(timeoutId);
        // Clean up global flags
        window.__hubspotLoading = false;
      };
    } catch (error) {
      console.error('Error in script loading effect:', error);
      if (mounted) {
        reportError('Unexpected error in script loading');
        setShowDirectLink(true);
      }
      return () => {
        mounted = false;
      };
    }
  }, [isOpen, reportError]);

  // Create and inject the HubSpot form when the modal is opened and script is loaded
  useEffect(() => {
    let mounted = true;
    
    try {
      // Ensure modal is open, script is loaded, and the container ref is available
      if (!isOpen || !scriptLoaded || !formContainerRef.current) return;
      
      // Clear any existing content
      formContainerRef.current.innerHTML = '';
      setFormLoading(true); // Reset loading state for potential retries
      setFormError(false);  // Reset error state
      
      console.log('Dependencies met, creating form...');
      createForm();
      
      // Cleanup function to clear the form if the modal closes before submission
      return () => {
        mounted = false;
        if (formContainerRef.current) {
          formContainerRef.current.innerHTML = '';
        }
      };
    } catch (error) {
      console.error('Error creating form:', error);
      if (mounted) {
        setFormError(true);
        setFormLoading(false);
        reportError('Error in form creation effect');
        setShowDirectLink(true);
      }
      return () => {
        mounted = false;
      };
    }
  // Depend specifically on isOpen, scriptLoaded, and the ref's current value
  // This ensures it re-runs if the ref becomes available after script load
  }, [isOpen, scriptLoaded, formContainerRef.current, reportError]);

  // Create the HubSpot form
  const createForm = () => {
    try {
      if (!window.hbspt || !formContainerRef.current) {
        setFormError(true);
        reportError('HubSpot not available for form creation');
        setShowDirectLink(true);
        return;
      }

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
      
      // Set a timeout to detect form creation issues
      const formCreationTimeout = setTimeout(() => {
        // Check if anything has been added to the container
        if (formContainerRef.current && 
            (!formContainerRef.current.children ||
             formContainerRef.current.children.length === 0 ||
             !formContainerRef.current.querySelector('form'))) {
          console.error('Form creation timed out - no form detected');
          setFormError(true);
          setFormLoading(false);
          reportError('Form creation timed out');
          setShowDirectLink(true);
        }
      }, 8000);

      // Create the form
      try {
        window.hbspt.forms.create({
          portalId: "7208949",
          formId: "699d6d6a-52b4-4439-b6ea-2584491b8baa",
          region: "na1",
          target: "#hubspotFormContainer",
          formData: {
            hubspot_standard_onboarding_key: packageKeys
          },
          inlineMessage: "Thank you! Your submission has been received.",
          onFormReady: function($form, ctx) {
            console.log('Form loaded successfully');
            setFormLoading(false);
            
            // Clear the timeout since form was created successfully
            clearTimeout(formCreationTimeout);
            
            // Prevent form from redirecting by handling the submit event
            if ($form) {
              // Add custom event handler for form submission
              $form.find('form').on('submit', function(e) {
                // Don't prevent default - let HubSpot handle the submission
                // But set a flag to track that this was triggered
                window.hsFormSubmitted = true;
                console.log('Form submit detected via jQuery event');
              });
            }
          },
          onFormSubmit: function($form, data) {
            console.log("Form submitted with data:", data);
            // Ensure the package keys are included
            if (!data.hubspot_standard_onboarding_key) {
              data.hubspot_standard_onboarding_key = packageKeys;
            }
            return true; // Allow submission to continue
          },
          onFormSubmitted: function($form) {
            console.log("Form successfully submitted");
            setSubmitted(true);
            
            // Show the results after a short delay
            setTimeout(() => {
              if (onSuccess) {
                onSuccess();
              }
              onClose();
            }, 1500);
          },
          onFormError: function(error) {
            console.error('Form error:', error);
            setFormError(true);
            setFormLoading(false);
            reportError('HubSpot reported a form error');
          },
          cssRequired: '.hs-form-field { margin-bottom: 1rem; } .hs-form select, .hs-form input[type=text], .hs-form input[type=email], .hs-form input[type=tel] { width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; } .hs-form-required { color: #ef4444; } .hs-button.primary { background-color: #ea580c; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.375rem; cursor: pointer; } .hs-button.primary:hover { background-color: #c2410c; }'
        });
      } catch (e) {
        console.error('Error during form creation:', e);
        clearTimeout(formCreationTimeout);
        setFormError(true);
        setFormLoading(false);
        reportError('Exception during form creation');
        setShowDirectLink(true);
        
        // Try again if we haven't exceeded our attempts
        if (loadAttempts < 2) {
          console.log(`Retrying form creation (attempt ${loadAttempts + 1})...`);
          setLoadAttempts(loadAttempts + 1);
          setTimeout(createForm, 1000);
        }
      }

      // Add global event listener for form submit - extra safety measure
      const originalSubmit = window.XMLHttpRequest.prototype.send;
      window.XMLHttpRequest.prototype.send = function() {
        // Watch for HubSpot form submissions
        if (this._url && this._url.includes('hubspot') && this._url.includes('forms')) {
          this.addEventListener('load', function() {
            if (this.status >= 200 && this.status < 300) {
              console.log("Detected successful form submission via XHR");
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
    } catch (error) {
      console.error('Unexpected error in createForm:', error);
      setFormError(true);
      setFormLoading(false);
      reportError('Unexpected error in createForm');
      setShowDirectLink(true);
    }
  };
  
  // Handler for opening the form in a new tab
  const handleOpenInNewTab = () => {
    try {
      // Create a direct URL with the package keys appended as query parameters
      const packageKeys = selectedPackages.map(pkg => {
        const hub = pkg.hub.toLowerCase().replace(/\s+/g, '_');
        const tier = pkg.tier.toLowerCase();
        const model = pkg.model.toLowerCase().replace(/\s+/g, '_');
        
        let modelSuffix = '';
        if (model.includes('yourself')) modelSuffix = 'diy';
        else if (model.includes('with_me')) modelSuffix = 'dwme';
        else if (model.includes('for_me')) modelSuffix = 'difme';
        
        return `${hub}_${tier}_${modelSuffix}`;
      }).join(';');
      
      // Build URL with package keys
      const url = `https://info.leapforce.nl/hubspot-onboarding-quote?packages=${encodeURIComponent(packageKeys)}`;
      window.open(url, '_blank');
      
      // Close the modal and proceed to results
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      console.error('Error opening in new tab:', error);
      // Fallback to a simpler URL if there's an error
      window.open('https://info.leapforce.nl/hubspot-onboarding-quote', '_blank');
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    }
  };

  // Prevent body scrolling when modal is open
  useEffect(() => {
    try {
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
    } catch (error) {
      console.error('Error in body scroll effect:', error);
      // Don't let an error here prevent the component from rendering
    }
  }, [isOpen]);

  // Force show direct link after a while as a fallback
  useEffect(() => {
    const directLinkTimer = setTimeout(() => {
      if (formLoading && !formError && !submitted) {
        console.log('Showing direct link option after timeout as fallback');
        setShowDirectLink(true);
      }
    }, 10000);
    
    return () => clearTimeout(directLinkTimer);
  }, [formLoading, formError, submitted]);

  // Render with try/catch to catch errors
  try {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto sm:overflow-hidden">
        <div className="relative bg-white rounded-lg max-w-md w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto">
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
            {formError ? (
              <div className="py-8 text-center">
                <p className="text-red-600 mb-4">We're having trouble loading the form.</p>
                <button
                  onClick={handleOpenInNewTab}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md shadow-sm"
                >
                  Open Form in New Tab
                </button>
              </div>
            ) : formLoading ? (
              <div className="flex items-center justify-center py-8">
                <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="ml-2 text-gray-600">Loading form...</span>
              </div>
            ) : null}
          </div>

          {/* Form status message */}
          {submitted && (
            <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded text-green-700 text-center">
              Form submitted successfully! Showing your results...
            </div>
          )}

          {/* Backup option */}
          {(showDirectLink || !formError && !submitted) && (
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Having trouble? <button onClick={handleOpenInNewTab} className="text-orange-600 hover:text-orange-800 underline">Open form in new tab</button></p>
            </div>
          )}

          {/* Footer note */}
          <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500">
            <p>Your selected package(s) will be included in your request.</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return handleRenderError(error);
  }
};

export default HubSpotFormModal;
