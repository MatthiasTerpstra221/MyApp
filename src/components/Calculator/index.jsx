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

  const calculatePackageHours = (hub, tier) => {
    const baseHours = {
      'Marketing Hub': { Starter: 20, Professional: 40, Enterprise: 80 },
      'Sales Hub': { Starter: 15, Professional: 30, Enterprise: 60 },
      'Service Hub': { Starter: 15, Professional: 30, Enterprise: 60 },
      'Operations Hub': { Starter: 25, Professional: 50, Enterprise: 100 },
      'CMS Hub': { Starter: 20, Professional: 40, Enterprise: 80 }
    };

    const modelMultiplier = {
      'Do It Yourself': 0.5,
      'Guided Implementation': 1,
      'Full Service': 1.5
    };

    return Math.round(baseHours[hub][tier] * modelMultiplier[selectedModel]);
  };

  const calculatePackagePrice = (hours) => {
    const hourlyRate = 150;
    return hours * hourlyRate;
  };

  const handleCalculatePrice = () => {
    if (selectedHubs.length === 0 || Object.keys(selectedTiers).length === 0 || !selectedModel) {
      alert('Please select at least one hub, its tier, and a service model.');
      return;
    }

    const packages = selectedHubs.map(hub => {
      const tier = selectedTiers[hub];
      if (!tier) return null;

      const hours = calculatePackageHours(hub, tier);
      const price = calculatePackagePrice(hours);

      return {
        hub,
        tier,
        hours,
        price,
        scopeSummary: `Complete ${hub} ${tier} onboarding package with ${selectedModel} support`
      };
    }).filter(pkg => pkg !== null);

    setSelectedPackages(packages);
    setShowModal(true);
  };

  const handleFormSuccess = () => {
    setShowModal(false);
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
              className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition-colors duration-200"
            >
              Calculate My Price
            </button>
          </div>
        </div>

        {showResults && (
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
