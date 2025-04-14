import React from 'react';

// This would normally come from your database/API
const packageData = {
  "marketing.hub_starter_diy": {
    hub: "Marketing Hub",
    tier: "Starter",
    serviceModel: "Do It Yourself (DIY)",
    hours: 8,
    price: 1080,
    scopeSummary: "We guide you on basic portal \"getting started\" steps—tracking code, one lead-capture form, one email template—but you implement them. Includes 2 coaching sessions for Q&A and best practices."
  },
  "marketing.hub_starter_dwme": {
    hub: "Marketing Hub",
    tier: "Starter",
    serviceModel: "Do It With Me (DWMe)",
    hours: 12,
    price: 1620,
    scopeSummary: "We collaborate on the same starter setup (tracking code, forms, email templates) plus 2 simple automations and a basic reporting dashboard. We handle some tasks; you handle others. Includes 3 coaching sessions."
  }
  // ... add all other packages from your Excel sheet
};

export function ResultsDisplay({ selectedPackages }) {
  const packages = selectedPackages.map(key => packageData[key]).filter(Boolean);
  const totalHours = packages.reduce((sum, pkg) => sum + (pkg.hours || 0), 0);
  const totalPrice = packages.reduce((sum, pkg) => sum + (pkg.price || 0), 0);
  const hasEnterprise = packages.some(pkg => pkg.tier === 'Enterprise');

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-helvetica font-light mb-6">
        Your HubSpot Onboarding Package
      </h2>

      {/* Individual Package Cards */}
      <div className="space-y-6 mb-8">
        {packages.map(pkg => (
          <div 
            key={`${pkg.hub}-${pkg.tier}-${pkg.serviceModel}`}
            className="bg-[#f6f6f6] rounded-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-helvetica">
                {pkg.hub} - {pkg.tier}
                <span className="text-leapforce-gray ml-2">
                  ({pkg.serviceModel})
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-4">
              <div>
                <p className="text-leapforce-gray mb-1">Hours</p>
                <p className="text-xl font-helvetica">
                  {pkg.hours || 'On request'}
                </p>
              </div>
              <div>
                <p className="text-leapforce-gray mb-1">Price</p>
                <p className="text-xl font-helvetica">
                  {pkg.price ? `€${pkg.price}` : 'On request'}
                </p>
              </div>
            </div>

            <div>
              <p className="text-leapforce-gray mb-1">Scope Summary</p>
              <p className="font-helvetica">{pkg.scopeSummary}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Totals Section */}
      <div className="bg-leapforce-gray-dark text-white rounded-lg p-6">
        <h3 className="text-lg font-helvetica mb-4">Total</h3>
        <div className="flex justify-between">
          <div>
            <p className="text-gray-300 mb-1">Total Hours</p>
            <p className="text-2xl font-helvetica">
              {hasEnterprise ? 'On request' : totalHours}
            </p>
          </div>
          <div>
            <p className="text-gray-300 mb-1">Total Price</p>
            <p className="text-2xl font-helvetica">
              {hasEnterprise ? 'On request' : `€${totalPrice}`}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <a
          href="https://meetings.hubspot.com/leo-braak/leo-matthias?uuid=e7f1fa4c-1a89-4e21-8c03-60b8dc1c0145"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 
                   border border-leapforce-orange text-base font-helvetica 
                   rounded-md text-leapforce-orange bg-white 
                   hover:bg-leapforce-orange-light/10 transition-colors duration-150"
        >
          Book a Call
        </a>
        <a
          href="https://leapforce.nl/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 
                   border border-transparent text-base font-helvetica 
                   rounded-md text-white bg-leapforce-orange 
                   hover:bg-leapforce-orange-dark transition-colors duration-150"
        >
          Contact Leapforce
        </a>
      </div>
    </div>
  );
}
