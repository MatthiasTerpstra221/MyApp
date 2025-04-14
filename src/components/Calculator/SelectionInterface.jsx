import React from 'react';

export const SelectionInterface = ({
  selectedHubs,
  selectedTiers,
  selectedModel,
  onHubSelect,
  onTierSelect,
  onModelSelect
}) => {
  const hubs = [
    'Marketing Hub',
    'Sales Hub',
    'Service Hub',
    'Operations Hub',
    'CMS Hub'
  ];

  const tiers = ['Starter', 'Professional'];

  const models = [
    'Do It Yourself',
    'Guided Implementation',
    'Full Service'
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Your HubSpot Hub(s)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hubs.map(hub => (
            <label key={hub} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedHubs.includes(hub)}
                onChange={() => onHubSelect(hub)}
                className="h-5 w-5 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
              />
              <span className="text-gray-700">{hub}</span>
            </label>
          ))}
        </div>
      </div>

      {selectedHubs.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Select Tier for Each Hub</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedHubs.map(hub => (
              <div key={hub} className="space-y-2">
                <p className="font-medium text-gray-700">{hub}</p>
                <div className="flex flex-col space-y-2">
                  {tiers.map(tier => (
                    <label key={`${hub}-${tier}`} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name={`tier-${hub}`}
                        checked={selectedTiers[hub] === tier}
                        onChange={() => onTierSelect(hub, tier)}
                        className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                      />
                      <span className="text-gray-700">{tier}</span>
                    </label>
                  ))}
                  <div className="flex items-center space-x-2 text-gray-500">
                    <span>Enterprise*</span>
                    <span className="text-sm italic">Contact us for pricing</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.keys(selectedTiers).length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Select Your Service Model</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {models.map(model => (
              <label key={model} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="service-model"
                  checked={selectedModel === model}
                  onChange={() => onModelSelect(model)}
                  className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                />
                <span className="text-gray-700">{model}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
