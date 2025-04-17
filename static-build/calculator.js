/**
 * HubSpot Onboarding Calculator
 * A professional calculator for estimating HubSpot onboarding costs
 */

// Global state to track current stage and selections
const state = {
    currentStage: 0,
    selectedHub: null,
    selectedPackage: null,
    selectedAddOns: [],
    totalPrice: 0
};

// Configuration for stages
const stages = [
    { title: "Select Hub", icon: "fa-solid fa-building" },
    { title: "Select Package", icon: "fa-solid fa-box" },
    { title: "Select Add-ons", icon: "fa-solid fa-puzzle-piece" },
    { title: "Summary", icon: "fa-solid fa-clipboard-check" }
];

// Data for hubs
const hubs = [
    {
        id: "sales",
        title: "Sales Hub",
        description: "Streamline your sales process and close more deals",
        icon: "fa-solid fa-handshake",
        features: [
            "Contact and deal management",
            "Email tracking and notifications",
            "Meeting scheduling",
            "Sales automation"
        ]
    },
    {
        id: "marketing",
        title: "Marketing Hub",
        description: "Attract, engage, and delight your audience",
        icon: "fa-solid fa-bullhorn",
        features: [
            "Email marketing campaigns",
            "Lead generation tools",
            "Marketing automation",
            "Analytics and reporting"
        ]
    },
    {
        id: "service",
        title: "Service Hub",
        description: "Transform customer service with connected tools",
        icon: "fa-solid fa-headset",
        features: [
            "Ticketing system",
            "Customer feedback",
            "Knowledge base",
            "Service automation"
        ]
    },
    {
        id: "cms",
        title: "CMS Hub",
        description: "Create and manage website content with ease",
        icon: "fa-solid fa-globe",
        features: [
            "Drag-and-drop editor",
            "Themes and templates",
            "SEO recommendations",
            "Website analytics"
        ]
    }
];

// Data for packages
const packages = {
    "sales": [
        {
            id: "sales-starter",
            title: "Starter",
            price: 1500,
            description: "Basic sales setup for small businesses",
            features: [
                "Initial HubSpot setup",
                "Deal pipeline configuration",
                "Email templates",
                "Basic reporting dashboard"
            ]
        },
        {
            id: "sales-professional",
            title: "Professional",
            price: 3000,
            description: "Comprehensive sales solution for growing teams",
            features: [
                "Everything in Starter",
                "Advanced pipeline management",
                "Sales automation setup",
                "Team training sessions",
                "Custom reporting"
            ]
        },
        {
            id: "sales-enterprise",
            title: "Enterprise",
            price: 5000,
            description: "Advanced sales platform for large organizations",
            features: [
                "Everything in Professional",
                "Multiple pipeline implementation",
                "Advanced workflow automation",
                "Sales playbooks",
                "Forecasting tools",
                "Team coaching"
            ]
        }
    ],
    "marketing": [
        {
            id: "marketing-starter",
            title: "Starter",
            price: 2000,
            description: "Essential marketing tools to get started",
            features: [
                "Email marketing setup",
                "Landing page creation",
                "Basic form implementation",
                "List segmentation"
            ]
        },
        {
            id: "marketing-professional",
            title: "Professional",
            price: 4000,
            description: "Full-featured marketing platform",
            features: [
                "Everything in Starter",
                "Marketing automation workflows",
                "Campaign strategy",
                "Content creation assistance",
                "Social media integration"
            ]
        },
        {
            id: "marketing-enterprise",
            title: "Enterprise",
            price: 6000,
            description: "Enterprise-grade marketing solution",
            features: [
                "Everything in Professional",
                "Advanced marketing automation",
                "Multi-channel campaign setup",
                "Custom reporting dashboards",
                "Predictive lead scoring",
                "Team training"
            ]
        }
    ],
    "service": [
        {
            id: "service-starter",
            title: "Starter",
            price: 1800,
            description: "Basic service tools for customer support",
            features: [
                "Ticketing system setup",
                "Email to ticket conversion",
                "Basic knowledge base",
                "Customer feedback surveys"
            ]
        },
        {
            id: "service-professional",
            title: "Professional",
            price: 3500,
            description: "Advanced service tools for growing teams",
            features: [
                "Everything in Starter",
                "Service automation",
                "Knowledge base expansion",
                "Custom service pipelines",
                "Team inbox setup"
            ]
        },
        {
            id: "service-enterprise",
            title: "Enterprise",
            price: 5500,
            description: "Enterprise-grade customer service platform",
            features: [
                "Everything in Professional",
                "Advanced reporting",
                "SLA management",
                "Custom workflows",
                "Team training and coaching",
                "Customer portal setup"
            ]
        }
    ],
    "cms": [
        {
            id: "cms-starter",
            title: "Starter",
            price: 2500,
            description: "Basic website setup and management",
            features: [
                "Website theme setup",
                "Basic page templates",
                "Content creation assistance",
                "SEO recommendations"
            ]
        },
        {
            id: "cms-professional",
            title: "Professional",
            price: 4500,
            description: "Professional website development and management",
            features: [
                "Everything in Starter",
                "Custom page templates",
                "Blog setup and strategy",
                "Form and CTA integration",
                "Website performance optimization"
            ]
        },
        {
            id: "cms-enterprise",
            title: "Enterprise",
            price: 7000,
            description: "Enterprise website solution with advanced features",
            features: [
                "Everything in Professional",
                "Custom website modules",
                "Advanced personalization",
                "Membership site setup",
                "Multi-language support",
                "A/B testing implementation"
            ]
        }
    ]
};

// Data for add-ons
const addOns = [
    {
        id: "data-migration",
        title: "Data Migration",
        price: 1200,
        description: "Migrate your existing data to HubSpot",
        features: [
            "Data mapping",
            "Import preparation",
            "Data cleanup",
            "Validation checks"
        ]
    },
    {
        id: "integration",
        title: "Custom Integration",
        price: 1500,
        description: "Connect HubSpot with your existing tools",
        features: [
            "API configuration",
            "Data synchronization",
            "Testing & validation",
            "Documentation"
        ]
    },
    {
        id: "training",
        title: "Advanced Training",
        price: 900,
        description: "Comprehensive training for your team",
        features: [
            "Role-based sessions",
            "Practical exercises",
            "Best practices",
            "Follow-up Q&A"
        ]
    },
    {
        id: "workflow",
        title: "Custom Workflows",
        price: 1100,
        description: "Automated processes tailored to your needs",
        features: [
            "Process mapping",
            "Automation setup",
            "Testing & optimization",
            "Documentation"
        ]
    }
];

// Initialize calculator when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initCalculator();
    attachNavigationListeners();
    attachHubSelectionListeners();
});

// Initialize the calculator
function initCalculator() {
    renderProgressBar();
    renderStageContent();
}

// Render the progress bar based on current stage
function renderProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;
    
    progressBar.innerHTML = '';
    
    stages.forEach((stage, index) => {
        const stageElement = document.createElement('div');
        stageElement.className = `progress-stage ${index <= state.currentStage ? 'active' : ''}`;
        
        const iconElement = document.createElement('div');
        iconElement.className = 'stage-icon';
        iconElement.innerHTML = `<i class="${stage.icon}"></i>`;
        
        const titleElement = document.createElement('div');
        titleElement.className = 'stage-title';
        titleElement.textContent = stage.title;
        
        stageElement.appendChild(iconElement);
        stageElement.appendChild(titleElement);
        progressBar.appendChild(stageElement);
    });
    
    // Update progress indicator width
    updateProgressBar();
}

// Render content based on current stage
function renderStageContent() {
    const containers = [
        document.getElementById('hub-selection'),
        document.getElementById('package-selection'),
        document.getElementById('addon-selection'),
        document.getElementById('summary-section')
    ];
    
    // Hide all containers
    containers.forEach(container => {
        if (container) container.style.display = 'none';
    });
    
    // Show current container
    if (containers[state.currentStage]) {
        containers[state.currentStage].style.display = 'block';
    }
    
    // Render specific stage content
    switch(state.currentStage) {
        case 0:
            renderHubSelection();
            break;
        case 1:
            renderPackages();
            break;
        case 2:
            renderAddons();
            break;
        case 3:
            renderSummary();
            updateFormFields();
            break;
    }
}

// Render hub selection cards
function renderHubSelection() {
    // Use pre-rendered hub cards from HTML
    // Just update the selected state
    document.querySelectorAll('#hub-selection .selection-card').forEach(card => {
        const hubId = card.dataset.id;
        card.classList.toggle('selected', hubId === state.selectedHub);
    });
    
    // Update next button state
    const nextButton = document.querySelector('#hub-selection .btn-next');
    if (nextButton) {
        nextButton.disabled = !state.selectedHub;
    }
}

// Attach event listeners to hub selection cards
function attachHubSelectionListeners() {
    document.querySelectorAll('#hub-selection .selection-card').forEach(card => {
        card.addEventListener('click', () => {
            const hubId = card.dataset.id;
            selectHub(hubId);
        });
    });
}

// Render package selection cards
function renderPackages() {
    const packageGrid = document.querySelector('#package-selection .selection-grid');
    if (!packageGrid) return;
    
    packageGrid.innerHTML = '';
    
    if (state.selectedHub) {
        const hubPackages = packages[state.selectedHub] || [];
        
        hubPackages.forEach(pkg => {
            const packageCard = document.createElement('div');
            packageCard.className = `selection-card ${state.selectedPackage === pkg.id ? 'selected' : ''}`;
            packageCard.dataset.id = pkg.id;
            
            // Find the hub color to match
            const selectedHub = hubs.find(h => h.id === state.selectedHub);
            const hubIcon = selectedHub ? selectedHub.icon : 'fa-solid fa-box';
            
            packageCard.innerHTML = `
                <div class="card-icon">
                    <i class="${hubIcon}"></i>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${pkg.title}</h3>
                    <p class="card-price">$${pkg.price.toLocaleString()}</p>
                    <p class="card-description">${pkg.description}</p>
                    <div class="card-features">
                        <h4>Features</h4>
                        <ul>
                            ${pkg.features.map(feature => `<li><i class="fa-solid fa-check"></i> ${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            
            packageCard.addEventListener('click', () => {
                selectPackage(pkg.id);
            });
            
            packageGrid.appendChild(packageCard);
        });
    }
    
    // Update next button state
    const nextButton = document.querySelector('#package-selection .btn-next');
    if (nextButton) {
        nextButton.disabled = !state.selectedPackage;
    }
}

// Render add-on selection cards
function renderAddons() {
    const addonGrid = document.querySelector('#addon-selection .selection-grid');
    if (!addonGrid) return;
    
    addonGrid.innerHTML = '';
    
    addOns.forEach(addon => {
        const addonCard = document.createElement('div');
        addonCard.className = `selection-card addon-card ${state.selectedAddOns.includes(addon.id) ? 'selected' : ''}`;
        addonCard.dataset.id = addon.id;
        
        addonCard.innerHTML = `
            <div class="card-checkbox">
                <i class="fa-${state.selectedAddOns.includes(addon.id) ? 'solid' : 'regular'} fa-square-check"></i>
            </div>
            <div class="card-content">
                <h3 class="card-title">${addon.title}</h3>
                <p class="card-price">$${addon.price.toLocaleString()}</p>
                <p class="card-description">${addon.description}</p>
                <div class="card-features">
                    <h4>Features</h4>
                    <ul>
                        ${addon.features.map(feature => `<li><i class="fa-solid fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        addonCard.addEventListener('click', () => {
            toggleAddon(addon.id);
        });
        
        addonGrid.appendChild(addonCard);
    });
}

// Render summary of selections
function renderSummary() {
    const summaryContainer = document.querySelector('#summary-section .summary-container');
    if (!summaryContainer) return;
    
    if (!state.selectedHub || !state.selectedPackage) {
        return;
    }
    
    const selectedHub = hubs.find(h => h.id === state.selectedHub);
    const hubTitle = selectedHub ? selectedHub.title : 'Unknown Hub';
    const hubIcon = selectedHub ? selectedHub.icon : 'fa-solid fa-question';
    
    const selectedPackage = packages[state.selectedHub].find(p => p.id === state.selectedPackage);
    
    // Filter selected addons
    const selectedAddons = addOns.filter(addon => state.selectedAddOns.includes(addon.id));
    
    // Calculate total price
    let totalPrice = selectedPackage ? selectedPackage.price : 0;
    selectedAddons.forEach(addon => {
        totalPrice += addon.price;
    });
    
    // Update state total price
    state.totalPrice = totalPrice;
    
    // Build summary HTML
    summaryContainer.innerHTML = `
        <div class="summary-header">
            <h2>Your HubSpot Onboarding Package</h2>
            <p class="total-price">Total: $${totalPrice.toLocaleString()}</p>
        </div>
        
        <div class="summary-hub">
            <div class="summary-icon">
                <i class="${hubIcon}"></i>
            </div>
            <div class="summary-content">
                <h3>${hubTitle}</h3>
                <p>${selectedHub ? selectedHub.description : ''}</p>
            </div>
        </div>
        
        <div class="summary-package">
            <h3>Selected Package: ${selectedPackage ? selectedPackage.title : ''}</h3>
            <p class="summary-price">$${selectedPackage ? selectedPackage.price.toLocaleString() : 0}</p>
            <p>${selectedPackage ? selectedPackage.description : ''}</p>
            <div class="feature-list">
                <ul>
                    ${selectedPackage ? selectedPackage.features.map(feature => `<li><i class="fa-solid fa-check"></i> ${feature}</li>`).join('') : ''}
                </ul>
            </div>
        </div>
    `;
    
    if (selectedAddons.length > 0) {
        const addonsHTML = `
            <div class="summary-addons">
                <h3>Selected Add-ons</h3>
                ${selectedAddons.map(addon => `
                    <div class="summary-addon-item">
                        <div class="addon-header">
                            <h4>${addon.title}</h4>
                            <p class="summary-price">$${addon.price.toLocaleString()}</p>
                        </div>
                        <p>${addon.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
        summaryContainer.innerHTML += addonsHTML;
    }
}

// Update hidden form fields
function updateFormFields() {
    // Find all form fields
    const hubField = document.querySelector('input[name="hub"]');
    const packageField = document.querySelector('input[name="package"]');
    const addonsField = document.querySelector('input[name="addons"]');
    const totalPriceField = document.querySelector('input[name="total_price"]');
    const jsonField = document.querySelector('input[name="selection_json"]');
    
    if (hubField || packageField || addonsField || totalPriceField || jsonField) {
        
        // Get selected hub and package names instead of IDs for better readability
        const selectedHub = hubs.find(h => h.id === state.selectedHub);
        const selectedPackage = packages[state.selectedHub]?.find(p => p.id === state.selectedPackage);
        
        // Get selected addon names
        const selectedAddonNames = state.selectedAddOns.map(id => {
            const addon = addOns.find(a => a.id === id);
            return addon ? addon.title : '';
        }).filter(Boolean);
        
        // Update form fields
        if (hubField) {
            hubField.value = selectedHub ? selectedHub.title : '';
        }
        
        if (packageField) {
            packageField.value = selectedPackage ? selectedPackage.title : '';
        }
        
        if (addonsField) {
            addonsField.value = selectedAddonNames.join(', ');
        }
        
        if (totalPriceField) {
            totalPriceField.value = state.totalPrice.toString();
        }
        
        // Create JSON for all selections
        if (jsonField) {
            const jsonData = JSON.stringify({
                hub: state.selectedHub,
                hubName: selectedHub ? selectedHub.title : '',
                package: state.selectedPackage,
                packageName: selectedPackage ? selectedPackage.title : '',
                addons: state.selectedAddOns,
                addonNames: selectedAddonNames,
                totalPrice: state.totalPrice
            });
            
            jsonField.value = jsonData;
        }
        
        // Log the values to console for debugging
        console.log('Form field values:', {
            hub: hubField?.value,
            package: packageField?.value,
            addons: addonsField?.value,
            totalPrice: totalPriceField?.value,
            selectionJson: jsonField?.value
        });
    }
    
    return validateFormFields();
}

// Validate that form fields are populated correctly
function validateFormFields() {
    const requiredFields = [
        { name: 'hub', label: 'HubSpot Hub' },
        { name: 'package', label: 'Package' },
        { name: 'total_price', label: 'Total Price' }
    ];
    
    const missingFields = [];
    
    // Check each required field
    requiredFields.forEach(field => {
        const inputField = document.querySelector(`input[name="${field.name}"]`);
        if (!inputField || !inputField.value) {
            missingFields.push(field.label);
        }
    });
    
    if (missingFields.length > 0) {
        console.error('Missing required fields:', missingFields);
        return { valid: false, missingFields };
    }
    
    return { valid: true };
}

// Attach event listeners to navigation buttons
function attachNavigationListeners() {
    // Next buttons
    document.querySelectorAll('.btn-next').forEach(button => {
        button.addEventListener('click', nextStage);
    });
    
    // Back buttons
    document.querySelectorAll('.btn-back').forEach(button => {
        button.addEventListener('click', previousStage);
    });
}

// Select a hub
function selectHub(hubId) {
    state.selectedHub = hubId;
    state.selectedPackage = null; // Reset package when hub changes
    
    // Update UI
    document.querySelectorAll('#hub-selection .selection-card').forEach(card => {
        card.classList.toggle('selected', card.dataset.id === hubId);
    });
    
    // Enable next button
    const nextButton = document.querySelector('#hub-selection .btn-next');
    if (nextButton) {
        nextButton.disabled = false;
    }
}

// Select a package
function selectPackage(packageId) {
    state.selectedPackage = packageId;
    
    // Update UI
    document.querySelectorAll('#package-selection .selection-card').forEach(card => {
        card.classList.toggle('selected', card.dataset.id === packageId);
    });
    
    // Enable next button
    const nextButton = document.querySelector('#package-selection .btn-next');
    if (nextButton) {
        nextButton.disabled = false;
    }
}

// Toggle an add-on selection
function toggleAddon(addonId) {
    const index = state.selectedAddOns.indexOf(addonId);
    
    if (index > -1) {
        // Remove the addon
        state.selectedAddOns.splice(index, 1);
    } else {
        // Add the addon
        state.selectedAddOns.push(addonId);
    }
    
    // Update UI
    const addonCard = document.querySelector(`.selection-card[data-id="${addonId}"]`);
    if (addonCard) {
        addonCard.classList.toggle('selected', state.selectedAddOns.includes(addonId));
        
        // Update the checkbox icon
        const checkbox = addonCard.querySelector('.card-checkbox i');
        if (checkbox) {
            checkbox.className = state.selectedAddOns.includes(addonId) ? 'fa-solid fa-square-check' : 'fa-regular fa-square-check';
        }
    }
    
    // Update summary if we're already on the summary page
    if (state.currentStage === 3) {
        renderSummary();
        updateFormFields();
    }
}

// Go to next stage
function nextStage() {
    // Validate current stage
    switch(state.currentStage) {
        case 0: // Hub selection
            if (!state.selectedHub) {
                alert('Please select a hub to continue');
                return;
            }
            break;
        case 1: // Package selection
            if (!state.selectedPackage) {
                alert('Please select a package to continue');
                return;
            }
            break;
        // Add-ons are optional, so no validation needed for stage 2
    }
    
    if (state.currentStage < stages.length - 1) {
        // Show loading state
        showLoading();
        
        // Use setTimeout to allow UI to update with loading state
        setTimeout(() => {
            state.currentStage++;
            renderStageContent();
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Hide loading after content is rendered
            hideLoading();
        }, 300);
    }
}

// Go to previous stage
function previousStage() {
    if (state.currentStage > 0) {
        // Show loading state
        showLoading();
        
        // Use setTimeout to allow UI to update with loading state
        setTimeout(() => {
            state.currentStage--;
            renderStageContent();
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Hide loading after content is rendered
            hideLoading();
        }, 300);
    }
}

// Show loading indicator
function showLoading() {
    // Create loading overlay if it doesn't exist
    let loadingOverlay = document.getElementById('loading-overlay');
    
    if (!loadingOverlay) {
        loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
        `;
        
        // Style the overlay
        loadingOverlay.style.position = 'fixed';
        loadingOverlay.style.top = '0';
        loadingOverlay.style.left = '0';
        loadingOverlay.style.width = '100%';
        loadingOverlay.style.height = '100%';
        loadingOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        loadingOverlay.style.display = 'flex';
        loadingOverlay.style.justifyContent = 'center';
        loadingOverlay.style.alignItems = 'center';
        loadingOverlay.style.zIndex = '9999';
        
        // Style the spinner
        const spinner = loadingOverlay.querySelector('.loading-spinner');
        spinner.style.fontSize = '40px';
        spinner.style.color = 'var(--leapforce-orange)';
        
        // Add to body
        document.body.appendChild(loadingOverlay);
    } else {
        loadingOverlay.style.display = 'flex';
    }
}

// Hide loading indicator
function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

// Update visual progress bar
function updateProgressBar() {
    const progressPercentage = ((state.currentStage + 1) / stages.length) * 100;
    const progressIndicator = document.querySelector('.progress-indicator');
    
    if (progressIndicator) {
        progressIndicator.style.width = `${progressPercentage}%`;
    }
}

// Initialize from URL parameters if present
window.addEventListener('DOMContentLoaded', initFromUrlParams);

// Function to initialize from URL parameters
function initFromUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check for hub parameter
    const hubParam = urlParams.get('hub');
    if (hubParam && hubs.some(h => h.id === hubParam)) {
        state.selectedHub = hubParam;
    }
    
    // Check for package parameter
    const packageParam = urlParams.get('package');
    if (packageParam && state.selectedHub && 
        packages[state.selectedHub] && 
        packages[state.selectedHub].some(p => p.id === packageParam)) {
        state.selectedPackage = packageParam;
    }
    
    // Check for addons parameter (comma-separated list)
    const addonsParam = urlParams.get('addons');
    if (addonsParam) {
        const addonIds = addonsParam.split(',');
        state.selectedAddOns = addonIds.filter(id => 
            addOns.some(a => a.id === id)
        );
    }
    
    // If we have parameters, update the UI
    if (hubParam || packageParam || addonsParam) {
        initCalculator();
    }
} 