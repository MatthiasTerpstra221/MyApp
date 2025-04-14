import React, { useEffect } from 'react';
import { Dialog } from '@headlessui/react';

export const HubSpotFormModal = ({ isOpen, onClose, onSuccess, selectedPackages }) => {
  useEffect(() => {
    if (isOpen) {
      // Wait for HubSpot form to be loaded
      const checkFormInterval = setInterval(() => {
        const form = document.querySelector('form.hs-form');
        if (form) {
          clearInterval(checkFormInterval);
          
          // Get package keys and join them with semicolons
          const packageKeys = selectedPackages
            .map(pkg => pkg.packageKey)
            .join(';');

          // Try multiple methods to set the hidden field value
          // 1. Try to find the hidden input directly
          let hiddenField = form.querySelector('input[name="hubspot_standard_onboarding_key"]');
          
          // 2. If not found, look for the field wrapper
          if (!hiddenField) {
            const fieldWrapper = form.querySelector('.hs_hubspot_standard_onboarding_key');
            if (fieldWrapper) {
              hiddenField = fieldWrapper.querySelector('input');
            }
          }

          // 3. If still not found, create the hidden input
          if (!hiddenField) {
            hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = 'hubspot_standard_onboarding_key';
            form.appendChild(hiddenField);
          }

          // Set the value and ensure it's set with both methods
          if (hiddenField) {
            hiddenField.value = packageKeys;
            hiddenField.setAttribute('value', packageKeys);
            
            // Log for debugging
            console.log('Hidden field value set:', packageKeys);
          }
        }
      }, 500); // Check every 500ms

      // Cleanup interval after 10 seconds if form never loads
      setTimeout(() => clearInterval(checkFormInterval), 10000);

      return () => {
        clearInterval(checkFormInterval);
      };
    }
  }, [isOpen, selectedPackages]);

  // Function to handle form submission
  const handleSubmit = () => {
    // Double-check the hidden field value before submission
    const form = document.querySelector('form.hs-form');
    if (form) {
      const hiddenField = form.querySelector('input[name="hubspot_standard_onboarding_key"]');
      if (hiddenField) {
        const packageKeys = selectedPackages
          .map(pkg => pkg.packageKey)
          .join(';');
        hiddenField.value = packageKeys;
      }
    }
    onSuccess();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-xl bg-white rounded-lg p-6">
          <Dialog.Title className="text-2xl font-bold mb-4">
            Complete Your Information
          </Dialog.Title>
          
          <div className="mb-4">
            <p className="text-gray-600">
              Please fill out the form below to receive your detailed onboarding package information.
            </p>
          </div>

          <div id="hubspotForm" className="mb-6">
            {/* HubSpot Form will be injected here */}
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 font-semibold"
            >
              Submit
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
