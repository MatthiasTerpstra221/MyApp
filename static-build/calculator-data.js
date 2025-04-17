// HubSpot Onboarding Packages Data
// This file contains the single source of truth for package information
// Based on the official HubSpot Services Pricing Sheet

const hubspotOnboardingData = {
  marketing: {
    starter: {
      diy: {
        packageKey: "marketing_hub_starter_diy",
        hours: 8,
        price: 1080,
        scopeSummary: "We guide you on basic portal \"getting started\" steps—tracking code, one lead-capture form, one email template—but you implement them. Includes 2 coaching sessions for Q&A and best practices."
      },
      diwme: {
        packageKey: "marketing_hub_starter_dwme",
        hours: 12,
        price: 1620,
        scopeSummary: "We collaborate on the same starter setup (tracking code, forms, email templates) plus 2 simple automations and a basic reporting dashboard. We handle some tasks; you handle others. Includes 1 coaching session and 1 team training."
      },
      difme: {
        packageKey: "marketing_hub_starter_dfme",
        hours: 16,
        price: 2160,
        scopeSummary: "We fully implement the starter portal setup (code installation, up to 3 forms, basic reporting, 2 simple automations). Includes 1 coaching session and 1 team training."
      }
    },
    pro: {
      diy: {
        packageKey: "marketing_hub_professional_diy",
        hours: 12,
        price: 1620,
        scopeSummary: "We teach you how to configure more advanced marketing features—e.g. 2 automations (workflows), lead scoring basics, custom dashboards—and you carry them out. Includes 3 coaching sessions."
      },
      diwme: {
        packageKey: "marketing_hub_professional_dwme",
        hours: 20,
        price: 2700,
        scopeSummary: "A joint effort setting up advanced features (3 automations, lead scoring, campaign setup, custom dashboards). We do part of the technical work while guiding you on the rest. Includes 1 team training + 4 coaching sessions."
      },
      difme: {
        packageKey: "marketing_hub_professional_dfme",
        hours: 32,
        price: 4320,
        scopeSummary: "Full-service build-out of Pro features—3 automations, lead scoring, more sophisticated campaign setup, custom reporting, etc. We do nearly everything. Includes 1 team training + 5 coaching sessions."
      }
    },
    enterprise: {
      diy: {
        packageKey: "marketing_hub_enterprise_diy",
        hours: null,
        price: "On request",
        scopeSummary: null
      },
      diwme: {
        packageKey: "marketing_hub_enterprise_dwme",
        hours: null,
        price: "On request",
        scopeSummary: null
      },
      difme: {
        packageKey: "marketing_hub_enterprise_dfme",
        hours: null,
        price: "On request",
        scopeSummary: null
      }
    }
  },
  sales: {
    starter: {
      diy: {
        packageKey: "sales_hub_starter_diy",
        hours: 8,
        price: 1080,
        scopeSummary: "We advise you on configuring a basic sales pipeline, 1 deal stage workflow, and simple deal card fields. You do the actual HubSpot setup. Includes 2 coaching sessions."
      },
      diwme: {
        packageKey: "sales_hub_starter_dwme",
        hours: 12,
        price: 1620,
        scopeSummary: "We work together on pipeline setup, deal stage workflow, meeting link, basic automation. We do some config; you do the rest. Includes 1 team training + 3 coaching sessions."
      },
      difme: {
        packageKey: "sales_hub_starter_dfme",
        hours: 16,
        price: 2160,
        scopeSummary: "We handle the key Sales Starter tasks—pipeline setup, 2 simple automations, basic deal card customization—while you provide input/approvals. Includes 1 team training + 3 coaching sessions."
      }
    },
    pro: {
      diy: {
        packageKey: "sales_hub_professional_diy",
        hours: 12,
        price: 1620,
        scopeSummary: "We guide you on multiple deal stage workflows, advanced deal card customization, and basic sales reporting dashboards. You do all setup steps. Includes 3 coaching sessions."
      },
      diwme: {
        packageKey: "sales_hub_professional_dwme",
        hours: 20,
        price: 2700,
        scopeSummary: "A collaborative Pro-level build: advanced pipelines/workflows, meeting link setup, custom deal properties. We share tasks. Includes 1 team training + 4 coaching sessions."
      },
      difme: {
        packageKey: "sales_hub_professional_dfme",
        hours: 32,
        price: 4320,
        scopeSummary: "We fully implement advanced pipelines, automation/sequences, custom sales reporting, quotes setup. Minimal effort needed on your end. Includes 1 team training + 5 coaching sessions."
      }
    },
    enterprise: {
      diy: {
        packageKey: "sales_hub_enterprise_diy",
        hours: null,
        price: "On request",
        scopeSummary: null
      },
      diwme: {
        packageKey: "sales_hub_enterprise_dwme",
        hours: null,
        price: "On request",
        scopeSummary: null
      },
      difme: {
        packageKey: "sales_hub_enterprise_dfme",
        hours: null,
        price: "On request",
        scopeSummary: null
      }
    }
  },
  service: {
    starter: {
      diy: {
        packageKey: "service_hub_starter_diy",
        hours: 8,
        price: 1080,
        scopeSummary: "We instruct you on setting up your first ticket pipeline, basic routing rules, and simple email/snippet usage. You do the hands-on HubSpot configuration. Includes 2 coaching sessions."
      },
      diwme: {
        packageKey: "service_hub_starter_dwme",
        hours: 12,
        price: 1620,
        scopeSummary: "We team up to configure the Service Starter features—ticket pipeline/routing, a simple knowledge base, chatflow if needed. We split tasks. Includes 1 team training + 3 coaching sessions."
      },
      difme: {
        packageKey: "service_hub_starter_dfme",
        hours: 16,
        price: 2160,
        scopeSummary: "We take care of the full basic service setup: pipeline(s), routing, knowledge base structure, chatflow, etc. Includes 1 team training + 3 coaching sessions."
      }
    },
    pro: {
      diy: {
        packageKey: "service_hub_professional_diy",
        hours: 12,
        price: 1620,
        scopeSummary: "We coach you through more advanced service features—multiple ticket pipelines, routing rules, basic automation, knowledge base. You implement. Includes 2 coaching sessions."
      },
      diwme: {
        packageKey: "service_hub_professional_dwme",
        hours: 20,
        price: 2700,
        scopeSummary: "We collaborate on advanced workflows (SLAs, routing), knowledge base organization, maybe feedback surveys or chatbots. Some setup is on us, some on you. Includes 1 team training + 3 coaching sessions."
      },
      difme: {
        packageKey: "service_hub_professional_dfme",
        hours: 32,
        price: 4320,
        scopeSummary: "We fully implement your Professional-level service environment: pipelines, automations, reporting dashboards, knowledge base structure, etc. Includes 2 team trainings + 4 coaching sessions."
      }
    },
    enterprise: {
      diy: {
        packageKey: "service_hub_enterprise_diy",
        hours: null,
        price: "On request",
        scopeSummary: null
      },
      diwme: {
        packageKey: "service_hub_enterprise_dwme",
        hours: null,
        price: "On request",
        scopeSummary: null
      },
      difme: {
        packageKey: "service_hub_enterprise_dfme",
        hours: null,
        price: "On request",
        scopeSummary: null
      }
    }
  },
  // Helper function to get package details by key
  getPackageByKey: function(packageKey) {
    // Iterate through all hubs, tiers, and service models
    for (const hub in this) {
      if (typeof this[hub] === 'object') {
        for (const tier in this[hub]) {
          for (const model in this[hub][tier]) {
            const pkg = this[hub][tier][model];
            if (pkg.packageKey === packageKey) {
              return {
                ...pkg,
                hub: hub,
                tier: tier,
                serviceModel: model
              };
            }
          }
        }
      }
    }
    return null;
  }
};

// calculator-data.js - Data for the HubSpot Onboarding Calculator

/**
 * Main calculator data structure 
 */
const calculatorData = {
  // Navigation stages of the calculator
  stages: [
    { id: "hub-selection", label: "HubSpot Hub Selection", icon: "fa-solid fa-building" },
    { id: "package-selection", label: "Package Selection", icon: "fa-solid fa-box-open" },
    { id: "add-ons", label: "Add-ons", icon: "fa-solid fa-puzzle-piece" },
    { id: "summary", label: "Summary", icon: "fa-solid fa-clipboard-check" }
  ],
  
  // Hub options
  hubs: [
    {
      id: "marketing-hub",
      name: "Marketing Hub",
      description: "Create a comprehensive marketing strategy with tools for campaigns, email, social media, and analytics.",
      icon: "fa-solid fa-bullhorn",
      colorClass: "marketing-hub-color",
      serviceModel: "marketingHubServices"
    },
    {
      id: "sales-hub",
      name: "Sales Hub",
      description: "Streamline your sales process with a CRM, pipeline management, email sequences, and meeting scheduling.",
      icon: "fa-solid fa-handshake",
      colorClass: "sales-hub-color",
      serviceModel: "salesHubServices"
    },
    {
      id: "service-hub",
      name: "Service Hub",
      description: "Delight your customers with service tools, ticketing, and knowledge base functionality.",
      icon: "fa-solid fa-headset",
      colorClass: "service-hub-color",
      serviceModel: "serviceHubServices"
    },
    {
      id: "operations-hub",
      name: "Operations Hub",
      description: "Connect systems, sync data, and automate processes to align your marketing, sales, and service teams.",
      icon: "fa-solid fa-gears",
      colorClass: "operations-hub-color",
      serviceModel: "operationsHubServices"
    },
    {
      id: "cms-hub",
      name: "CMS Hub",
      description: "Create and manage website content with an integrated CMS that leverages HubSpot CRM data.",
      icon: "fa-solid fa-globe",
      colorClass: "cms-hub-color",
      serviceModel: "cmsHubServices"
    }
  ],
  
  // Package options for each hub
  packages: {
    // Marketing Hub packages
    marketingHubServices: [
      {
        id: "marketing-essentials",
        name: "Marketing Essentials",
        icon: "fa-solid fa-star",
        price: 2000,
        description: "A starter package for businesses new to HubSpot Marketing Hub.",
        features: [
          { name: "HubSpot Account Setup", icon: "fa-solid fa-user-gear" },
          { name: "Basic Email Template Creation", icon: "fa-solid fa-envelope-open-text" },
          { name: "Basic Workflow Setup", icon: "fa-solid fa-arrows-spin" },
          { name: "Form Creation", icon: "fa-solid fa-rectangle-list" },
          { name: "Landing Page Setup", icon: "fa-solid fa-file-code" }
        ]
      },
      {
        id: "marketing-standard",
        name: "Marketing Standard",
        icon: "fa-solid fa-medal",
        price: 3500,
        description: "Our most popular package for businesses looking to grow with HubSpot.",
        features: [
          { name: "HubSpot Account Setup", icon: "fa-solid fa-user-gear" },
          { name: "Email Template Creation", icon: "fa-solid fa-envelope-open-text" },
          { name: "Advanced Workflow Setup", icon: "fa-solid fa-arrows-spin" },
          { name: "Form Creation", icon: "fa-solid fa-rectangle-list" },
          { name: "Landing Page Setup", icon: "fa-solid fa-file-code" },
          { name: "List Segmentation", icon: "fa-solid fa-layer-group" },
          { name: "Custom Reporting", icon: "fa-solid fa-chart-line" }
        ]
      },
      {
        id: "marketing-enterprise",
        name: "Marketing Enterprise",
        icon: "fa-solid fa-crown",
        price: 5000,
        description: "Our comprehensive package for large businesses with complex marketing needs.",
        features: [
          { name: "HubSpot Account Setup", icon: "fa-solid fa-user-gear" },
          { name: "Email Template Creation", icon: "fa-solid fa-envelope-open-text" },
          { name: "Advanced Workflow Setup", icon: "fa-solid fa-arrows-spin" },
          { name: "Form Creation", icon: "fa-solid fa-rectangle-list" },
          { name: "Landing Page Setup", icon: "fa-solid fa-file-code" },
          { name: "List Segmentation", icon: "fa-solid fa-layer-group" },
          { name: "Custom Reporting", icon: "fa-solid fa-chart-line" },
          { name: "A/B Testing", icon: "fa-solid fa-rectangle-ad" },
          { name: "Campaign Strategy", icon: "fa-solid fa-bullseye" },
          { name: "Advanced Analytics", icon: "fa-solid fa-chart-pie" }
        ]
      }
    ],
    
    // Sales Hub packages
    salesHubServices: [
      {
        id: "sales-essentials",
        name: "Sales Essentials",
        icon: "fa-solid fa-star",
        price: 1800,
        description: "A starter package for businesses new to HubSpot Sales Hub.",
        features: [
          { name: "HubSpot Account Setup", icon: "fa-solid fa-user-gear" },
          { name: "Pipeline Setup", icon: "fa-solid fa-diagram-project" },
          { name: "Basic Email Sequences", icon: "fa-solid fa-envelope-circle-check" },
          { name: "Contact Management", icon: "fa-solid fa-address-book" }
        ]
      },
      {
        id: "sales-standard",
        name: "Sales Standard",
        icon: "fa-solid fa-medal",
        price: 3000,
        description: "Our most popular package for businesses looking to grow with HubSpot.",
        features: [
          { name: "HubSpot Account Setup", icon: "fa-solid fa-user-gear" },
          { name: "Pipeline Setup", icon: "fa-solid fa-diagram-project" },
          { name: "Advanced Email Sequences", icon: "fa-solid fa-envelope-circle-check" },
          { name: "Contact Management", icon: "fa-solid fa-address-book" },
          { name: "Deal Management", icon: "fa-solid fa-handshake" },
          { name: "Meeting Scheduling", icon: "fa-solid fa-calendar-check" },
          { name: "Custom Reporting", icon: "fa-solid fa-chart-line" }
        ]
      },
      {
        id: "sales-enterprise",
        name: "Sales Enterprise",
        icon: "fa-solid fa-crown",
        price: 4500,
        description: "Our comprehensive package for large businesses with complex sales needs.",
        features: [
          { name: "HubSpot Account Setup", icon: "fa-solid fa-user-gear" },
          { name: "Pipeline Setup", icon: "fa-solid fa-diagram-project" },
          { name: "Advanced Email Sequences", icon: "fa-solid fa-envelope-circle-check" },
          { name: "Contact Management", icon: "fa-solid fa-address-book" },
          { name: "Deal Management", icon: "fa-solid fa-handshake" },
          { name: "Meeting Scheduling", icon: "fa-solid fa-calendar-check" },
          { name: "Custom Reporting", icon: "fa-solid fa-chart-line" },
          { name: "Sales Playbooks", icon: "fa-solid fa-book" },
          { name: "Territory Management", icon: "fa-solid fa-map-location-dot" },
          { name: "Advanced Analytics", icon: "fa-solid fa-chart-pie" }
        ]
      }
    ],

    // Service Hub packages
    serviceHubServices: [
      {
        id: "service-essentials",
        name: "Service Essentials",
        icon: "fa-solid fa-star",
        price: 1800,
        description: "A starter package for businesses new to HubSpot Service Hub.",
        features: [
          { name: "HubSpot Account Setup", icon: "fa-solid fa-user-gear" },
          { name: "Ticketing System Setup", icon: "fa-solid fa-ticket" },
          { name: "Basic Help Desk", icon: "fa-solid fa-life-ring" },
          { name: "Customer Feedback", icon: "fa-solid fa-comment-dots" }
        ]
      },
      {
        id: "service-standard",
        name: "Service Standard",
        icon: "fa-solid fa-medal",
        price: 3000,
        description: "Our most popular package for businesses looking to grow with HubSpot.",
        features: [
          { name: "HubSpot Account Setup", icon: "fa-solid fa-user-gear" },
          { name: "Ticketing System Setup", icon: "fa-solid fa-ticket" },
          { name: "Advanced Help Desk", icon: "fa-solid fa-life-ring" },
          { name: "Customer Feedback", icon: "fa-solid fa-comment-dots" },
          { name: "Knowledge Base Setup", icon: "fa-solid fa-book-open" },
          { name: "Service Automation", icon: "fa-solid fa-robot" },
          { name: "Custom Reporting", icon: "fa-solid fa-chart-line" }
        ]
      },
      {
        id: "service-enterprise",
        name: "Service Enterprise",
        icon: "fa-solid fa-crown",
        price: 4500,
        description: "Our comprehensive package for large businesses with complex service needs.",
        features: [
          { name: "HubSpot Account Setup", icon: "fa-solid fa-user-gear" },
          { name: "Ticketing System Setup", icon: "fa-solid fa-ticket" },
          { name: "Advanced Help Desk", icon: "fa-solid fa-life-ring" },
          { name: "Customer Feedback", icon: "fa-solid fa-comment-dots" },
          { name: "Knowledge Base Setup", icon: "fa-solid fa-book-open" },
          { name: "Service Automation", icon: "fa-solid fa-robot" },
          { name: "Custom Reporting", icon: "fa-solid fa-chart-line" },
          { name: "Customer Portal", icon: "fa-solid fa-door-open" },
          { name: "SLA Management", icon: "fa-solid fa-file-contract" },
          { name: "Advanced Analytics", icon: "fa-solid fa-chart-pie" }
        ]
      }
    ],

    // Operations Hub packages
    operationsHubServices: [
      {
        id: "operations-essentials",
        name: "Operations Essentials",
        icon: "fa-solid fa-star",
        price: 2000,
        description: "A starter package for businesses new to HubSpot Operations Hub.",
        features: [
          { name: "HubSpot Account Setup", icon: "fa-solid fa-user-gear" },
          { name: "Data Sync Setup", icon: "fa-solid fa-arrows-rotate" },
          { name: "Basic Data Quality", icon: "fa-solid fa-database" },
          { name: "Workflow Integration", icon: "fa-solid fa-arrows-to-circle" }
        ]
      },
      {
        id: "operations-standard",
        name: "Operations Standard",
        icon: "fa-solid fa-medal",
        price: 3500,
        description: "Our most popular package for businesses looking to grow with HubSpot.",
        features: [
          { name: "HubSpot Account Setup", icon: "fa-solid fa-user-gear" },
          { name: "Data Sync Setup", icon: "fa-solid fa-arrows-rotate" },
          { name: "Advanced Data Quality", icon: "fa-solid fa-database" },
          { name: "Workflow Integration", icon: "fa-solid fa-arrows-to-circle" },
          { name: "Custom Properties", icon: "fa-solid fa-sliders" },
          { name: "Basic Programmable Automation", icon: "fa-solid fa-code" },
          { name: "Custom Reporting", icon: "fa-solid fa-chart-line" }
        ]
      },
      {
        id: "operations-enterprise",
        name: "Operations Enterprise",
        icon: "fa-solid fa-crown",
        price: 5000,
        description: "Our comprehensive package for large businesses with complex operational needs.",
        features: [
          { name: "HubSpot Account Setup", icon: "fa-solid fa-user-gear" },
          { name: "Data Sync Setup", icon: "fa-solid fa-arrows-rotate" },
          { name: "Advanced Data Quality", icon: "fa-solid fa-database" },
          { name: "Workflow Integration", icon: "fa-solid fa-arrows-to-circle" },
          { name: "Custom Properties", icon: "fa-solid fa-sliders" },
          { name: "Advanced Programmable Automation", icon: "fa-solid fa-code" },
          { name: "Custom Reporting", icon: "fa-solid fa-chart-line" },
          { name: "Data Warehouse", icon: "fa-solid fa-server" },
          { name: "System Integration", icon: "fa-solid fa-plug-circle-bolt" },
          { name: "Advanced Analytics", icon: "fa-solid fa-chart-pie" }
        ]
      }
    ],
    
    // CMS Hub packages
    cmsHubServices: [
      {
        id: "cms-essentials",
        name: "CMS Essentials",
        icon: "fa-solid fa-star",
        price: 2200,
        description: "A starter package for businesses new to HubSpot CMS Hub.",
        features: [
          { name: "HubSpot Account Setup", icon: "fa-solid fa-user-gear" },
          { name: "Template Setup", icon: "fa-solid fa-file-lines" },
          { name: "Basic Page Creation", icon: "fa-solid fa-browser" },
          { name: "Form Integration", icon: "fa-solid fa-rectangle-list" }
        ]
      },
      {
        id: "cms-standard",
        name: "CMS Standard",
        icon: "fa-solid fa-medal",
        price: 3800,
        description: "Our most popular package for businesses looking to grow with HubSpot.",
        features: [
          { name: "HubSpot Account Setup", icon: "fa-solid fa-user-gear" },
          { name: "Template Setup", icon: "fa-solid fa-file-lines" },
          { name: "Advanced Page Creation", icon: "fa-solid fa-browser" },
          { name: "Form Integration", icon: "fa-solid fa-rectangle-list" },
          { name: "Blog Setup", icon: "fa-solid fa-rss" },
          { name: "SEO Optimization", icon: "fa-solid fa-magnifying-glass-chart" },
          { name: "Custom Reporting", icon: "fa-solid fa-chart-line" }
        ]
      },
      {
        id: "cms-enterprise",
        name: "CMS Enterprise",
        icon: "fa-solid fa-crown",
        price: 5500,
        description: "Our comprehensive package for large businesses with complex CMS needs.",
        features: [
          { name: "HubSpot Account Setup", icon: "fa-solid fa-user-gear" },
          { name: "Template Setup", icon: "fa-solid fa-file-lines" },
          { name: "Advanced Page Creation", icon: "fa-solid fa-browser" },
          { name: "Form Integration", icon: "fa-solid fa-rectangle-list" },
          { name: "Blog Setup", icon: "fa-solid fa-rss" },
          { name: "SEO Optimization", icon: "fa-solid fa-magnifying-glass-chart" },
          { name: "Custom Reporting", icon: "fa-solid fa-chart-line" },
          { name: "Membership Sites", icon: "fa-solid fa-id-card" },
          { name: "Custom Modules", icon: "fa-solid fa-cubes" },
          { name: "Advanced Analytics", icon: "fa-solid fa-chart-pie" }
        ]
      }
    ]
  },
  
  // Add-on services
  addons: [
    {
      id: "training",
      name: "HubSpot Training",
      icon: "fa-solid fa-graduation-cap",
      price: 1200,
      description: "Comprehensive training for your team to maximize HubSpot usage."
    },
    {
      id: "migration",
      name: "Data Migration",
      icon: "fa-solid fa-arrows-up-to-line",
      price: 1500,
      description: "Transfer your existing data into HubSpot with proper formatting and mapping."
    },
    {
      id: "integration",
      name: "Third-party Integration",
      icon: "fa-solid fa-plug-circle-bolt",
      price: 1800,
      description: "Connect HubSpot with your other business tools for seamless operations."
    },
    {
      id: "analytics",
      name: "Custom Analytics",
      icon: "fa-solid fa-chart-column",
      price: 1300,
      description: "Build custom reports and dashboards specific to your business needs."
    },
    {
      id: "support",
      name: "Premium Support",
      icon: "fa-solid fa-headset",
      price: 800,
      description: "Priority access to our technical team for ongoing support after implementation."
    }
  ]
};

// Expose data to global scope
window.calculatorData = calculatorData; 