// src/components/Calculator/SelectionInterface.jsx
export function SelectionInterface({
  selectedHubs,
  setSelectedHubs,
  selectedTiers,
  setSelectedTiers,
  selectedModels,
  setSelectedModels
}) {
  const hubs = ['Marketing Hub', 'Sales Hub', 'Service Hub'];
  const tiers = ['Starter', 'Professional']; // Removed Enterprise from selectable options
  const serviceModels = [
    'DIY - Do It Yourself',
    'DWMe - Do It With Me',
    'DIFMe - Do It For Me'
  ];

  return (
    <div>
      {/* Improved introduction text */}
      <div className="mb-8 text-center">
        <p className="text-leapforce-gray mb-2">
          Start by selecting the HubSpot onboarding package that best fits your needs. 
          Once you've submitted the form, you'll receive a tailored overview of what's included.
        </p>
        <p className="text-leapforce-orange text-sm">
          Note: Enterprise onboardings are priced on request.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Rest of the selection interface code remains the same */}
        {/* ... */}
      </div>
    </div>
  );
}
