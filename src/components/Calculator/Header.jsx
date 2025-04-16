import React from 'react';
import LeapforceButton from '../LeapforceButton';

// Add named export
export const Header = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Top Section with Logo and Badge */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                src="/leapforce-logo.png"
                alt="Leapforce Logo"
                className="h-12 w-auto"
                loading="eager"
                onError={(e) => {
                  console.error('Failed to load Leapforce logo');
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="hidden md:block">
              <h2 className="text-xl font-bold">Leapforce B.V.</h2>
              <p className="text-sm text-gray-500">HubSpot Platinum Solutions Partner</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <a 
                href="https://ecosystem.hubspot.com/marketplace/solutions/leapforce-nl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                View HubSpot Profile
              </a>
            </div>
            <div className="hidden md:block">
              <LeapforceButton />
            </div>
            <div className="flex-shrink-0">
              <img
                src="/hubspot-platinum-badge.png"
                alt="HubSpot Platinum Partner Badge"
                className="h-16 w-auto"
                loading="eager"
                onError={(e) => {
                  console.error('Failed to load HubSpot badge');
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* Client Rating Bar - Similar to the one in the image */}
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">4.9</h3>
                <p className="text-sm text-gray-500">Client Rating</p>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className="h-5 w-5 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                Based on 53 reviews
              </div>
            </div>
            <div className="mt-2 md:mt-0">
              <div className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full bg-green-100 text-green-800">
                HubSpot Platinum Solutions Partner
              </div>
            </div>
          </div>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
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

        {/* Expertise Badges Section */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['Marketing Hub', 'Sales Hub', 'Service Hub', 'Content Hub', 'Operations Hub'].map(hub => (
            <div 
              key={hub} 
              className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-800 flex items-center"
            >
              <svg className="h-4 w-4 mr-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {hub}
            </div>
          ))}
        </div>

        {/* Mobile View Button - Only visible on small screens */}
        <div className="md:hidden flex justify-center mb-6">
          <LeapforceButton />
        </div>

        {/* Separator Line */}
        <div>
          <div className="border-t border-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

// Keep the default export
export default Header;
