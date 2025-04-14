// src/components/Calculator/index.jsx
export function Calculator() {
  const [selectedHubs, setSelectedHubs] = useState([]);
  const [selectedTiers, setSelectedTiers] = useState({});
  const [selectedModels, setSelectedModels] = useState({});
  const [showHubSpotForm, setShowHubSpotForm] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCalculatePrice = () => {
    const packageKeys = selectedHubs.map(hub => {
      const tier = selectedTiers[hub]?.toLowerCase() || '';
      const model = selectedModels[hub]?.split(' - ')[0].toLowerCase() || '';
      return `${hub.toLowerCase().replace(' ', '.')}_${tier}_${model}`;
    });
    
    setSelectedPackages(packageKeys);
    setShowHubSpotForm(true);
  };

  return (
    <div className="min-h-screen bg-leapforce-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Header />
        
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <SelectionInterface
            selectedHubs={selectedHubs}
            setSelectedHubs={setSelectedHubs}
            selectedTiers={selectedTiers}
            setSelectedTiers={setSelectedTiers}
            selectedModels={selectedModels}
            setSelectedModels={setSelectedModels}
          />

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleCalculatePrice}
              disabled={selectedHubs.length === 0}
              className={`px-6 py-3 rounded-md text-white transition-colors duration-150
                ${selectedHubs.length === 0 
                  ? 'bg-leapforce-gray-light cursor-not-allowed'
                  : 'bg-leapforce-orange hover:bg-leapforce-orange-dark'}`}
            >
              Calculate My Price
            </button>
          </div>
        </div>

        {formSubmitted && showResults && (
          <ResultsDisplay
            selectedPackages={selectedPackages}
          />
        )}

        <HubSpotFormModal
          isOpen={showHubSpotForm}
          onClose={() => setShowHubSpotForm(false)}
          selectedPackages={selectedPackages}
          onSubmitSuccess={() => {
            setShowHubSpotForm(false);
            setFormSubmitted(true);
            setShowResults(true);
          }}
        />
      </div>
    </div>
  );
}
