import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import Header from './Header';
import { SelectionInterface } from './SelectionInterface';
import { ResultsDisplay } from './ResultsDisplay';
import { AboutSection } from './AboutSection';
import { Footer } from './Footer';

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Calculator component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 rounded-lg shadow-md border border-red-200">
          <h2 className="text-xl font-medium text-red-700 mb-2">Something went wrong</h2>
          <p className="mb-4 text-red-600">We're having trouble loading the calculator. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const Calculator = () => {
  const [selectedHubs, setSelectedHubs] = useState([]);
  const [selectedTiers, setSelectedTiers] = useState({});
  const [selectedModels, setSelectedModels] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Track user progress
  const [scriptLoaded, setScriptLoaded] = useState(false);
  
  // References
  const formContainerRef = useRef(null);
  const resultsRef = useRef(null);
  const selectionRef = useRef(null);

  // Function to handle HubSpot script loading
  const loadHubSpotScript = useCallback(async () => {
    try {
      // If the script is already globally available, return early
      if (window.hbspt) {
        setScriptLoaded(true);
        return Promise.resolve();
      }
      
      // Check if script is already in the document
      const existingScript = document.querySelector('script[src*="hsforms.net/forms"]');
      if (existingScript) {
        setScriptLoaded(true);
        return Promise.resolve();
      }
      
      return new Promise((resolve, reject) => {
        // Max time to wait for script load
        const timeoutId = setTimeout(() => {
          console.error("HubSpot script load timed out");
          reject(new Error("Script load timed out"));
        }, 10000); // 10 second timeout
        
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/embed/v2.js';
        script.charset = 'utf-8';
        script.type = 'text/javascript';
        script.async = true;
        
        script.onload = () => {
          clearTimeout(timeoutId);
          console.log("HubSpot script loaded successfully");
          setScriptLoaded(true);
          resolve();
        };
        
        script.onerror = (err) => {
          clearTimeout(timeoutId);
          console.error("Error loading HubSpot script:", err);
          reject(err);
        };
        
        document.head.appendChild(script);
      });
    } catch (error) {
      console.error("Error in loadHubSpotScript:", error);
      setFormError(true);
      throw error;
    }
  }, []);

  // Load HubSpot script when component mounts
  useEffect(() => {
    const loadScript = async () => {
      try {
        console.log("Attempting to load HubSpot script...");
        await loadHubSpotScript();
        console.log("Script loaded successfully, creating form...");
        // Initialize the form when component mounts
        await createHubSpotForm([]);
      } catch (error) {
        console.error('Failed to load HubSpot script:', error);
        setFormError(true);
      }
    };
    
    loadScript();
    
    // Check if global error for HubSpot scripts was set
    const checkForErrors = setInterval(() => {
      if (window.hsScriptLoadError) {
        setFormError(true);
        clearInterval(checkForErrors);
      }
    }, 1000);
    
    return () => clearInterval(checkForErrors);
  }, [loadHubSpotScript, createHubSpotForm]);

  // Update step based on user selections
  useEffect(() => {
    if (selectedHubs.length > 0) {
      const allHubsHaveTier = selectedHubs.every(hub => selectedTiers[hub]);
      const allHubsHaveModel = selectedHubs.every(hub => selectedModels[hub]);
      
      if (allHubsHaveTier && allHubsHaveModel) {
        setCurrentStep(3); // Form step
      } else if (allHubsHaveTier) {
        setCurrentStep(2); // Model selection
      } else {
        setCurrentStep(1); // Hub and tier selection
      }
    } else {
      setCurrentStep(1);
    }
  }, [selectedHubs, selectedTiers, selectedModels]);

  const handleHubSelection = useCallback((hub) => {
    if (selectedHubs.includes(hub)) {
      setSelectedHubs(prev => prev.filter(h => h !== hub));
      setSelectedTiers(prev => {
        const updated = { ...prev };
        delete updated[hub];
        return updated;
      });
      setSelectedModels(prev => {
        const updated = { ...prev };
        delete updated[hub];
        return updated;
      });
    } else {
      setSelectedHubs(prev => [...prev, hub]);
    }
  }, [selectedHubs]);

  const handleTierSelection = useCallback((hub, tier) => {
    setSelectedTiers(prev => ({
      ...prev,
      [hub]: tier
    }));
  }, []);

  const handleModelSelection = useCallback((hub, model) => {
    setSelectedModels(prev => ({
      ...prev,
      [hub]: model
    }));
  }, []);

  const getModelKeySuffix = useCallback((model) => {
    switch (model) {
      case 'Do It Yourself':
        return 'diy';
      case 'Do It With Me':
        return 'dwme';
      case 'Do It For Me':
        return 'difme';
      default:
        return '';
    }
  }, []);

  const generatePackageKey = useCallback((hub, tier, model) => {
    const hubKey = hub.toLowerCase().replace(' ', '_');
    const tierKey = tier.toLowerCase();
    const modelKey = getModelKeySuffix(model);
    return `${hubKey}_${tierKey}_${modelKey}`;
  }, [getModelKeySuffix]);

  // Use useMemo for package calculations to avoid recalculating unnecessarily
  const packageData = useMemo(() => {
    return {
      hours: {
        'Marketing Hub': {
          'Starter': {
            'Do It Yourself': 8,
            'Do It With Me': 12,
            'Do It For Me': 16
          },
          'Professional': {
            'Do It Yourself': 12,
            'Do It With Me': 20,
            'Do It For Me': 32
          }
        },
        'Sales Hub': {
          'Starter': {
            'Do It Yourself': 8,
            'Do It With Me': 12,
            'Do It For Me': 16
          },
          'Professional': {
            'Do It Yourself': 12,
            'Do It With Me': 20,
            'Do It For Me': 32
          }
        },
        'Service Hub': {
          'Starter': {
            'Do It Yourself': 8,
            'Do It With Me': 12,
            'Do It For Me': 16
          },
          'Professional': {
            'Do It Yourself': 12,
            'Do It With Me': 20,
            'Do It For Me': 32
          }
        }
      },
      prices: {
        'Marketing Hub': {
          'Starter': {
            'Do It Yourself': 1080,
            'Do It With Me': 1620,
            'Do It For Me': 2160
          },
          'Professional': {
            'Do It Yourself': 1620,
            'Do It With Me': 2700,
            'Do It For Me': 4320
          }
        },
        'Sales Hub': {
          'Starter': {
            'Do It Yourself': 1080,
            'Do It With Me': 1620,
            'Do It For Me': 2160
          },
          'Professional': {
            'Do It Yourself': 1620,
            'Do It With Me': 2700,
            'Do It For Me': 4320
          }
        },
        'Service Hub': {
          'Starter': {
            'Do It Yourself': 1080,
            'Do It With Me': 1620,
            'Do It For Me': 2160
          },
          'Professional': {
            'Do It Yourself': 1620,
            'Do It With Me': 2700,
            'Do It For Me': 4320
          }
        }
      },
      scopeSummaries: {
        'Marketing Hub': {
          'Starter': {
            'Do It Yourself': 'We guide you on basic portal "getting started" steps—tracking code, one lead-capture form, one email template—but you implement them. Includes 2 coaching sessions for Q&A and best practices.',
            'Do It With Me': 'We collaborate on the same starter setup (tracking code, forms, email templates) plus 2 simple automations and a basic reporting dashboard. We handle some tasks, you handle others. Includes 3 coaching sessions.',
            'Do It For Me': 'We fully implement the basic portal setup (code installation, up to 3 forms, basic reporting, 2 simple automations). Includes 3 coaching sessions and 1 team training.'
          },
          'Professional': {
            'Do It Yourself': 'We teach you how to configure more advanced marketing features—e.g. 2 automations (workflows), lead scoring basics, custom dashboards—and you carry them out. Includes 3 coaching sessions.',
            'Do It With Me': 'A joint effort setting up advanced features (3 automations, lead scoring, campaign setup, custom dashboards). We do part of the technical work while guiding you on the rest. Includes 1 team training + 4 coaching sessions.',
            'Do It For Me': 'A full-service build-out of Pro features—3 automations, lead scoring, more sophisticated campaign setup, custom reporting, etc. We do nearly everything. Includes 1 team training + 5 coaching sessions.'
          }
        },
        'Sales Hub': {
          'Starter': {
            'Do It Yourself': 'We advise you on configuring a basic sales pipeline, 1 deal stage workflow, and simple deal card fields. You do the actual HubSpot setup. Includes 2 coaching sessions.',
            'Do It With Me': 'We work together on pipeline setup, deal stage workflow, meeting link, basic automation. We do some config, you do the rest. Includes 1 team training + 3 coaching sessions.',
            'Do It For Me': 'We handle the key Sales Starter tasks—pipeline setup, 2 simple automations, basic deal card customization—while you provide approvals. Includes 1 team training + 3 coaching sessions.'
          },
          'Professional': {
            'Do It Yourself': 'We guide you on multiple deal stage workflows, advanced deal card customization, and basic sales reporting dashboards. You do all setup steps. Includes 3 coaching sessions.',
            'Do It With Me': 'A collaborative Pro-level build: advanced pipeline/workflows, meeting link setup, custom deal properties. We share tasks. Includes 1 team training + 4 coaching sessions.',
            'Do It For Me': 'We fully implement advanced pipelines, automation/sequences, custom sales reporting, quotes setup. Minimal effort needed on your end. Includes 1 team training + 5 coaching sessions.'
          }
        },
        'Service Hub': {
          'Starter': {
            'Do It Yourself': 'We instruct you on setting up your first ticket pipeline, basic routing rules, and simple email/snippet usage. You do the hands-on HubSpot configuration. Includes 2 coaching sessions.',
            'Do It With Me': 'We team up to configure the Service Starter features—ticket pipeline/routing, a simple knowledge base, chatflow, etc. Includes 1 team training + 3 coaching sessions.',
            'Do It For Me': 'We take care of the full basic service setup: pipeline(s), routing, knowledge base structure, chatflows, etc. Includes 1 team training + 3 coaching sessions.'
          },
          'Professional': {
            'Do It Yourself': 'We coach you through more advanced service features—multiple ticket pipelines, routing rules, basic automation, knowledge base. You implement. Includes 3 coaching sessions.',
            'Do It With Me': 'We collaborate on advanced workflows (SLAs, routing), knowledge base organization, maybe feedback surveys or chatbots. Some setup by us, some by you. Includes 1 team training + 4 coaching sessions.',
            'Do It For Me': 'We fully implement your Professional-level service environment: pipelines, automations, reporting dashboards, knowledge base structure, etc. Includes 2 team trainings + 4 coaching sessions.'
          }
        }
      }
    };
  }, []);

  const calculatePackageHours = useCallback((hub, tier, model) => {
    return packageData.hours[hub]?.[tier]?.[model] || 0;
  }, [packageData]);

  const calculatePackagePrice = useCallback((hub, tier, model) => {
    return packageData.prices[hub]?.[tier]?.[model] || 0;
  }, [packageData]);

  const getScopeSummary = useCallback((hub, tier, model) => {
    return packageData.scopeSummaries[hub]?.[tier]?.[model] || '';
  }, [packageData]);

  // Calculate total price of selected packages
  const totalPrice = useMemo(() => {
    if (!selectedHubs.length) return 0;
    
    return selectedHubs.reduce((total, hub) => {
      const tier = selectedTiers[hub];
      const model = selectedModels[hub];
      if (!tier || !model) return total;
      
      return total + calculatePackagePrice(hub, tier, model);
    }, 0);
  }, [selectedHubs, selectedTiers, selectedModels, calculatePackagePrice]);

  // Create HubSpot form with package data
  const createHubSpotForm = useCallback(async (packages = []) => {
    if (!formContainerRef.current) {
      console.warn("Form container ref is not available");
      return;
    }
    
    try {
      setFormLoading(true);
      
      // Ensure HubSpot script is loaded
      if (!window.hbspt) {
        console.log("HubSpot script not loaded yet, attempting to load...");
        await loadHubSpotScript();
        
        // Wait for HubSpot to be available
        await new Promise((resolve, reject) => {
          console.log("Waiting for HubSpot to be available...");
          const checkInterval = setInterval(() => {
            if (window.hbspt) {
              console.log("HubSpot is now available");
              clearInterval(checkInterval);
              resolve();
            }
          }, 100);
          
          // Add timeout after 5 seconds
          setTimeout(() => {
            clearInterval(checkInterval);
            console.warn("Timed out waiting for HubSpot to be available");
            if (!window.hbspt) {
              reject(new Error("Timed out waiting for HubSpot"));
            } else {
              resolve();
            }
          }, 5000);
        });
      }
      
      // If HubSpot still not available, throw error
      if (!window.hbspt) {
        console.error("HubSpot script failed to load after waiting");
        throw new Error('HubSpot script failed to load');
      }
      
      // Generate the package keys string if packages are provided
      const packageKeys = packages.length > 0 
        ? packages.map(pkg => {
            const hub = pkg.hub.toLowerCase().replace(/\s+/g, '_');
            const tier = pkg.tier.toLowerCase();
            const model = pkg.model.toLowerCase().replace(/\s+/g, '_');
            
            let modelSuffix = '';
            if (model.includes('yourself')) modelSuffix = 'diy';
            else if (model.includes('with_me')) modelSuffix = 'dwme';
            else if (model.includes('for_me')) modelSuffix = 'difme';
            
            return `${hub}_${tier}_${modelSuffix}`;
          }).join(';')
        : '';
      
      console.log('Creating form with package keys:', packageKeys);
      
      // Make sure formContainerRef is still valid
      if (!formContainerRef.current) {
        console.error("Form container no longer exists");
        setFormError(true);
        setFormLoading(false);
        return;
      }
      
      // Remove any existing form
      formContainerRef.current.innerHTML = '';
      
      // Use try-catch inside a setTimeout to handle potential synchronous errors
      setTimeout(() => {
        try {
          console.log("Creating HubSpot form...");
          window.hbspt.forms.create({
            portalId: "7208949",
            formId: "699d6d6a-52b4-4439-b6ea-2584491b8baa",
            region: "na1",
            target: "#hubspotFormContainer",
            formData: packageKeys ? {
              hubspot_standard_onboarding_key: packageKeys
            } : {},
            onFormReady: function($form) {
              console.log('Form loaded successfully');
              setFormLoading(false);
              
              // Customize the submit button to match the branding
              try {
                const submitButton = $form.find('.hs-button.primary');
                if (submitButton.length) {
                  submitButton.val('Calculate My Price');
                  submitButton.css({
                    'background-color': '#ea580c',
                    'color': 'white',
                    'padding': '0.75rem 1.5rem',
                    'border': 'none',
                    'border-radius': '0.375rem',
                    'font-weight': '600',
                    'font-size': '0.875rem',
                    'cursor': 'pointer',
                    'transition': 'all 0.2s ease-in-out'
                  });
                  
                  // Add hover effect through jQuery
                  submitButton.hover(
                    function() { $(this).css('background-color', '#c2410c'); },
                    function() { $(this).css('background-color', '#ea580c'); }
                  );
                }
                
                // Add custom styles to form fields for better mobile experience
                $form.find('input, select').css({
                  'font-size': '16px', // Prevents zoom on iOS
                  'max-width': '100%',
                  'box-sizing': 'border-box'
                });
                
                // Add package selection summary above form if packages exist
                if (packages.length > 0) {
                  const summaryHTML = `
                    <div class="mb-4 p-3 bg-orange-50 border border-orange-100 rounded-md">
                      <p class="text-sm font-medium text-orange-800">Selected Packages:</p>
                      <ul class="mt-2 pl-4 text-sm text-orange-700">
                        ${packages.map(pkg => `
                          <li>${pkg.hub} (${pkg.tier}) - ${pkg.model}</li>
                        `).join('')}
                      </ul>
                      <p class="mt-2 text-sm font-medium text-orange-800">
                        Estimated Total: €${totalPrice.toLocaleString()}
                      </p>
                    </div>
                  `;
                  
                  // Insert summary before the form
                  const summaryElement = document.createElement('div');
                  summaryElement.innerHTML = summaryHTML;
                  $form.before(summaryElement);
                }
              } catch (styleError) {
                console.error("Error styling form:", styleError);
                // Non-critical error, continue without styling
              }
            },
            onFormSubmit: function($form, data) {
              console.log("Form submitted with data:", data);
              
              // Get the user selections and calculate packages
              try {
                if (selectedHubs.length === 0 || 
                    Object.keys(selectedTiers).length === 0 || 
                    Object.keys(selectedModels).length === 0) {
                  alert('Please select at least one hub, its tier, and service model.');
                  return false; // Prevent submission
                }

                const packages = selectedHubs.map(hub => {
                  const tier = selectedTiers[hub];
                  const model = selectedModels[hub];
                  if (!tier || !model) return null;

                  const hours = calculatePackageHours(hub, tier, model);
                  const price = calculatePackagePrice(hub, tier, model);
                  const packageKey = generatePackageKey(hub, tier, model);

                  return {
                    hub,
                    tier,
                    model,
                    hours,
                    price,
                    packageKey,
                    scopeSummary: getScopeSummary(hub, tier, model)
                  };
                }).filter(pkg => pkg !== null);

                if (packages.length === 0) {
                  alert('Please select at least one valid package configuration.');
                  return false; // Prevent submission
                }
                
                setSelectedPackages(packages);
                
                // Generate package keys for form submission
                const packageKeys = packages.map(pkg => {
                  const hub = pkg.hub.toLowerCase().replace(/\s+/g, '_');
                  const tier = pkg.tier.toLowerCase();
                  const model = pkg.model.toLowerCase().replace(/\s+/g, '_');
                  
                  let modelSuffix = '';
                  if (model.includes('yourself')) modelSuffix = 'diy';
                  else if (model.includes('with_me')) modelSuffix = 'dwme';
                  else if (model.includes('for_me')) modelSuffix = 'difme';
                  
                  return `${hub}_${tier}_${modelSuffix}`;
                }).join(';');
                
                // Ensure the package keys are included
                if (packageKeys && !data.hubspot_standard_onboarding_key) {
                  data.hubspot_standard_onboarding_key = packageKeys;
                }
                
                return true; // Allow submission to continue
                
              } catch (error) {
                console.error('Error processing selections:', error);
                alert('There was an error processing your selections. Please try again.');
                return false; // Prevent submission
              }
            },
            onFormSubmitted: function() {
              console.log("Form successfully submitted");
              setFormSubmitted(true);
              setShowResults(true);
              
              // Scroll to results section after a small delay to ensure rendering
              setTimeout(() => {
                if (resultsRef.current) {
                  resultsRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                  });
                }
              }, 500);
            },
            submitText: "Calculate My Price", // Set the submit button text
            cssRequired: `
              .hs-form-field { margin-bottom: 1.25rem; } 
              .hs-form select, .hs-form input[type=text], .hs-form input[type=email], .hs-form input[type=tel] { 
                width: 100%; 
                padding: 0.625rem;
                font-size: 1rem;
                border: 1px solid #d1d5db; 
                border-radius: 0.375rem;
                transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
              }
              .hs-form select:focus, .hs-form input:focus {
                outline: none;
                border-color: #ea580c;
                box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
              }
              .hs-form label {
                font-weight: 500;
                margin-bottom: 0.375rem;
                display: block;
              }
              .hs-form-required { color: #ef4444; } 
              .hs-button.primary { 
                background-color: #ea580c !important; 
                color: white !important; 
                padding: 0.75rem 1.5rem !important; 
                border: none !important; 
                border-radius: 0.375rem !important; 
                font-weight: 600 !important;
                font-size: 0.875rem !important;
                cursor: pointer !important;
                text-transform: none !important;
                transition: all 0.2s ease-in-out !important;
                width: 100% !important;
                max-width: 300px !important;
              } 
              .hs-button.primary:hover { 
                background-color: #c2410c !important;
                transform: translateY(-1px) !important;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
              }
              .hs-error-msgs {
                list-style: none;
                padding-left: 0;
                margin-top: 0.25rem;
                font-size: 0.875rem;
                color: #ef4444;
              }
              @media (max-width: 768px) {
                .hs-form select, .hs-form input {
                  font-size: 16px !important; /* Prevents zoom on iOS */
                }
              }
            `
          });
          console.log("HubSpot form creation initiated");
        } catch (error) {
          console.error('Error in hbspt.forms.create:', error);
          setFormError(true);
          setFormLoading(false);
        }
      }, 0);
      
    } catch (error) {
      console.error('Error creating HubSpot form:', error);
      setFormError(true);
      setFormLoading(false);
    }
  }, [loadHubSpotScript, calculatePackageHours, calculatePackagePrice, getScopeSummary, generatePackageKey, totalPrice, selectedHubs, selectedTiers, selectedModels]);

  // Render step indicator component
  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center w-full max-w-2xl">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div className="relative flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= step
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                } transition-all duration-300`}
              >
                {step}
              </div>
              <div className="mt-2 text-xs font-medium text-center">
                {step === 1 && 'Select Hub & Tier'}
                {step === 2 && 'Choose Model'}
                {step === 3 && 'Complete Form'}
              </div>
            </div>
            {step < 3 && (
              <div
                className={`flex-1 h-1 mx-1 ${
                  currentStep > step ? 'bg-orange-600' : 'bg-gray-200'
                } transition-all duration-300`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  // Check if the user has made selections
  const hasSelections = selectedHubs.length > 0 && 
    selectedHubs.every(hub => selectedTiers[hub] && selectedModels[hub]);

  // Get total estimated price for selected packages
  const estimatedTotal = useMemo(() => {
    if (!hasSelections) return null;
    
    return (
      <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-lg">
        <h4 className="text-lg font-medium text-orange-800">Estimated Total</h4>
        <p className="mt-2 text-2xl font-bold text-orange-700">€{totalPrice.toLocaleString()}</p>
        <p className="mt-1 text-xs text-orange-600">
          Complete the form below to receive your detailed quote
        </p>
      </div>
    );
  }, [hasSelections, totalPrice]);

  // Fallback content to display when form loading fails
  const formFallback = useMemo(() => {
    if (!formError) return null;
    
    return (
      <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow text-center">
        <h3 className="text-xl font-medium text-gray-900 mb-4">Request Your Custom Quote</h3>
        <p className="mb-6 text-gray-600">
          We're having trouble loading our form. Please use the button below to open it in a new tab.
        </p>
        <a
          href="https://share.hsforms.com/1TT_NNRvXTFSreef_Ga9WWQfm6sm"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors"
        >
          Open Form in New Tab
        </a>
      </div>
    );
  }, [formError]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Header />
        
        <ErrorBoundary>
          <div className="mt-10 bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Step indicator */}
            <div className="px-6 pt-6">
              <StepIndicator />
            </div>
            
            <div className="p-6" ref={selectionRef}>
              <SelectionInterface
                selectedHubs={selectedHubs}
                selectedTiers={selectedTiers}
                selectedModels={selectedModels}
                onHubSelect={handleHubSelection}
                onTierSelect={handleTierSelection}
                onModelSelect={handleModelSelection}
              />
              
              {/* Display estimated total if selections are made */}
              {estimatedTotal}
            </div>
            
            {/* Embedded HubSpot Form Section */}
            <div 
              className="mt-2 p-6 pt-8 border-t border-gray-200 bg-gray-50 animate-fadeIn"
            >
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Get Your Custom HubSpot Onboarding Quote
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Fill out the form below and we'll send you a detailed quote for your selected HubSpot packages.
              </p>
              
              {formLoading && (
                <div className="flex items-center justify-center py-8">
                  <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="ml-2 text-gray-600">Loading form...</span>
                </div>
              )}
              
              {/* Display fallback content when form fails to load */}
              {formFallback}
              
              {!formError && (
                <>
                  <div 
                    id="hubspotFormContainer"
                    className="min-h-[250px]"
                    ref={formContainerRef}
                  ></div>
                  
                  <div className="mt-4 pt-2 text-xs text-gray-500">
                    <p>Select your packages above, then click "Calculate My Price" to get your custom quote.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </ErrorBoundary>

        <AboutSection />

        {/* Results section that appears after form submission */}
        {showResults && (
          <div ref={resultsRef} className="mt-10 scroll-mt-8 animate-fadeIn">
            <ResultsDisplay packages={selectedPackages} />
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

// Add both named and default exports
export { Calculator };
export default Calculator;
