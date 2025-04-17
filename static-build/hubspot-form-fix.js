/**
 * HubSpot Form Fix
 * Ensures hidden fields are properly set in HubSpot forms
 * Specifically targets the onboarding package key field
 */

(function() {
  // Execute when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log("[HubSpot Fix] Initializing form fix script...");
    
    // Configuration
    const config = {
      hiddenFields: [
        'hubspot_standard_onboarding_key',
        'marketing_hub_tier',
        'sales_hub_tier',
        'service_hub_tier',
        'service_model'
      ],
      formSelector: '.hs-form',
      pollInterval: 500, // milliseconds to wait between form checks
      maxPolls: 20, // maximum number of times to check for form
      logPrefix: '[HubSpot Fix]'
    };
    
    /**
     * Logs a message with the script prefix
     */
    function log(message, level = 'log') {
      if (level === 'error') {
        console.error(`${config.logPrefix} ${message}`);
      } else if (level === 'warn') {
        console.warn(`${config.logPrefix} ${message}`);
      } else {
        console.log(`${config.logPrefix} ${message}`);
      }
    }
    
    /**
     * Gets a value from the most reliable source
     * Order: DOM element > localStorage > sessionStorage
     */
    function getFieldValue(fieldName) {
      // First try to get from page element
      const element = document.getElementById(fieldName);
      if (element && element.value) {
        log(`Found ${fieldName} in DOM: ${element.value}`);
        return element.value;
      }
      
      // Then try localStorage
      const localValue = localStorage.getItem(fieldName);
      if (localValue) {
        log(`Found ${fieldName} in localStorage: ${localValue}`);
        return localValue;
      }
      
      // Lastly try sessionStorage
      const sessionValue = sessionStorage.getItem(fieldName);
      if (sessionValue) {
        log(`Found ${fieldName} in sessionStorage: ${sessionValue}`);
        return sessionValue;
      }
      
      log(`Could not find value for ${fieldName}`, 'warn');
      return null;
    }
    
    /**
     * Ensures a hidden field is properly set in the form
     */
    function ensureHiddenField(form, fieldName, fieldValue) {
      if (!form || !fieldName || !fieldValue) {
        log(`Missing parameters for ensureHiddenField: ${form}, ${fieldName}, ${fieldValue}`, 'warn');
        return false;
      }
      
      try {
        // Try jQuery first if available
        if (window.jQuery) {
          const $form = window.jQuery(form);
          const $field = $form.find(`input[name="${fieldName}"]`);
          
          if ($field.length) {
            $field.val(fieldValue).attr('value', fieldValue);
            log(`Set ${fieldName} in form with jQuery: ${fieldValue}`);
            return true;
          } else {
            // Field doesn't exist, create it
            const newField = `<input type="hidden" name="${fieldName}" value="${fieldValue}">`;
            $form.append(newField);
            log(`Created ${fieldName} in form with jQuery: ${fieldValue}`);
            return true;
          }
        } 
        
        // Fallback to pure JS if jQuery not available
        let field = form.querySelector(`input[name="${fieldName}"]`);
        
        if (field) {
          field.value = fieldValue;
          field.setAttribute('value', fieldValue);
          log(`Set ${fieldName} in form with pure JS: ${fieldValue}`);
          return true;
        } else {
          // Field doesn't exist, create it
          field = document.createElement('input');
          field.type = 'hidden';
          field.name = fieldName;
          field.value = fieldValue;
          form.appendChild(field);
          log(`Created ${fieldName} in form with pure JS: ${fieldValue}`);
          return true;
        }
      } catch (error) {
        log(`Error setting ${fieldName}: ${error}`, 'error');
        return false;
      }
    }
    
    /**
     * Polls for the HubSpot form and enhances it when found
     */
    function pollForForm() {
      let pollCount = 0;
      
      const poll = setInterval(function() {
        pollCount++;
        log(`Polling for HubSpot form... (${pollCount}/${config.maxPolls})`);
        
        // First try to find the form
        const form = document.querySelector(config.formSelector);
        
        if (form) {
          clearInterval(poll);
          log(`Found HubSpot form! Enhancing with hidden fields...`);
          
          // Collect values for all hidden fields
          const fieldValues = {};
          config.hiddenFields.forEach(fieldName => {
            fieldValues[fieldName] = getFieldValue(fieldName);
          });
          
          // Attach value to form for debugging
          form.setAttribute('data-has-fix', 'true');
          
          // Set all fields in the form
          Object.keys(fieldValues).forEach(fieldName => {
            if (fieldValues[fieldName]) {
              ensureHiddenField(form, fieldName, fieldValues[fieldName]);
            }
          });
          
          // Also add a global variable as a last resort
          window._hubspotOnboardingKey = fieldValues.hubspot_standard_onboarding_key;
          
          // Add submit handler to ensure fields are set right before submission
          form.addEventListener('submit', function(event) {
            log('Form submission detected, final field verification...');
            
            // Update all fields one last time
            Object.keys(fieldValues).forEach(fieldName => {
              if (fieldValues[fieldName]) {
                ensureHiddenField(form, fieldName, fieldValues[fieldName]);
              }
            });
            
            // Make the key available in the global scope just in case
            window._hubspotFormSubmittedWithKey = fieldValues.hubspot_standard_onboarding_key;
            
            log('Form submitted with onboarding key: ' + fieldValues.hubspot_standard_onboarding_key);
          });
          
          log('Form enhancement complete!');
        } else if (pollCount >= config.maxPolls) {
          clearInterval(poll);
          log('Timed out waiting for HubSpot form', 'warn');
        }
      }, config.pollInterval);
    }
    
    // Start polling for the form
    pollForForm();
    
    // Wait for potential dynamic form loading
    window.addEventListener('load', function() {
      log('Window loaded, checking for form again...');
      
      // If we didn't find the form on DOMContentLoaded, try again now
      const form = document.querySelector(config.formSelector);
      if (!form) {
        setTimeout(pollForForm, 1000); // Wait a bit longer then poll again
      }
    });
    
    // Export functions to global scope
    window.HubSpotFormFix = {
      ensureHiddenField: ensureHiddenField,
      getFieldValue: getFieldValue,
      pollForForm: pollForForm
    };
    
    // Manual trigger for debugging
    window.HubSpotFixNow = function() {
      log('Manual trigger initiated');
      pollForForm();
    };
  });
})(); 