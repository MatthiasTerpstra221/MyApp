import React, { useState } from 'react';

export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('general');

  // Testimonials data inspired by the reviews in the image
  const testimonials = [
    {
      id: 1,
      name: "Thomas K.",
      company: "Marketing Agency",
      rating: 5,
      text: "Structured and fast integration thanks to Leapforce! Their step-by-step approach made the whole process clear and efficient. We're now getting much more out of HubSpot than we expected.",
      date: "October 2023"
    },
    {
      id: 2,
      name: "Sarah L.",
      company: "Tech Startup",
      rating: 5, 
      text: "A collaboration that feels like a true partnership. The team at Leapforce doesn't just implement HubSpot, they guide you through the entire journey and ensure you understand what they're doing and why.",
      date: "December 2023"
    },
    {
      id: 3,
      name: "Michael R.",
      company: "E-commerce Business",
      rating: 5,
      text: "Expert partner who significantly improved our commercial operations. The Leapforce team took the time to understand our business and tailored the HubSpot implementation to our specific needs.",
      date: "February 2024"
    },
  ];

  return (
    <div className="mt-16 mb-16">
      {/* Main About Section with Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About HubSpot Onboarding</h2>
          
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('general')}
                className={`${
                  activeTab === 'general'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                General
              </button>
              <button
                onClick={() => setActiveTab('tiers')}
                className={`${
                  activeTab === 'tiers'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Tiers
              </button>
              <button
                onClick={() => setActiveTab('serviceModels')}
                className={`${
                  activeTab === 'serviceModels'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Service Models
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="py-6">
            {activeTab === 'general' && (
              <div className="space-y-4">
                <p className="text-gray-700">
                  HubSpot onboarding is the process of setting up and configuring your HubSpot platform to effectively meet your marketing, sales, or service needs. 
                  At Leapforce, we specialize in helping businesses get up and running with HubSpot quickly and effectively.
                </p>
                <p className="text-gray-700">
                  Our onboarding packages are designed to provide the right level of support based on your specific needs, technical capabilities, and budget. 
                  Whether you need a simple starter package or advanced support, we have options to ensure your HubSpot implementation is successful.
                </p>
                <p className="text-gray-700">
                  Leapforce uses HubSpot's powerful CRM platform to provide fast follow-up and more personalized support to our clients.
                </p>
                
                {/* Service Highlights */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <svg className="h-6 w-6 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <h3 className="font-medium">Certified Expertise</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Our team consists of certified HubSpot specialists with years of implementation experience across industries.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <svg className="h-6 w-6 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      <h3 className="font-medium">Tailored Approach</h3>
                    </div>
                    <p className="text-gray-600 text-sm">We customize each implementation to fit your unique business needs, processes, and goals.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <svg className="h-6 w-6 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <h3 className="font-medium">Ongoing Support</h3>
                    </div>
                    <p className="text-gray-600 text-sm">We provide continuous guidance and assistance even after implementation to ensure long-term success.</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'tiers' && (
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-lg border-l-4 border-orange-400">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                    <svg className="h-5 w-5 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Starter
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Basic HubSpot functionality with essential features. Ideal for small businesses or those new to HubSpot who need fundamental setup and configuration.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">Lead Capture</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">Email Marketing</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">Basic Automation</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">Contact Management</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-lg border-l-4 border-orange-500">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                    <svg className="h-5 w-5 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    Professional
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Advanced features and capabilities for growing businesses. Includes more sophisticated automation, reporting, and customization options.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">Advanced Automation</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">Custom Reporting</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">Lead Scoring</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">Workflows</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">Advanced Analytics</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-lg border-l-4 border-orange-600">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                    <svg className="h-5 w-5 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Enterprise
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Comprehensive enterprise-level features with maximum flexibility and scalability. Custom pricing based on specific requirements and complexity.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">Advanced Permissions</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">Hierarchical Teams</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">Custom Objects</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">Advanced Reporting</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">API Integrations</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">Custom Solutions</span>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'serviceModels' && (
              <div className="space-y-8">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-orange-100 p-3 rounded-lg mr-4">
                      <svg className="h-6 w-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">DIY (Do It Yourself)</h3>
                      <p className="text-gray-700 mb-3">
                        We coach, you implement. Great for hands-on teams who want to learn by doing. We guide you on best practices and provide coaching sessions, but you handle the actual implementation in HubSpot.
                      </p>
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Best For:</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                          <li>Teams with technical capabilities</li>
                          <li>Organizations wanting to build in-house expertise</li>
                          <li>Businesses with budget constraints</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-orange-100 p-3 rounded-lg mr-4">
                      <svg className="h-6 w-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">DWMe (Do It With Me)</h3>
                      <p className="text-gray-700 mb-3">
                        Collaborative approach. We share the workload, ensuring a balanced mix of expert help and practical, in-house involvement. Some tasks are handled by Leapforce, while others are completed by your team.
                      </p>
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Best For:</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                          <li>Organizations wanting to participate in the process</li>
                          <li>Teams with limited time but wanting knowledge transfer</li>
                          <li>Businesses needing guidance on complex tasks</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-orange-100 p-3 rounded-lg mr-4">
                      <svg className="h-6 w-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">DIFMe (Do It For Me)</h3>
                      <p className="text-gray-700 mb-3">
                        Fully managed. Leapforce sets everything up while your team focuses on daily business. We handle nearly all setup and configuration in HubSpot, with minimal effort required from your team.
                      </p>
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Best For:</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                          <li>Teams with limited technical resources</li>
                          <li>Organizations with time constraints</li>
                          <li>Businesses looking for expert implementation</li>
                          <li>Complex HubSpot setups requiring specialized knowledge</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Client Testimonials Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-gray-50 p-5 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-gray-700 mb-3">
                  "{testimonial.text}"
                </blockquote>
                
                <p className="text-xs text-gray-500 text-right">{testimonial.date}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <a 
              href="https://www.hubspot.com/agencies/leapforce#reviews" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-orange-600 hover:text-orange-800"
            >
              See all reviews
              <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection; 