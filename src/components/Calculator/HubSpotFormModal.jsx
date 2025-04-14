import React, { useEffect } from 'react';
import { Dialog } from '@headlessui/react';

const HubSpotFormModal = ({ isOpen, onClose, selectedPackages }) => {
  useEffect(() => {
    if (isOpen) {
      // Clear any existing form
      const formContainer = document.getElementById('hubspotForm');
      if (formContainer) {
        formContainer.innerHTML = '';
      }

      // Generate package key string
      const packageKeys = selectedPackages.map(pkg => {
        const model = pkg.model.toLowerCase().replace(/\s+/g, '_');
        const hub = pkg.hub.toLowerCase().replace(/\s+/g, '_');
        const tier = pkg.tier.toLowerCase().replace(/\s+/g, '_');
        return `${model}_${hub}_${tier}`;
      }).join(',');

      // Create the form using the helper from index.html
      if (window.hsFormHelper) {
        window.hsFormHelper.createForm('hubspotForm', packageKeys);
      } else {
        // Fallback to direct creation if helper is not available
        window.hbspt.forms.create({
          portalId: "7208949",
          formId: "699d6d6a-52b4-4439-b6ea-2584491b8baa",
          region: "na1",
          target: '#hubspotForm',
          onFormReady: function($form) {
            // Find or create the hidden field
            let hiddenField = $form.querySelector('input[name="hubspot_standard_onboarding_key"]');
            if (!hiddenField) {
              hiddenField = document.createElement('input');
              hiddenField.type = 'hidden';
              hiddenField.name = 'hubspot_standard_onboarding_key';
              $form.appendChild(hiddenField);
            }
            // Set the package keys
            hiddenField.value = packageKeys;
            console.log('Form ready with package keys:', packageKeys);
          },
          onFormSubmitted: function() {
            console.log('Form submitted successfully');
            setTimeout(() => {
              onClose();
            }, 2000);
          }
        });
      }

      // Listen for form submission
      const handleFormSubmit = () => {
        setTimeout(() => {
          onClose();
        }, 2000);
      };

      window.addEventListener('hubspotFormSubmitted', handleFormSubmit);

      // Cleanup
      return () => {
        window.removeEventListener('hubspotFormSubmitted', handleFormSubmit);
      };
    }
  }, [isOpen, selectedPackages, onClose]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
            Get Your Custom HubSpot Onboarding Quote
          </Dialog.Title>

          <div id="hubspotForm" className="hubspot-form-container">
            {/* HubSpot form will be injected here */}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default HubSpotFormModal;
