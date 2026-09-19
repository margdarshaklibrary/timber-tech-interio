import { pricingConfig } from '../data/pricingConfig';

/**
 * Calculates the estimated price range for a kitchen configuration.
 * @param {Object} config The user's selections from the EstimatorContext
 * @returns {Object} { min: number, max: number, breakdown: Object }
 */
export const calculateKitchenEstimate = (config) => {
  const { 
    layout, dimensions, cabinetConfig, package: packageTier, 
    coreMaterial, shutterFinish, hardware, countertop, accessories 
  } = config;

  // 1. Calculate base Running Feet (RFT)
  let totalBaseRFT = 0;
  
  if (layout === 'straight' && dimensions.length) {
    totalBaseRFT = dimensions.length;
  } else if (layout === 'l-shaped' && dimensions.runA && dimensions.runB) {
    // Subtract corner overlap (approx 2ft)
    totalBaseRFT = dimensions.runA + dimensions.runB - 2;
  } else if (layout === 'parallel' && dimensions.runA && dimensions.runB) {
    totalBaseRFT = dimensions.runA + dimensions.runB;
  } else if (layout === 'u-shaped' && dimensions.runA && dimensions.runB && dimensions.runC) {
    // Subtract two corners (approx 4ft)
    totalBaseRFT = dimensions.runA + dimensions.runB + dimensions.runC - 4;
  } else if (layout === 'island' && dimensions.mainRun && dimensions.islandLength) {
    totalBaseRFT = dimensions.mainRun + dimensions.islandLength;
  }

  // Ensure minimum RFT for calculation safety
  totalBaseRFT = Math.max(totalBaseRFT, 0);

  // 2. Calculate approximate Square Feet (SQFT) based on cabinet configuration
  let totalBaseSqft = 0;
  let totalUpperSqft = 0;
  let totalTallSqft = 0;

  if (cabinetConfig.includes('base') || cabinetConfig.includes('complete')) {
    totalBaseSqft = totalBaseRFT * pricingConfig.kitchen.standardBaseHeight;
  }
  
  if (cabinetConfig.includes('upper') || cabinetConfig.includes('complete')) {
    totalUpperSqft = totalBaseRFT * pricingConfig.kitchen.standardUpperHeight;
  }

  if (cabinetConfig.includes('tall') || cabinetConfig.includes('complete')) {
    // Assuming 1 standard tall unit is 2ft wide
    totalTallSqft = 2 * pricingConfig.kitchen.tallUnitHeight;
    // Remove the tall unit width from base/upper RFT
    totalBaseSqft = Math.max(0, totalBaseSqft - (2 * pricingConfig.kitchen.standardBaseHeight));
    totalUpperSqft = Math.max(0, totalUpperSqft - (2 * pricingConfig.kitchen.standardUpperHeight));
  }

  const totalCabinetSqft = totalBaseSqft + totalUpperSqft + totalTallSqft;

  // 3. Apply Base Rate and Multipliers
  const baseRate = pricingConfig.baseRatePerSqft[coreMaterial] || pricingConfig.baseRatePerSqft.plywood;
  const finishMultiplier = pricingConfig.finishMultipliers[shutterFinish] || 1.0;
  const packageMultiplier = pricingConfig.packageMultipliers[packageTier] || 1.0;

  let baseFurnitureCost = totalCabinetSqft * baseRate * finishMultiplier;

  // 4. Add Hardware & Accessories
  let hardwareCost = pricingConfig.kitchen.hardware[hardware] || 0;
  let accessoriesCost = 0;
  
  if (Array.isArray(accessories)) {
    accessories.forEach(acc => {
      accessoriesCost += pricingConfig.kitchen.accessories[acc] || 0;
    });
  }

  // 5. Add Countertop (if base cabinets exist)
  let countertopCost = 0;
  if (totalBaseSqft > 0 && countertop !== 'none') {
    // Countertop depth is usually 2ft
    const countertopSqft = totalBaseRFT * 2;
    const counterRate = pricingConfig.kitchen.countertop[countertop] || 0;
    countertopCost = countertopSqft * counterRate;
  }

  // 6. Calculate Totals
  const totalCost = (baseFurnitureCost + hardwareCost + accessoriesCost) * packageMultiplier + countertopCost;

  // Create a realistic range (-10% to +15%) to avoid false precision
  const minEstimate = Math.round(totalCost * 0.9 / 1000) * 1000;
  const maxEstimate = Math.round(totalCost * 1.15 / 1000) * 1000;

  return {
    minPrice: minEstimate || 50000,
    maxPrice: maxEstimate || 75000,
    isSmartLuxury: packageTier === 'smart_luxury',
    breakdown: {
      furniture: Math.round(baseFurnitureCost),
      hardware: Math.round(hardwareCost + accessoriesCost),
      materials: Math.round(baseFurnitureCost * (packageMultiplier - 1) + countertopCost),
      installation: Math.round(totalCost * 0.1),
    }
  };
};

export const calculateWardrobeEstimate = (config) => {
  const { dimensions, package: packageTier } = config;
  const sqft = (dimensions.width || 0) * (dimensions.height || 0);
  const baseRate = 1200;
  const packageMultiplier = pricingConfig.packageMultipliers[packageTier] || 1.0;
  
  const totalCost = sqft * baseRate * packageMultiplier;
  
  return {
    minPrice: Math.round(totalCost * 0.9 / 1000) * 1000 || 30000,
    maxPrice: Math.round(totalCost * 1.15 / 1000) * 1000 || 45000,
    isSmartLuxury: packageTier === 'smart_luxury',
    breakdown: {
      furniture: Math.round(totalCost * 0.6),
      hardware: Math.round(totalCost * 0.15),
      materials: Math.round(totalCost * 0.15),
      installation: Math.round(totalCost * 0.1),
    }
  };
};

export const calculateBedroomEstimate = (config) => {
  const { package: packageTier } = config;
  const baseRate = 80000;
  const packageMultiplier = pricingConfig.packageMultipliers[packageTier] || 1.0;
  const totalCost = baseRate * packageMultiplier;

  return {
    minPrice: Math.round(totalCost * 0.9 / 1000) * 1000 || 60000,
    maxPrice: Math.round(totalCost * 1.15 / 1000) * 1000 || 90000,
    isSmartLuxury: packageTier === 'smart_luxury',
    breakdown: {
      furniture: Math.round(totalCost * 0.6),
      hardware: Math.round(totalCost * 0.1),
      materials: Math.round(totalCost * 0.2),
      installation: Math.round(totalCost * 0.1),
    }
  };
};

export const calculateLivingEstimate = (config) => {
  const { package: packageTier } = config;
  const baseRate = 50000;
  const packageMultiplier = pricingConfig.packageMultipliers[packageTier] || 1.0;
  const totalCost = baseRate * packageMultiplier;

  return {
    minPrice: Math.round(totalCost * 0.9 / 1000) * 1000 || 40000,
    maxPrice: Math.round(totalCost * 1.15 / 1000) * 1000 || 60000,
    isSmartLuxury: packageTier === 'smart_luxury',
    breakdown: {
      furniture: Math.round(totalCost * 0.6),
      hardware: Math.round(totalCost * 0.1),
      materials: Math.round(totalCost * 0.2),
      installation: Math.round(totalCost * 0.1),
    }
  };
};

export const calculateOfficeEstimate = (config) => {
  const { seats, dimensions, package: packageTier } = config;
  const areaRate = (dimensions.areaSqft || 0) * 800;
  const seatRate = (seats === '10+' ? 12 : seats || 0) * 15000;
  const packageMultiplier = pricingConfig.packageMultipliers[packageTier] || 1.0;
  const totalCost = (areaRate + seatRate) * packageMultiplier;

  return {
    minPrice: Math.round(totalCost * 0.9 / 1000) * 1000 || 100000,
    maxPrice: Math.round(totalCost * 1.15 / 1000) * 1000 || 150000,
    isSmartLuxury: packageTier === 'smart_luxury',
    breakdown: {
      furniture: Math.round(totalCost * 0.7),
      hardware: Math.round(totalCost * 0.1),
      materials: Math.round(totalCost * 0.1),
      installation: Math.round(totalCost * 0.1),
    }
  };
};

export const calculateFullHomeEstimate = (config) => {
  const { rooms, package: packageTier } = config;
  const roomBase = (rooms?.length || 0) * 120000;
  const packageMultiplier = pricingConfig.packageMultipliers[packageTier] || 1.0;
  const totalCost = roomBase * packageMultiplier;

  return {
    minPrice: Math.round(totalCost * 0.9 / 1000) * 1000 || 300000,
    maxPrice: Math.round(totalCost * 1.15 / 1000) * 1000 || 450000,
    isSmartLuxury: packageTier === 'smart_luxury',
    breakdown: {
      furniture: Math.round(totalCost * 0.5),
      hardware: Math.round(totalCost * 0.15),
      materials: Math.round(totalCost * 0.25),
      installation: Math.round(totalCost * 0.1),
    }
  };
};

export const formatCurrency = (value) => {
  if (!value) return '₹0';
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} Lakh`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};
