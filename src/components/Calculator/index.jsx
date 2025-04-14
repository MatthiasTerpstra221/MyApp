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

  // ... (keep all the existing handler functions)

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
