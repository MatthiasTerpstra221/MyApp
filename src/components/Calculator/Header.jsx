import React from 'react';

const Header = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Logo and Badge Container */}
        <div className="flex justify-center items-center space-x-6 mb-8">
          <img
            src="/leapforce-logo.png"
            alt="Leapforce"
            className="h-12 w-auto"
          />
          <img
            src="/hubspot-platinum-badge.png"
            alt="HubSpot Platinum Partner"
            className="h-20 w-auto"
          />
        </div>

        {/* Title and Description */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            HubSpot Onboarding Calculator
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-600 mb-2">
              Get Your HubSpot Onboarding Price in Minutes
            </p>
            
            <p className="text-base text-gray-500">
              Choose your HubSpot hub, tier, and service model to see how we can help you get started with HubSpot.
            </p>
          </div>
        </div>

        {/* Separator Line */}
        <div className="mt-8">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
