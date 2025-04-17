/**
 * HubSpot Form Helpers
 * Utilities to ensure hidden fields are properly populated in HubSpot forms
 */

(function() {
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Store references to common HubSpot form selectors
    const HubSpotFormSelectors = {
      form: 'form.hs-form',
      hiddenFields: 'input[type="hidden"]',
      submitButton: 'input.hs-button.primary'
    };

    /**
     * Ensures a hidden field is set in the HubSpot form
     * @param {HTMLFormElement} form - The HubSpot form element
     * @param {string} fieldName - The name of the hidden field
     * @param {string} fieldValue - The value to set
     * @returns {boolean} - Whether the operation was successful
     */
    function ensureHiddenField(form, fieldName, fieldValue) {
      if (!form || !fieldName || !fieldValue) return false;
      
      console.log(`[HubSpot Helper] Ensuring hidden field ${fieldName} is set to ${fieldValue}`);
      
      // Try to find the field
      let field = form.querySelector(`input[name="${fieldName}"]`);
      
      // If field exists, set its value
      if (field) {
        field.value = fieldValue;
        field.setAttribute('value', fieldValue);
        console.log(`[HubSpot Helper] Found and updated ${fieldName} field`);
        return true;
      }
      
      // If field doesn't exist, create it
      field = document.createElement('input');
      field.type = 'hidden';
      field.name = fieldName;
      field.value = fieldValue;
      field.setAttribute('value', fieldValue);
      form.appendChild(field);
      console.log(`[HubSpot Helper] Created new ${fieldName} field`);
      
      return true;
    }

    /**
     * Transfers values from page-level hidden inputs to HubSpot form hidden inputs
     * @param {HTMLFormElement} form - The HubSpot form element
     * @param {Array<string>} fieldNames - Array of field names to transfer
     */
    function transferHiddenValues(form, fieldNames) {
      if (!form || !fieldNames || !fieldNames.length) return;
      
      console.log('[HubSpot Helper] Transferring hidden values to form...');
      
      fieldNames.forEach(fieldName => {
        const pageInput = document.getElementById(fieldName);
        if (pageInput && pageInput.value) {
          ensureHiddenField(form, fieldName, pageInput.value);
          
          // Also store in sessionStorage as backup
          sessionStorage.setItem(fieldName, pageInput.value);
        } else {
          // Try to get from sessionStorage
          const storedValue = sessionStorage.getItem(fieldName);
          if (storedValue) {
            ensureHiddenField(form, fieldName, storedValue);
          }
        }
      });
    }

    /**
     * Adds a data attribute to the form with all important values as JSON
     * This provides another way for the backend to retrieve values
     * @param {HTMLFormElement} form - The HubSpot form element
     * @param {Object} dataObj - Object containing all values to include
     */
    function addDataAttributesToForm(form, dataObj) {
      if (!form || !dataObj) return;
      
      console.log('[HubSpot Helper] Adding data attributes to form...');
      
      // Add as JSON data attribute
      form.setAttribute('data-onboarding-data', JSON.stringify(dataObj));
      
      // Also add individual data attributes
      Object.keys(dataObj).forEach(key => {
        form.setAttribute(`data-${key.replace(/_/g, '-')}`, dataObj[key]);
      });
    }

    /**
     * Monitor for HubSpot form creation and enhance it
     */
    function watchForHubSpotForm() {
      // Check if form exists every 500ms until found or timeout
      let attempts = 0;
      const maxAttempts = 20; // 10 seconds max
      
      const checkInterval = setInterval(() => {
        const form = document.querySelector(HubSpotFormSelectors.form);
        
        if (form) {
          clearInterval(checkInterval);
          console.log('[HubSpot Helper] HubSpot form found, enhancing...');
          
          // Get important values
          const fields = [
            'hubspot_standard_onboarding_key',
            'marketing_hub_tier',
            'sales_hub_tier',
            'service_hub_tier',
            'service_model'
          ];
          
          // Transfer values from page hidden inputs to form
          transferHiddenValues(form, fields);
          
          // Collect all values in one object
          const formData = {};
          fields.forEach(field => {
            const pageInput = document.getElementById(field);
            formData[field] = pageInput ? pageInput.value : sessionStorage.getItem(field) || '';
          });
          
          // Add as data attributes
          addDataAttributesToForm(form, formData);
          
          // Add submit handler to ensure values are set right before submission
          form.addEventListener('submit', function(e) {
            console.log('[HubSpot Helper] Form submission detected, final check...');
            
            // Do one last check/update of values
            transferHiddenValues(form, fields);
            
            // Let the form submission continue
            return true;
          });
        } else {
          attempts++;
          console.log(`[HubSpot Helper] Waiting for HubSpot form... Attempt ${attempts}/${maxAttempts}`);
          
          if (attempts >= maxAttempts) {
            clearInterval(checkInterval);
            console.log('[HubSpot Helper] Timed out waiting for HubSpot form');
          }
        }
      }, 500);
    }

    // Expose utilities to global scope
    window.HubSpotFormHelpers = {
      ensureHiddenField,
      transferHiddenValues,
      addDataAttributesToForm,
      watchForHubSpotForm
    };
    
    // Auto-start watching for form if not on thank you page
    if (!window.location.pathname.includes('thank-you')) {
      console.log('[HubSpot Helper] Automatically watching for HubSpot form...');
      setTimeout(watchForHubSpotForm, 1000); // Wait 1 second before starting
    }
  });
})(); 