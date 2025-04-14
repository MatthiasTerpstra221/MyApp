import React from 'react';
import leapforceLogo from '../../assets/leapforce-logo.png';
import hubspotBadge from '../../assets/hubspot-platinum-badge.png';

export const Header = () => {
  return (
    <div className="text-center">
      <div className="flex justify-between items-center mb-8">
        <img 
          src={leapforceLogo} 
          alt="Leapforce" 
          className="h-12"
        />
        <img 
          src={hubspotBadge} 
          alt="HubSpot Platinum Solutions Partner" 
          className="h-20"
        />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        HubSpot Onboarding Calculator
      </h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Start by selecting the HubSpot onboarding package that best fits your needs. 
        Once you've submitted the form, you'll receive a tailored overview of what's included.
        <br />
        <em className="text-orange-600">*Enterprise onboardings are priced on request.</em>
      </p>
    </div>
  );
};
