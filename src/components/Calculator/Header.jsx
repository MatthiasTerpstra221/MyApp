import React from 'react';

export function Header() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-leapforce-orange text-2xl mb-4 font-helvetica">
        Leapforce
      </h1>
      <h2 className="text-2xl font-helvetica font-light mb-2">
        HubSpot Onboarding Calculator
      </h2>
      <p className="text-lg mb-2 font-helvetica">
        Get Your HubSpot Onboarding Price in Minutes
      </p>
      <p className="text-leapforce-gray font-helvetica">
        Choose your HubSpot hub, tier, and service model to see how we can help you get started with HubSpot.
      </p>
    </div>
  );
}
