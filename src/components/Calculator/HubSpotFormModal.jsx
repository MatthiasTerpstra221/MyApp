import React, { useEffect } from 'react';
import { Dialog } from '@headlessui/react';

const HubSpotFormModal = ({ isOpen, onClose, selectedPackages }) => {
  useEffect(() => {
    if (isOpen && window.hbspt) {
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

      // Create HubSpot form with the package keys
      window.hbspt.forms.create({
        region: "na1",
        portalId: "2900440",
        formId: "4b4d9f9c-1b86-4a2d-a847-3f1e337ced0b",
        target: '#hubspotForm',
        onFormReady: (form) => {
          // Find the hidden field for package keys
          const hiddenField = form.querySelector('input[name="hubspot_standard_onboarding_key"]');
          if (hiddenField) {
            hiddenField.value = packageKeys;
          }
        },
        onFormSubmit: (form) => {
          console.log('Form submitted with package keys:', packageKeys);
          setTimeout(() => {
            onClose();
          }, 2000);
        }
      });
    }
  }, [isOpen, selectedPackages]);

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
