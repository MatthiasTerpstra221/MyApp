import React from 'react';

export const SelectionInterface = ({
  selectedHubs,
  selectedTiers,
  selectedModels,
  onHubSelect,
  onTierSelect,
  onModelSelect
}) => {
  const hubs = [
    'Marketing Hub',
    'Sales Hub',
    'Service Hub'
  ];

  const tiers = ['Starter', 'Professional'];
  
  const models = [
    'DIY - Do It Yourself',
    'DWMe - Do It With Me',
    'DIFMe - Do It For Me'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-3 gap-8 mb-8">
        {/* Column 1: Hub Selection */}
        <div>
          <h3 className="text-lg font-medium mb-4">1. Select Hub(s)</h3>
          <div className="space-y-2">
            {hubs.map(hub => (
              <label key={hub} className="flex items-center space-x-3 p-3 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedHubs.includes(hub)}
                  onChange={() => onHubSelect(hub)}
                  className="h-4 w-4 text-orange-500 rounded border-gray-300"
                />
                <span className="text-gray-800">{hub}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Column 2: Tier Selection */}
        <div>
          <h3 className="text-lg font-medium mb-4">2. Select Tier(s)</h3>
          {selectedHubs.map(hub => (
            <div key={hub} className="mb-4">
              <p className="text-gray-700 mb-2">{hub}</p>
              <div className="space-y-2">
                {tiers.map(tier => (
                  <label key={`${hub}-${tier}`} className="flex items-center space-x-3 p-3 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer">
                    <input
                      type="radio"
                      name={`tier-${hub}`}
                      checked={selectedTiers[hub] === tier}
                      onChange={() => onTierSelect(hub, tier)}
                      className="h-4 w-4 text-orange-500 border-gray-300"
                    />
                    <span className="text-gray-800">{tier}</span>
                  </label>
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-2 italic">
                * Enterprise solutions available upon request
              </div>
            </div>
          ))}
        </div>

        {/* Column 3: Service Model Selection */}
        <div>
          <h3 className="text-lg font-medium mb-4">3. Select Service Model(s)</h3>
          {selectedHubs.map(hub => (
            selectedTiers[hub] && (
              <div key={hub} className="mb-4">
                <p className="text-gray-700 mb-2">{`${hub} (${selectedTiers[hub]})`}</p>
                <div className="space-y-2">
                  {models.map(model => (
                    <label key={`${hub}-${model}`} className="flex items-center space-x-3 p-3 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer">
                      <input
                        type="radio"
                        name={`model-${hub}`}
                        checked={selectedModels[hub] === model}
                        onChange={() => onModelSelect(hub, model)}
                        className="h-4 w-4 text-orange-500 border-gray-300"
                      />
                      <span className="text-gray-800">{model}</span>
                    </label>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      <button
        onClick={() => {}} // This will be handled by the parent component
        className="mx-auto block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors"
      >
        Calculate My Price
      </button>
    </div>
  );
};
