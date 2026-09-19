import React, { createContext, useContext, useState } from 'react';
import { 
  calculateKitchenEstimate,
  calculateWardrobeEstimate,
  calculateBedroomEstimate,
  calculateLivingEstimate,
  calculateOfficeEstimate,
  calculateFullHomeEstimate
} from '../utils/pricingCalculator';

const EstimatorContext = createContext();

export const useEstimator = () => {
  return useContext(EstimatorContext);
};

export const EstimatorProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [category, setCategory] = useState(null); // 'kitchen', 'wardrobe', 'bedroom', 'living', 'office', 'full-home'
  
  // Kitchen Specific Configuration
  const initialKitchenConfig = {
    layout: null,
    cabinetConfig: [],
    dimensions: {},
    package: 'premium',
    coreMaterial: 'plywood',
    shutterFinish: 'laminate',
    countertop: 'granite',
    hardware: 'standard',
    accessories: [],
  };
  const [kitchenConfig, setKitchenConfig] = useState(initialKitchenConfig);

  // Wardrobe Specific Configuration
  const initialWardrobeConfig = {
    type: null, // 'hinged', 'sliding', 'walk-in', 'built-in'
    internalLayout: null,
    dimensions: { width: 0, height: 0, depth: 2 },
    package: 'premium',
    coreMaterial: 'plywood',
    shutterFinish: 'laminate',
    hardware: 'standard',
    accessories: [],
  };
  const [wardrobeConfig, setWardrobeConfig] = useState(initialWardrobeConfig);

  // Bedroom Specific Configuration
  const initialBedroomConfig = {
    scope: null, // 'bed', 'bed+tables', 'bed+wardrobe', etc.
    bedType: null,
    headboard: null,
    wardrobeType: 'none', // 'none', 'hinged', 'sliding'
    dressingUnit: null,
    dimensions: { roomLength: 0, roomWidth: 0, wardrobeWidth: 0 },
    package: 'premium',
    coreMaterial: 'plywood',
    shutterFinish: 'laminate',
    hardware: 'standard',
  };
  const [bedroomConfig, setBedroomConfig] = useState(initialBedroomConfig);

  // Living Room Specific Configuration
  const initialLivingRoomConfig = {
    scope: null, // 'tv-unit', 'tv+storage', 'full-wall', etc.
    tvLayout: null,
    dimensions: { wallWidth: 0, wallHeight: 0, tvSize: 55 },
    storage: [],
    designAccents: [],
    package: 'premium',
    coreMaterial: 'plywood',
    shutterFinish: 'laminate',
  };
  const [livingRoomConfig, setLivingRoomConfig] = useState(initialLivingRoomConfig);

  // Office Specific Configuration
  const initialOfficeConfig = {
    scope: null,
    seats: null,
    furniture: [],
    dimensions: { areaSqft: 0 },
    storageRequirements: null,
    package: 'premium',
    coreMaterial: 'hdhmr',
    shutterFinish: 'laminate',
  };
  const [officeConfig, setOfficeConfig] = useState(initialOfficeConfig);

  // Full Home Specific Configuration
  const initialFullHomeConfig = {
    rooms: [], // ['living', 'kitchen', 'master_bed', etc.]
    propertyType: null, // '1bhk', '2bhk', '3bhk', '4bhk', 'villa'
    roomScope: {}, // { living: 'premium', kitchen: 'standard' }
    package: 'premium',
    additions: [],
  };
  const [fullHomeConfig, setFullHomeConfig] = useState(initialFullHomeConfig);

  const [leadData, setLeadData] = useState({
    name: '',
    phone: ''
  });

  const [estimateResult, setEstimateResult] = useState(null);

  // Generic updater function
  const updateConfig = (categoryState, setter, key, value) => {
    setter(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCategorySelect = (newCategory) => {
    if (newCategory !== category) {
      setCategory(newCategory);
      setCurrentStep(2); // Jump directly to configuration, bypassing redundant CategorySelection screen
      setEstimateResult(null);
      localStorage.setItem('selectedEstimatorCategory', newCategory);
      // Reset all configs to ensure no stale data
      setKitchenConfig(initialKitchenConfig);
      setWardrobeConfig(initialWardrobeConfig);
      setBedroomConfig(initialBedroomConfig);
      setLivingRoomConfig(initialLivingRoomConfig);
      setOfficeConfig(initialOfficeConfig);
      setFullHomeConfig(initialFullHomeConfig);
    }
  };

  const calculateAndSetEstimate = () => {
    let result = null;
    switch (category) {
      case 'kitchen':
        result = calculateKitchenEstimate(kitchenConfig);
        break;
      case 'wardrobe':
        result = calculateWardrobeEstimate(wardrobeConfig);
        break;
      case 'bedroom':
        result = calculateBedroomEstimate(bedroomConfig);
        break;
      case 'living':
        result = calculateLivingEstimate(livingRoomConfig);
        break;
      case 'office':
        result = calculateOfficeEstimate(officeConfig);
        break;
      case 'full-home':
        result = calculateFullHomeEstimate(fullHomeConfig);
        break;
      default:
        break;
    }
    setEstimateResult(result);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => {
    if (currentStep === 2) {
      resetEstimator();
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const resetEstimator = () => {
    setCurrentStep(1);
    setCategory(null);
    setEstimateResult(null);
    setKitchenConfig(initialKitchenConfig);
    setWardrobeConfig(initialWardrobeConfig);
    setBedroomConfig(initialBedroomConfig);
    setLivingRoomConfig(initialLivingRoomConfig);
    setOfficeConfig(initialOfficeConfig);
    setFullHomeConfig(initialFullHomeConfig);
    localStorage.removeItem('selectedEstimatorCategory');
  };

  const value = {
    currentStep,
    setCurrentStep,
    category,
    handleCategorySelect,
    kitchenConfig,
    updateKitchenConfig: (k, v) => updateConfig(kitchenConfig, setKitchenConfig, k, v),
    wardrobeConfig,
    updateWardrobeConfig: (k, v) => updateConfig(wardrobeConfig, setWardrobeConfig, k, v),
    bedroomConfig,
    updateBedroomConfig: (k, v) => updateConfig(bedroomConfig, setBedroomConfig, k, v),
    livingRoomConfig,
    updateLivingRoomConfig: (k, v) => updateConfig(livingRoomConfig, setLivingRoomConfig, k, v),
    officeConfig,
    updateOfficeConfig: (k, v) => updateConfig(officeConfig, setOfficeConfig, k, v),
    fullHomeConfig,
    updateFullHomeConfig: (k, v) => updateConfig(fullHomeConfig, setFullHomeConfig, k, v),
    leadData,
    setLeadData,
    estimateResult,
    calculateAndSetEstimate,
    nextStep,
    prevStep,
    resetEstimator
  };

  return (
    <EstimatorContext.Provider value={value}>
      {children}
    </EstimatorContext.Provider>
  );
};
