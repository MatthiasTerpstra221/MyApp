// Results Page Handler
// This script displays the selected package details directly on the page
// after form submission, creating a seamless user experience

document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a results page redirect
  const urlParams = new URLSearchParams(window.location.search);
  const showResults = urlParams.get('show_results');
  const onboardingKey = urlParams.get('onboarding_key');
  
  // If not showing results yet, exit early
  if (showResults !== 'true') return;
  
  // Load calculator data
  if (typeof hubspotOnboardingData === 'undefined') {
    console.error('Calculator data not loaded!');
    return;
  }
  
  // Find where to display results
  const resultsContainer = document.getElementById('final-results-container');
  if (!resultsContainer) {
    console.error('Results container not found!');
    return;
  }
  
  // Get selected data from storage or URL
  const packageKey = onboardingKey || localStorage.getItem('hubspot_onboarding_key');
  
  if (!packageKey) {
    resultsContainer.innerHTML = `
      <div class="results-error">
        <h3>Package Details Not Found</h3>
        <p>We couldn't retrieve your package selections. Please try calculating your package again.</p>
        <a href="index.html" class="btn">Return to Calculator</a>
      </div>
    `;
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
        <a href="index.html" class="btn">Recalculate</a>
      </div>
      
      <div class="package-summary">
        <h3>${hubName} Hub - ${tierName} Tier</h3>
        <p class="service-model">${modelName}</p>
        
        <div class="package-details">
          <div class="detail-row">
            <span class="detail-label">Package Reference:</span>
            <span class="detail-value">${packageDetails.packageKey}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Estimated Hours:</span>
            <span class="detail-value">${packageDetails.hours || 'Custom'}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Price:</span>
            <span class="detail-value price-value">${price}</span>
          </div>
        </div>
        
        <div class="scope-summary">
          <h4>Scope Summary</h4>
          <p>${packageDetails.scopeSummary || 'Custom scope based on your specific requirements. Please contact us for details.'}</p>
        </div>
      </div>
      
      <div class="next-steps">
        <h3>Next Steps</h3>
        <p>Thank you for using our HubSpot Onboarding Calculator. A Leapforce consultant will contact you shortly to discuss your selected package and any customizations you might need.</p>
        
        <div class="actions-row">
          <a href="https://www.leapforce.nl/contact" target="_blank" class="btn">Contact Us</a>
          <a href="https://meetings.hubspot.com/leo-braak/leo-matthias?uuid=e7f1fa4c-1a89-4e21-8c03-60b8dc1c0145" target="_blank" class="btn btn-secondary">Schedule a Call</a>
        </div>
      </div>
    </div>
  `;
  
  // Show the results section
  resultsContainer.style.display = 'block';
  
  // Scroll to results
  resultsContainer.scrollIntoView({ behavior: 'smooth' });
});

// Helper function to generate an onboarding results page URL
function generateResultsUrl(packageKey) {
  // Store the key in local storage as backup
  localStorage.setItem('hubspot_onboarding_key', packageKey);
  
  // Create URL with parameters
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?show_results=true&onboarding_key=${encodeURIComponent(packageKey)}`;
}

// Function to navigate to results after form submission
function showPackageResults(packageKey) {
  // Store the key and redirect
  localStorage.setItem('hubspot_onboarding_key', packageKey);
  window.location.href = generateResultsUrl(packageKey);
} 