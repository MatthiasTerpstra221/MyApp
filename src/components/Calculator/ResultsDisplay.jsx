import React from 'react';

// Complete package data with all combinations
const packageData = {
  "marketing_hub_starter_diy": {
    hub: "Marketing Hub",
    tier: "Starter",
    serviceModel: "Do It Yourself (DIY)",
    hours: 8,
    price: 1080,
    scopeSummary: "We guide you on basic portal \"getting started\" steps—tracking code, one lead-capture form, one email template—but you implement them. Includes 2 coaching sessions for Q&A and best practices."
  },
  "marketing_hub_starter_dwme": {
    hub: "Marketing Hub",
    tier: "Starter",
    serviceModel: "Do It With Me (DWMe)",
    hours: 12,
    price: 1620,
    scopeSummary: "We collaborate on the same starter setup (tracking code, forms, email templates) plus 2 simple automations and a basic reporting dashboard. We handle some tasks; you handle others. Includes 3 coaching sessions."
  },
  "marketing_hub_starter_difm": {
    hub: "Marketing Hub",
    tier: "Starter",
    serviceModel: "Do It For Me (DIFMe)",
    hours: 16,
    price: 2160,
    scopeSummary: "We handle the complete starter setup including tracking code, forms, email templates, plus 3 automations and comprehensive reporting dashboard. You just need to provide content and approval. Includes 4 review sessions."
  },
  "marketing_hub_professional_diy": {
    hub: "Marketing Hub",
    tier: "Professional",
    serviceModel: "Do It Yourself (DIY)",
    hours: 16,
    price: 2160,
    scopeSummary: "We provide guidance for advanced features setup—custom properties, workflows, landing pages—but you implement them. Includes 4 coaching sessions for strategy and best practices."
  },
  "marketing_hub_professional_dwme": {
    hub: "Marketing Hub",
    tier: "Professional",
    serviceModel: "Do It With Me (DWMe)",
    hours: 24,
    price: 3240,
    scopeSummary: "We collaborate on professional features setup including custom properties, workflows, landing pages, and advanced reporting. Split implementation between our teams. Includes 6 coaching sessions."
  },
  "marketing_hub_professional_difm": {
    hub: "Marketing Hub",
    tier: "Professional",
    serviceModel: "Do It For Me (DIFMe)",
    hours: 32,
    price: 4320,
    scopeSummary: "We handle the complete professional setup including all advanced features, complex workflows, and custom reporting. You provide content and approval. Includes 8 review sessions."
  },
  "sales_hub_starter_diy": {
    hub: "Sales Hub",
    tier: "Starter",
    serviceModel: "Do It Yourself (DIY)",
    hours: 8,
    price: 1080,
    scopeSummary: "We guide you through basic sales tools setup—email templates, sequences, and basic pipeline—but you implement them. Includes 2 coaching sessions."
  },
  "sales_hub_starter_dwme": {
    hub: "Sales Hub",
    tier: "Starter",
    serviceModel: "Do It With Me (DWMe)",
    hours: 12,
    price: 1620,
    scopeSummary: "We collaborate on sales tools setup including templates, sequences, pipeline, and basic reporting. Split implementation between teams. Includes 3 coaching sessions."
  },
  "sales_hub_starter_difm": {
    hub: "Sales Hub",
    tier: "Starter",
    serviceModel: "Do It For Me (DIFMe)",
    hours: 16,
    price: 2160,
    scopeSummary: "We handle complete sales tools setup including all starter features and basic automation. You provide process information and approval. Includes 4 review sessions."
  },
  "sales_hub_professional_diy": {
    hub: "Sales Hub",
    tier: "Professional",
    serviceModel: "Do It Yourself (DIY)",
    hours: 16,
    price: 2160,
    scopeSummary: "We guide you through advanced sales features—custom properties, workflows, forecasting—but you implement them. Includes 4 coaching sessions."
  },
  "sales_hub_professional_dwme": {
    hub: "Sales Hub",
    tier: "Professional",
    serviceModel: "Do It With Me (DWMe)",
    hours: 24,
    price: 3240,
    scopeSummary: "We collaborate on professional sales features including custom properties, workflows, forecasting, and advanced reporting. Split implementation. Includes 6 coaching sessions."
  },
  "sales_hub_professional_difm": {
    hub: "Sales Hub",
    tier: "Professional",
    serviceModel: "Do It For Me (DIFMe)",
    hours: 32,
    price: 4320,
    scopeSummary: "We handle complete professional sales setup including all advanced features and complex automations. You provide process information and approval. Includes 8 review sessions."
  },
  "service_hub_starter_diy": {
    hub: "Service Hub",
    tier: "Starter",
    serviceModel: "Do It Yourself (DIY)",
    hours: 8,
    price: 1080,
    scopeSummary: "We guide you through basic service tools setup—tickets, knowledge base structure, and basic automation—but you implement them. Includes 2 coaching sessions."
  },
  "service_hub_starter_dwme": {
    hub: "Service Hub",
    tier: "Starter",
    serviceModel: "Do It With Me (DWMe)",
    hours: 12,
    price: 1620,
    scopeSummary: "We collaborate on service tools setup including tickets, knowledge base, and basic automation. Split implementation between teams. Includes 3 coaching sessions."
  },
  "service_hub_starter_difm": {
    hub: "Service Hub",
    tier: "Starter",
    serviceModel: "Do It For Me (DIFMe)",
    hours: 16,
    price: 2160,
    scopeSummary: "We handle complete service tools setup including all starter features and basic automation. You provide process information and approval. Includes 4 review sessions."
  },
  "service_hub_professional_diy": {
    hub: "Service Hub",
    tier: "Professional",
    serviceModel: "Do It Yourself (DIY)",
    hours: 16,
    price: 2160,
    scopeSummary: "We guide you through advanced service features—custom properties, workflows, advanced automation—but you implement them. Includes 4 coaching sessions."
  },
  "service_hub_professional_dwme": {
    hub: "Service Hub",
    tier: "Professional",
    serviceModel: "Do It With Me (DWMe)",
    hours: 24,
    price: 3240,
    scopeSummary: "We collaborate on professional service features including custom properties, workflows, and advanced automation. Split implementation. Includes 6 coaching sessions."
  },
  "service_hub_professional_difm": {
    hub: "Service Hub",
    tier: "Professional",
    serviceModel: "Do It For Me (DIFMe)",
    hours: 32,
    price: 4320,
    scopeSummary: "We handle complete professional service setup including all advanced features and complex automations. You provide process information and approval. Includes 8 review sessions."
  }
};

export function ResultsDisplay({ packages }) {
  console.log("ResultsDisplay received packages:", packages);
  
  // Check if we received direct package objects or need to map from packageData
  const displayPackages = packages.map(pkg => {
    if (pkg.hub && pkg.tier && pkg.model) {
      // Direct package object - use as is
      return pkg;
    } else if (typeof pkg === 'string') {
      // Package key - map from packageData
      return packageData[pkg];
    }
    return null;
  }).filter(Boolean);

  // Calculate totals
  const totalHours = displayPackages.reduce((sum, pkg) => sum + (pkg.hours || 0), 0);
  const totalPrice = displayPackages.reduce((sum, pkg) => sum + (pkg.price || 0), 0);
  const hasEnterprise = displayPackages.some(pkg => pkg.tier === 'Enterprise');

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-helvetica font-light mb-6">
        Your HubSpot Onboarding Package
      </h2>

      {/* Individual Package Cards */}
      <div className="space-y-6 mb-8">
        {displayPackages.map((pkg, index) => (
          <div 
            key={`${pkg.hub}-${pkg.tier}-${pkg.serviceModel || pkg.model}-${index}`}
            className="bg-[#f6f6f6] rounded-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-helvetica">
                {pkg.hub} - {pkg.tier}
                <span className="text-leapforce-gray ml-2">
                  ({pkg.serviceModel || pkg.model})
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

      {/* Total Section */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between mb-2">
          <p className="text-lg font-medium">Total Hours:</p>
          <p className="text-lg font-medium">{totalHours}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg font-medium">Total Price:</p>
          <p className="text-lg font-medium">€{totalPrice}</p>
        </div>
        {hasEnterprise && (
          <p className="text-sm text-gray-500 mt-2">
            * Enterprise pricing is custom. Please contact us for a detailed quote.
          </p>
        )}
      </div>

      {/* Contact CTA */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <p className="text-center text-lg mb-4">
          Ready to get started with your HubSpot onboarding?
        </p>
        <div className="flex justify-center">
          <a
            href="https://meetings.hubspot.com/leo-braak/leo-matthias"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
          >
            Schedule a Call
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResultsDisplay;
