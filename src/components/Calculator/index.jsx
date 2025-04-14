import React, { useState } from 'react';
import { Header } from './Header';
import { SelectionInterface } from './SelectionInterface';
import { ResultsDisplay } from './ResultsDisplay';
import { HubSpotFormModal } from './HubSpotFormModal';

export const Calculator = () => {
  const [selectedHubs, setSelectedHubs] = useState([]);
  const [selectedTiers, setSelectedTiers] = useState({});
  const [selectedModels, setSelectedModels] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
    const hubKey = hub.toLowerCase();
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
    setShowModal(true);
  };

  const handleFormSuccess = () => {
    setShowModal(false);
    setFormSubmitted(true);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
              className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition-colors duration-200 font-semibold"
            >
              Calculate My Price
            </button>
          </div>
        </div>

        {formSubmitted && showResults && (
          <ResultsDisplay
            packages={selectedPackages}
          />
        )}

        <HubSpotFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={handleFormSuccess}
          selectedPackages={selectedPackages}
        />
      </div>
    </div>
  );
};
