import React from 'react';
import { Dialog } from '@headlessui/react';

export const HubSpotFormModal = ({ isOpen, onClose, onSuccess, selectedPackages }) => {
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

          <div id="hubspotForm">
            {/* HubSpot Form will be injected here */}
          </div>

          <input 
            type="hidden" 
            name="selected_packages" 
            value={JSON.stringify(selectedPackages)} 
          />

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={onSuccess}
              className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
            >
              Submit
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
