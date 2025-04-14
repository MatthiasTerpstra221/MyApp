import React, { useState } from 'react';
import { Header } from './Header';
import { SelectionInterface } from './SelectionInterface';
import { ResultsDisplay } from './ResultsDisplay';
import { HubSpotFormModal } from './HubSpotFormModal';

export const Calculator = () => {
  const [selectedHubs, setSelectedHubs] = useState([]);
  const [selectedTiers, setSelectedTiers] = useState({});
  const [selectedModel, setSelectedModel] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleHubSelection = (hub) => {
    if (selectedHubs.includes(hub)) {
      setSelectedHubs(selectedHubs.filter(h => h !== hub));
      const updatedTiers = { ...selectedTiers };
      delete updatedTiers[hub];
      setSelectedTiers(updatedTiers);
    } else {
      setSelectedHubs([...selectedHubs, hub]);
    }
  };

  const handleTierSelection = (hub, tier) => {
    setSelectedTiers({
      ...selectedTiers,
      [hub]: tier
    });
  };

  const handleModelSelection = (model) => {
    setSelectedModel(model);
  };

  const getModelKeySuffix = (model) => {
    switch (model) {
      case 'Do It Yourself':
        return 'diy';
      case 'Guided Implementation':
        return 'dwme';
      case 'Full Service':
        return 'difme';
      default:
        return '';
    }
  };

  const generatePackageKey = (hub, tier, model) => {
    const hubKey = hub.toLowerCase().replace(' hub', ' hub_');
    const tierKey = tier.toLowerCase();
    const modelKey = getModelKeySuffix(model);
    return `${hubKey}_${tierKey}_${modelKey}`;
  };

  const calculatePackageHours = (hub, tier) => {
    const baseHours = {
      'Marketing Hub': { Starter: 20, Professional: 40, Enterprise: 80 },
      'Sales Hub': { Starter: 15, Professional: 30, Enterprise: 60 },
      'Service Hub': { Starter: 15, Professional: 30, Enterprise: 60 },
      'Operations Hub': { Starter: 25, Professional: 50, Enterprise: 100 },
      'CMS Hub': { Starter: 20, Professional: 40, Enterprise: 80 }
    };

    const modelMultiplier = {
      'Do It Yourself': 0.5,
      'Guided Implementation': 1,
      'Full Service': 1.5
    };

    return Math.round(baseHours[hub][tier] * modelMultiplier[selectedModel]);
  };

  const calculatePackagePrice = (hours) => {
    const hourlyRate = 150;
    return hours * hourlyRate;
  };

  const handleCalculatePrice = () => {
    if (selectedHubs.length === 0 || Object.keys(selectedTiers).length === 0 || !selectedModel) {
      alert('Please select at least one hub, its tier, and a service model.');
      return;
    }

    const packages = selectedHubs.map(hub => {
      const tier = selectedTiers[hub];
      if (!tier) return null;

      const hours = calculatePackageHours(hub, tier);
      const price = calculatePackagePrice(hours);
      const packageKey = generatePackageKey(hub, tier, selectedModel);

      return {
        hub,
        tier,
        hours,
        price,
        packageKey,
        scopeSummary: `Complete ${hub} ${tier} onboarding package with ${selectedModel} support`
      };
    }).filter(pkg => pkg !== null);

    setSelectedPackages(packages);
    setShowModal(true);
  };

  const handleFormSuccess = () => {
    setShow
