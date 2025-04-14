import React from 'react';

export function SelectionInterface({
  selectedHubs,
  setSelectedHubs,
  selectedTiers,
  setSelectedTiers,
  selectedModels,
  setSelectedModels
}) {
  const hubs = ['Marketing Hub', 'Sales Hub', 'Service Hub'];
  const tiers = ['Starter', 'Professional', 'Enterprise'];
  const serviceModels = [
    'DIY - Do It Yourself',
    'DWMe - Do It With Me',
    'DIFMe - Do It For Me'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Hub Selection */}
      <div>
        <h3 className="text-lg font-helvetica font-light mb-4">
          1. Select Hub(s)
        </h3>
        <div className="space-y-2">
          {hubs.map(hub => (
            <label
              key={hub}
              className="flex items-center p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={selectedHubs.includes(hub)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedHubs([...selectedHubs, hub]);
                  } else {
                    setSelectedHubs(selectedHubs.filter(h => h !== hub));
                    const newTiers = { ...selectedTiers };
                    const newModels = { ...selectedModels };
                    delete newTiers[hub];
                    delete newModels[hub];
                    setSelectedTiers(newTiers);
                    setSelectedModels(newModels);
                  }
                }}
                className="mr-3"
              />
              <span className="font-helvetica">{hub}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tier Selection */}
      <div>
        <h3 className="text-lg font-helvetica font-light mb-4">
          2. Select Tier(s)
        </h3>
        {selectedHubs.length === 0 ? (
          <p className="text-leapforce-gray-light italic">
            Please select a hub first
          </p>
        ) : (
          <div className="space-y-6">
            {selectedHubs.map(hub => (
              <div key={`tier-${hub}`}>
                <h4 className="font-helvetica mb-2">{hub}</h4>
                <div className="space-y-2">
                  {tiers.map(tier => (
                    <label
                      key={`${hub}-${tier}`}
                      className="flex items-center p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="radio"
                        name={`tier-${hub}`}
                        checked={selectedTiers[hub] === tier}
                        onChange={() => {
                          setSelectedTiers({
                            ...selectedTiers,
                            [hub]: tier
                          });
                        }}
                        className="mr-3"
                      />
                      <span className="font-helvetica">{tier}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Service Model Selection */}
      <div>
        <h3 className="text-lg font-helvetica font-light mb-4">
          3. Select Service Model(s)
        </h3>
        {selectedHubs.length === 0 ? (
          <p className="text-leapforce-gray-light italic">
            Please select a hub and tier first
          </p>
        ) : (
          <div className="space-y-6">
            {selectedHubs.map(hub => (
              <div key={`model-${hub}`}>
                <h4 className="font-helvetica mb-2">
                  {hub} ({selectedTiers[hub] || 'No tier selected'})
                </h4>
                <div className="space-y-2">
                  {serviceModels.map(model => (
                    <label
                      key={`${hub}-${model}`}
                      className="flex items-center p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="radio"
                        name={`model-${hub}`}
                        checked={selectedModels[hub] === model}
                        onChange={() => {
                          setSelectedModels({
                            ...selectedModels,
                            [hub]: model
                          });
                        }}
                        className="mr-3"
                      />
                      <span className="font-helvetica">{model}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
