import React, { useState } from 'react';
import { Header } from './Header';
import { SelectionInterface } from './SelectionInterface';
import { ResultsDisplay } from './ResultsDisplay';
import { HubSpotFormModal } from './HubSpotFormModal';

export const Calculator = () => {
  const [selectedHubs, setSelectedHubs] = useState([]);
  const [selectedTiers, setSelectedTiers] = useState({});
  const [selectedModel, setSelectedModel] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleHubSelection = (hub) => {
    if (selectedHubs.includes(hub)) {
      setSelectedHubs(selectedHubs.filter(h => h !== hub));
      const updatedTiers = { ...selectedTiers };
      delete updatedTiers[hub];
      setSelectedTiers(updatedTiers);
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

  const handleModelSelection = (model) => {
    setSelectedModel(model);
  };

  const getModelKeySuffix = (model) => {
    switch (model) {
      case 'Do It Yourself':
        return 'diy';
      case 'Guided Implementation':
        return 'dwme';
      case 'Full Service':
        return 'difme';
      default:
        return '';
    }
  };

  const generatePackageKey = (hub, tier, model) => {
    const hubKey = hub.toLowerCase().replace(' hub', ' hub_');
    const tierKey = tier.toLowerCase();
    const modelKey = getModelKeySuffix(model);
    return `${hubKey}_${tierKey}_${modelKey}`;
  };

  const calculatePackageHours = (hub, tier, model) => {
    const packageHours = {
      'Marketing Hub': {
        'Starter': {
          'Do It Yourself': 8,
          'Guided Implementation': 12,
          'Full Service': 16
        },
        'Professional': {
          'Do It Yourself': 12,
          'Guided Implementation': 20,
          'Full Service': 32
        }
      },
      'Sales Hub': {
        'Starter': {
          'Do It Yourself': 8,
          'Guided Implementation': 12,
          'Full Service': 16
        },
        'Professional': {
          'Do It Yourself': 12,
          'Guided Implementation': 20,
          'Full Service': 32
        }
      },
      'Service Hub': {
        'Starter': {
          'Do It Yourself': 8,
          'Guided Implementation': 12,
          'Full Service': 16
        },
        'Professional': {
          'Do It Yourself': 12,
          'Guided Implementation': 20,
          'Full Service': 32
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
          'Guided Implementation': 1620,
          'Full Service': 2160
        },
        'Professional': {
          'Do It Yourself': 1620,
          'Guided Implementation': 2700,
          'Full Service': 4320
        }
      },
      'Sales Hub': {
        'Starter': {
          'Do It Yourself': 1080,
          'Guided Implementation': 1620,
          'Full Service': 2160
        },
        'Professional': {
          'Do It Yourself': 1620,
          'Guided Implementation': 2700,
          'Full Service': 4320
        }
      },
      'Service Hub': {
        'Starter': {
          'Do It Yourself': 1080,
          'Guided Implementation': 1620,
          'Full Service': 2160
        },
        'Professional': {
          'Do It Yourself': 1620,
          'Guided Implementation': 2700,
          'Full Service': 4320
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
          'Guided Implementation': 'We collaborate on the same starter setup (tracking code, forms, email templates) plus 2 simple automations and a basic reporting dashboard. We handle some tasks, you handle others. Includes 3 coaching sessions.',
          'Full Service': 'We fully implement the basic portal setup (code installation, up to 3 forms, basic reporting, 2 simple automations). Includes 3 coaching sessions and 1 team training.'
        },
        'Professional': {
          'Do It Yourself': 'We teach you how to configure more advanced marketing features—e.g. 2 automations (workflows), lead scoring basics, custom dashboards—and you carry them out. Includes 3 coaching sessions.',
          'Guided Implementation': 'A joint effort setting up advanced features (3 automations, lead scoring, campaign setup, custom dashboards). We do part of the technical work while guiding you on the rest. Includes 1 team training + 4 coaching sessions.',
          'Full Service': 'A full-service build-out of Pro features—3 automations, lead scoring, more sophisticated campaign setup, custom reporting, etc. We do nearly everything. Includes 1 team training + 5 coaching sessions.'
        }
      },
      'Sales Hub': {
        'Starter': {
          'Do It Yourself': 'We advise you on configuring a basic sales pipeline, 1 deal stage workflow, and simple deal card fields. You do the actual HubSpot setup. Includes 2 coaching sessions.',
          'Guided Implementation': 'We work together on pipeline setup, deal stage workflow, meeting link, basic automation. We do some config, you do the rest. Includes 1 team training + 3 coaching sessions.',
          'Full Service': 'We handle the key Sales Starter tasks—pipeline setup, 2 simple automations, basic deal card customization—while you provide approvals. Includes 1 team training + 3 coaching sessions.'
        },
        'Professional': {
          'Do It Yourself': 'We guide you on multiple deal stage workflows, advanced deal card customization, and basic sales reporting dashboards. You do all setup steps. Includes 3 coaching sessions.',
          'Guided Implementation': 'A collaborative Pro-level build: advanced pipeline/workflows, meeting link setup, custom deal properties. We share tasks. Includes 1 team training + 4 coaching sessions.',
          'Full Service': 'We fully implement advanced pipelines, automation/sequences, custom sales reporting, quotes setup. Minimal effort needed on your end. Includes 1 team training + 5 coaching sessions.'
        }
      },
      'Service Hub': {
        'Starter': {
          'Do It Yourself': 'We instruct you on setting up your first ticket pipeline, basic routing rules, and simple email/snippet usage. You do the hands-on HubSpot configuration. Includes 2 coaching sessions.',
          'Guided Implementation': 'We team up to configure the Service Starter features—ticket pipeline/routing, a simple knowledge base, chatflow, etc. Includes 1 team training + 3 coaching sessions.',
          'Full Service': 'We take care of the full basic service setup: pipeline(s), routing, knowledge base structure, chatflows, etc. Includes 1 team training + 3 coaching sessions.'
        },
        'Professional': {
          'Do It Yourself': 'We coach you through more advanced service features—multiple ticket pipelines, routing rules, basic automation, knowledge base. You implement. Includes 3 coaching sessions.',
          'Guided Implementation': 'We collaborate on advanced workflows (SLAs, routing), knowledge base organization, maybe feedback surveys or chatbots. Some setup by us, some by you. Includes 1 team training + 4 coaching sessions.',
          'Full Service': 'We fully implement your Professional-level service environment: pipelines, automations, reporting dashboards, knowledge base structure, etc. Includes 2 team trainings + 4 coaching sessions.'
        }
      }
    };

    return scopeSummaries[hub]?.[tier]?.[model] || '';
  };

  const handleCalculatePrice = () => {
    if (selectedHubs.length === 0 || Object.keys(selectedTiers).length === 0 || !selectedModel) {
      alert('Please select at least one hub, its tier, and a service model.');
      return;
    }

    const packages = selectedHubs.map(hub => {
      const tier = selectedTiers[hub];
      if (!tier) return null;

      const hours = calculatePackageHours(hub, tier, selectedModel);
      const price = calculatePackagePrice(hub, tier, selectedModel);
      const packageKey = generatePackageKey(hub, tier, selectedModel);

      return {
        hub,
        tier,
        hours,
        price,
        packageKey,
        scopeSummary: getScopeSummary(hub, tier, selectedModel)
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
            selectedModel={selectedModel}
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
            selectedModel={selectedModel}
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
