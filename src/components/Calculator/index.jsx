import React, { useState, useCallback } from 'react';
import Header from './Header';
import { SelectionInterface } from './SelectionInterface';
import { ResultsDisplay } from './ResultsDisplay';
import HubSpotFormModal from './HubSpotFormModal';
import { AboutSection } from './AboutSection';
import { Footer } from './Footer';

// Rest of your Calculator component code remains the same...
const Calculator = () => {  // Changed to const declaration
  const [selectedHubs, setSelectedHubs] = useState([]);
  const [selectedTiers, setSelectedTiers] = useState({});
  const [selectedModels, setSelectedModels] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalError, setModalError] = useState(false);

  // Function to handle modal errors and provide recovery
  const handleModalError = useCallback(() => {
    console.error('Modal encountered an error');
    setModalError(true);
    // Close the problematic modal
    setShowModal(false);
  }, []);

  // Recovery function to reset modal error state
  const resetModalError = useCallback(() => {
    setModalError(false);
  }, []);

  const handleHubSelection = (hub) => {
    if (selectedHubs.includes(hub)) {
      setSelectedHubs(selectedHubs.filter(h => h !== hub));
      const updatedTiers = { ...selectedTiers };
      const updatedModels = { ...selectedModels };
      delete updatedTiers[hub];
      delete updatedModels[hub];
      setSelectedTiers(updatedTiers);
      setSelectedModels(updatedModels);
    } else {
      setSelectedHubs([...selectedHubs, hub]);
    }
  };

  const handleTierSelection = (hub, tier) => {
    setSelectedTiers({
      ...selectedTiers,
      [hub]: tier
    });
  };

  const handleModelSelection = (hub, model) => {
    setSelectedModels({
      ...selectedModels,
      [hub]: model
    });
  };

  const getModelKeySuffix = (model) => {
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
  };

  const generatePackageKey = (hub, tier, model) => {
    const hubKey = hub.toLowerCase().replace(' ', '_');  // Keep 'hub' in the key
    const tierKey = tier.toLowerCase();
    const modelKey = getModelKeySuffix(model);
    return `${hubKey}_${tierKey}_${modelKey}`;
  };

  const calculatePackageHours = (hub, tier, model) => {
    const packageHours = {
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
    };

    return packageHours[hub]?.[tier]?.[model] || 0;
  };

  const calculatePackagePrice = (hub, tier, model) => {
    const packagePrices = {
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
    };

    return packagePrices[hub]?.[tier]?.[model] || 0;
  };

  const getScopeSummary = (hub, tier, model) => {
    const scopeSummaries = {
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
    };

    return scopeSummaries[hub]?.[tier]?.[model] || '';
  };

  const handleCalculatePrice = () => {
    try {
      // Reset error state when starting fresh
      setModalError(false);
      
      if (selectedHubs.length === 0 || 
          Object.keys(selectedTiers).length === 0 || 
          Object.keys(selectedModels).length === 0) {
        alert('Please select at least one hub, its tier, and service model.');
        return;
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

      setSelectedPackages(packages);
      
      // Instead of just setting showModal to true, we'll create a safety timeout
      // that will show results directly if the modal doesn't appear within 5 seconds
      setShowModal(true);
      
      // Set a safety timeout that will bypass the modal if it causes problems
      const safetyTimer = setTimeout(() => {
        // If the modal is still showing but we haven't gotten to results yet, 
        // we might be stuck in a white screen situation
        if (showModal && !formSubmitted && !showResults) {
          console.warn('Safety timeout triggered - modal may be stuck');
          handleModalError();
          // Skip directly to results as a fallback
          setFormSubmitted(true);
          setShowResults(true);
        }
      }, 5000);
      
      // Store the timer ID so we can clear it if the modal works normally
      window.safetyTimer = safetyTimer;
      
    } catch (error) {
      console.error('Error in handleCalculatePrice:', error);
      // If any error occurs, show results directly
      setModalError(true);
      setFormSubmitted(true);
      setShowResults(true);
    }
  };

  const handleFormSuccess = () => {
    console.log("Form success called, showing results");
    // Clear the safety timer since we've successfully submitted
    if (window.safetyTimer) {
      clearTimeout(window.safetyTimer);
    }
    
    setShowModal(false);
    setFormSubmitted(true);
    setShowResults(true);
    setModalError(false);
  };

  // Direct link fallback for users who might experience white screen
  const handleDirectLinkFallback = () => {
    // Create the HubSpot form URL with packages as query parameters
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
    
    // Open HubSpot form in a new tab
    const url = `https://info.leapforce.nl/hubspot-onboarding-quote?packages=${encodeURIComponent(packageKeys)}`;
    window.open(url, '_blank');
    
    // Show results directly in current page
    setFormSubmitted(true);
    setShowResults(true);
    setModalError(false);
    
    // Close modal if it's open
    setShowModal(false);
  };

  // If we had an error with the modal, show the fallback UI with direct link option
  const renderModalErrorFallback = () => {
    if (!modalError) return null;
    
    return (
      <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg shadow-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-orange-800">We noticed an issue with the HubSpot form</h3>
            <div className="mt-2 text-sm text-orange-700">
              <p>
                You can continue to view your package details below, or use our direct link option to submit your information.
              </p>
              <div className="mt-3">
                <button
                  onClick={handleDirectLinkFallback}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Open Direct Link Instead
                </button>
                <button
                  onClick={resetModalError}
                  className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Header />
        
        <div className="mt-10 bg-white rounded-lg shadow-lg p-6">
          <SelectionInterface
            selectedHubs={selectedHubs}
            selectedTiers={selectedTiers}
            selectedModels={selectedModels}
            onHubSelect={handleHubSelection}
            onTierSelect={handleTierSelection}
            onModelSelect={handleModelSelection}
          />

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleCalculatePrice}
              className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700"
            >
              Calculate My Price
            </button>
          </div>
          
          {/* Modal error fallback UI */}
          {renderModalErrorFallback()}
        </div>

        <AboutSection />

        {/* Results section that appears after form submission */}
        {(formSubmitted || modalError) && showResults && (
          <div className="mt-10 animate-fadeIn">
            <ResultsDisplay packages={selectedPackages} />
          </div>
        )}

        {/* HubSpot Form Modal */}
        {!modalError && (
          <HubSpotFormModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onSuccess={handleFormSuccess}
            onError={handleModalError}
            selectedPackages={selectedPackages}
          />
        )}

        <Footer />
      </div>
    </div>
  );
};

// Add both named and default exports
export { Calculator };
export default Calculator;
