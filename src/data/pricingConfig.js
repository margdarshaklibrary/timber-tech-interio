export const pricingConfig = {
  // Base rate per square foot of cabinet front area (indicative)
  baseRatePerSqft: {
    plywood: 1200, // standard BWP plywood base
    hdhmr: 950,
    mdf: 750,
  },

  // Multipliers for finishes
  finishMultipliers: {
    laminate: 1.0,    // Base line
    acrylic: 1.3,     // 30% more
    pu: 1.6,          // 60% more
    veneer: 1.5,
    glass: 1.4,
  },

  // Multipliers for overall package quality (hardware, lighting, etc.)
  packageMultipliers: {
    essential: 1.0,
    premium: 1.25,
    smart_luxury: 1.35,
    luxury: 1.6,
  },

  // Constants for Kitchen dimensions
  kitchen: {
    // Standard heights in feet for estimating area
    standardBaseHeight: 2.75, // approx 33 inches
    standardUpperHeight: 2.0, // approx 24 inches
    extendedUpperHeight: 3.0, // approx 36 inches
    loftHeight: 2.0,
    tallUnitHeight: 7.0,

    // Estimated add-on costs
    hardware: {
      standard: 0,
      softClose: 5000,
      premium: 15000,
    },
    countertop: {
      granite: 250, // per sqft roughly
      quartz: 450,
      solidSurface: 600,
    },
    accessories: {
      cutleryTray: 1500,
      bottlePullOut: 2500,
      tandemDrawer: 4000,
      cornerUnit: 8000,
      magicCorner: 18000,
      wickerBasket: 2000,
      underSinkOrganizer: 3000,
      dustbinUnit: 1500,
    }
  }
};
