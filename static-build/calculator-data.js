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