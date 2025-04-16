import React from 'react';

export const Footer = () => {
  return (
    <footer className="mt-16 pt-8">
      {/* CTA Section - Added inspiration from HubSpot Partner Directory */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg mb-12">
        <div className="px-6 py-10 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Ready to get started with HubSpot?
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-orange-100">
              Let us help you maximize your investment in HubSpot with our expert onboarding services.
            </p>
          </div>
          <div className="mt-8 flex flex-shrink-0 lg:mt-0 lg:ml-8">
            <a
              href="https://meetings.hubspot.com/leo-braak/leo-matthias?uuid=e7f1fa4c-1a89-4e21-8c03-60b8dc1c0145"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-orange-600 shadow-sm hover:bg-orange-50"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </div>
      
      {/* Top section with three columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Leapforce column */}
        <div>
          <h3 className="text-lg font-medium text-orange-500 mb-4">Leapforce</h3>
          <p className="text-gray-600 mb-2">HubSpot Agency Partner</p>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.linkedin.com/company/leapforce-nl/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Contact column */}
        <div>
          <h3 className="text-lg font-medium text-orange-500 mb-4">Contact</h3>
          <p className="text-gray-600 mb-2 flex items-center">
            <svg className="h-5 w-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <a href="mailto:info@leapforce.nl" className="hover:text-orange-600">
              info@leapforce.nl
            </a>
          </p>
          <p className="text-gray-600 mb-2 flex items-center">
            <svg className="h-5 w-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <a href="tel:+31202622333" className="hover:text-orange-600">
              +31 (0)20 2622333
            </a>
          </p>
          <p className="text-gray-600 flex items-center">
            <svg className="h-5 w-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>Amsterdam, Netherlands</span>
          </p>
        </div>
        
        {/* Disclaimer column */}
        <div>
          <h3 className="text-lg font-medium text-orange-500 mb-4">Disclaimer</h3>
          <p className="text-gray-600 mb-4">
            Prices shown are indicative. Final pricing may require a conversation or quote.
          </p>
        </div>
      </div>
      
      {/* Divider */}
      <div className="border-t border-gray-200 my-8"></div>
      
      {/* Copyright and links */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Leapforce. All rights reserved.</p>
        <div className="mt-4 md:mt-0">
          <a href="https://leapforce.nl/privacybeleid" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-600">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 