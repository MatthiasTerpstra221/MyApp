import React, { useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export function HubSpotFormModal({ 
  isOpen, 
  onClose, 
  selectedPackages,
  onSubmitSuccess 
}) {
  useEffect(() => {
    if (isOpen && window.hbspt) {
      // Clear any existing form
      const container = document.getElementById('hubspot-form-container');
      if (container) {
        container.innerHTML = '';
      }

      // Create new form
      window.hbspt.forms.create({
        portalId: "7208949",
        formId: "699d6d6a-52b4-4439-b6ea-2584491b8baa",
        region: "na1",
        target: "#hubspot-form-container",
        onFormReady: (form) => {
          // Add hidden field for package keys
          const hiddenInput = document.createElement('input');
          hiddenInput.type = 'hidden';
          hiddenInput.name = 'hubspot_standard_onboarding_key';
          hiddenInput.value = selectedPackages.join(';');
          form.appendChild(hiddenInput);
        },
        onFormSubmitted: () => {
          onSubmitSuccess();
        }
      });
    }
  }, [isOpen, selectedPackages, onSubmitSuccess]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay 
          className="fixed inset-0 bg-black/30" 
        />
        
        <div className="relative bg-white rounded-lg max-w-md w-full mx-auto p-6">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-leapforce-gray hover:text-leapforce-gray-dark"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <Dialog.Title className="text-xl font-helvetica font-light mb-4">
            Almost there!
          </Dialog.Title>
          
          <p className="text-leapforce-gray mb-6">
            Enter your email to see your personalized HubSpot onboarding price and scope.
          </p>

          <div id="hubspot-form-container" />
        </div>
      </div>
    </Dialog>
  );
}
