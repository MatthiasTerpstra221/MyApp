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

// HubSpot Form Fix
// Ensures that the HubSpot form captures all selection data correctly
// and provides a seamless transition to the results display

// Function to initialize form with proper data capture
function initHubSpotFormWithResults() {
  console.log("Initializing HubSpot form integration with results handling");
  
  // Find form submission related elements
  const formContainer = document.querySelector('.hs-form-container');
  const submitButtons = document.querySelectorAll('.form-submit-btn');
  
  if (!formContainer) {
    console.error("HubSpot form container not found");
    return;
  }
  
  // Listen for the HubSpot form to be loaded
  const observer = new MutationObserver(function(mutations, observer) {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length && mutation.addedNodes[0].classList && mutation.addedNodes[0].classList.contains('hs-form')) {
        console.log("HubSpot form detected in DOM");
        
        // Get the form element
        const hsForm = mutation.addedNodes[0];
        
        // Find the hidden onboarding key field
        const onboardingKeyField = hsForm.querySelector('input[name="hubspot_standard_onboarding_key"]');
        if (!onboardingKeyField) {
          console.error("Onboarding key field not found in HubSpot form");
          return;
        }
        
        // Also look for the hidden contact property field
        const contactPropertyField = hsForm.querySelector('input[name="contact_hubspot_owner_id"]');
        
        // Capture form submission
        hsForm.addEventListener('submit', function(event) {
          console.log("Form submission detected");
          
          // Ensure onboarding key is set
          const onboardingKey = onboardingKeyField.value;
          if (!onboardingKey) {
            console.error("No onboarding key found at submission time");
            return;
          }
          
          // Also ensure contact property is set
          if (contactPropertyField && !contactPropertyField.value) {
            // Default HubSpot owner ID for Matthias - this should be configured as needed
            contactPropertyField.value = "51812602";
            console.log("Set contact property field to default owner ID");
          }
          
          // Store the package key for results display
          localStorage.setItem('hubspot_onboarding_key', onboardingKey);
          
          // Custom submission handling
          // Note: We don't prevent default as we want HubSpot to still handle the form
          // We'll show our own results after submission
        });
        
        // Hook into the HubSpot form's success handler
        window.addEventListener('message', function(event) {
          if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmit') {
            console.log("HubSpot form submitted successfully");
            
            // Get the onboarding key
            const onboardingKey = localStorage.getItem('hubspot_onboarding_key');
            
            // Show results directly on the page
            showResultsAfterSubmission(onboardingKey);
          }
        });
        
        // Stop observing once we've found the form
        observer.disconnect();
        break;
      }
    }
  });
  
  // Start observing
  observer.observe(formContainer, { childList: true, subtree: true });
  
  // Handle custom calculate button clicks to ensure they populate the hidden field
  if (submitButtons.length) {
    submitButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        // Don't trigger the normal click handler
        event.preventDefault();
        
        // Generate the onboarding key based on selections
        const onboardingKey = generateOnboardingKey();
        console.log("Generated onboarding key:", onboardingKey);
        
        // Store for use with form
        localStorage.setItem('hubspot_onboarding_key', onboardingKey);
        
        // Find and set the value in the HubSpot form field
        const hsForm = document.querySelector('.hs-form');
        if (hsForm) {
          // Set the onboarding key
          const onboardingKeyField = hsForm.querySelector('input[name="hubspot_standard_onboarding_key"]');
          if (onboardingKeyField) {
            onboardingKeyField.value = onboardingKey;
            console.log("Set onboarding key in form field:", onboardingKey);
          }
          
          // Also set the contact property field
          const contactPropertyField = hsForm.querySelector('input[name="contact_hubspot_owner_id"]');
          if (contactPropertyField) {
            // Default HubSpot owner ID for Matthias
            contactPropertyField.value = "51812602";
            console.log("Set contact property field to default owner ID");
          } else {
            console.warn("Contact property field not found in form");
            
            // Try to create it if it doesn't exist
            if (hsForm) {
              const newField = document.createElement('input');
              newField.type = 'hidden';
              newField.name = 'contact_hubspot_owner_id';
              newField.value = '51812602';
              hsForm.appendChild(newField);
              console.log("Created contact property field and set to default owner ID");
            }
          }
          
          // Submit the form
          const submitButton = hsForm.querySelector('input[type="submit"]');
          if (submitButton) {
            submitButton.click();
          }
        } else {
          console.error("HubSpot form not found for onboarding key insertion");
          
          // If form not found, show results directly
          showResultsAfterSubmission(onboardingKey);
        }
      });
    });
  }
  
  // Check for direct access via URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const showResults = urlParams.get('show_results');
  const onboardingKey = urlParams.get('onboarding_key');
  
  if (showResults === 'true' && onboardingKey) {
    console.log("Direct access with onboarding key:", onboardingKey);
    showResultsAfterSubmission(onboardingKey);
  }
}

// Helper function to generate onboarding key from selections
function generateOnboardingKey() {
  // Get selected hubs and tiers
  const marketingTier = localStorage.getItem('marketing_hub_tier') || 'none';
  const salesTier = localStorage.getItem('sales_hub_tier') || 'none';
  const serviceTier = localStorage.getItem('service_hub_tier') || 'none';
  
  // Get selected service models for each hub
  const marketingModel = localStorage.getItem('marketing_service_model') || 'none';
  const salesModel = localStorage.getItem('sales_service_model') || 'none';
  const serviceModel = localStorage.getItem('service_service_model') || 'none';
  
  // Determine the package key based on selections
  let packageKey = '';
  
  // Check each hub and use the corresponding package key
  if (marketingTier !== 'none' && marketingModel !== 'none') {
    packageKey = `marketing_hub_${marketingTier.toLowerCase()}_${marketingModel.toLowerCase()}`;
  } else if (salesTier !== 'none' && salesModel !== 'none') {
    packageKey = `sales_hub_${salesTier.toLowerCase()}_${salesModel.toLowerCase()}`;
  } else if (serviceTier !== 'none' && serviceModel !== 'none') {
    packageKey = `service_hub_${serviceTier.toLowerCase()}_${serviceModel.toLowerCase()}`;
  }
  
  return packageKey;
}

// Function to show results after form submission
function showResultsAfterSubmission(packageKey) {
  // Close any open popups
  const popupContainer = document.querySelector('.popup-container');
  if (popupContainer) {
    popupContainer.style.display = 'none';
  }
  
  // Scroll to top for better user experience
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Wait to ensure DOM is ready
  setTimeout(() => {
    // Make sure we have the data available
    if (typeof hubspotOnboardingData === 'undefined') {
      console.error('Calculator data not loaded!');
      return;
    }
    
    // Show the results section
    const resultsContainer = document.getElementById('final-results-container');
    if (!resultsContainer) {
      console.error('Results container not found!');
      return;
    }
    
    // Get package details
    const packageDetails = hubspotOnboardingData.getPackageByKey(packageKey);
    
    if (!packageDetails) {
      resultsContainer.innerHTML = `
        <div class="results-error">
          <h3>Package Not Found</h3>
          <p>The selected package (${packageKey}) could not be found in our system.</p>
          <a href="index.html" class="btn">Return to Calculator</a>
        </div>
      `;
      resultsContainer.style.display = 'block';
      return;
    }
    
    // Format hub, tier, and service model names for display
    const hubName = packageDetails.hub.charAt(0).toUpperCase() + packageDetails.hub.slice(1);
    
    let tierName = packageDetails.tier;
    if (tierName === 'pro') tierName = 'Professional';
    else tierName = tierName.charAt(0).toUpperCase() + tierName.slice(1);
    
    let modelName = '';
    switch(packageDetails.serviceModel) {
      case 'diy':
        modelName = 'Do It Yourself (DIY)';
        break;
      case 'diwme':
        modelName = 'Do It With Me (DIWMe)';
        break;
      case 'difme':
        modelName = 'Do It For Me (DIFMe)';
        break;
    }
    
    // Format price
    const price = typeof packageDetails.price === 'number' 
      ? '€' + packageDetails.price.toLocaleString() 
      : packageDetails.price;
    
    // Render package details
    resultsContainer.innerHTML = `
      <div class="results-container">
        <div class="results-header">
          <h2>Your HubSpot Onboarding Package</h2>
          <a href="index.html" class="btn"><i class="fas fa-calculator icon"></i>Recalculate</a>
        </div>
        
        <div class="package-summary">
          <h3>${hubName} Hub - ${tierName} Tier</h3>
          <p class="service-model">${modelName}</p>
          
          <div class="package-details">
            <div class="detail-row">
              <span class="detail-label"><i class="fas fa-tag icon icon-orange"></i>Package Reference:</span>
              <span class="detail-value">${packageDetails.packageKey}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label"><i class="fas fa-clock icon icon-orange"></i>Estimated Hours:</span>
              <span class="detail-value">${packageDetails.hours || 'Custom'}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label"><i class="fas fa-euro-sign icon icon-orange"></i>Price:</span>
              <span class="detail-value price-value">${price}</span>
            </div>
          </div>
          
          <div class="scope-summary">
            <h4><i class="fas fa-file-alt icon icon-orange"></i>Scope Summary</h4>
            <p>${packageDetails.scopeSummary || 'Custom scope based on your specific requirements. Please contact us for details.'}</p>
          </div>
        </div>
        
        <div class="next-steps">
          <h3><i class="fas fa-check-circle icon icon-orange"></i>Thank You for Your Submission!</h3>
          <p>Your HubSpot onboarding package has been submitted successfully. A Leapforce consultant will contact you shortly to discuss your selected package and any customizations you might need.</p>
          
          <div class="actions-row">
            <a href="https://www.leapforce.nl/contact" target="_blank" class="btn"><i class="fas fa-envelope icon"></i>Contact Us</a>
            <a href="https://meetings.hubspot.com/leo-braak/leo-matthias?uuid=e7f1fa4c-1a89-4e21-8c03-60b8dc1c0145" target="_blank" class="btn btn-secondary"><i class="fas fa-calendar-alt icon"></i>Schedule a Call</a>
          </div>
        </div>
      </div>
    `;
    
    // Show the results section
    resultsContainer.style.display = 'block';
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
  }, 500);
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initHubSpotFormWithResults();
}); 