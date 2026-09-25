import React, { useState } from 'react';
import { useEstimator } from '../../../../context/EstimatorContext';
import ProgressIndicator from '../../ProgressIndicator';
import VisualOptionCard from '../../VisualOptionCard';
import LargeVisualCard from '../../LargeVisualCard';
import DimensionInput from '../../DimensionInput';
import MaterialCard from '../../MaterialCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';



























import { getImgUrl } from '../../../../utils/cloudinary';


const WARDROBE_STEPS = [
  'Scope',
  'Internal Layout',
  'Dimensions',
  'Material & Finish',
  'Accessories'
];

const WardrobeFlow = ({ onComplete, onBackToCategory }) => {
  const { wardrobeConfig, updateWardrobeConfig } = useEstimator();
  const [internalStep, setInternalStep] = useState(1);

  const nextInternal = () => {
    if (internalStep < WARDROBE_STEPS.length) {
      setInternalStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const prevInternal = () => {
    if (internalStep > 1) {
      setInternalStep(prev => prev - 1);
    } else {
      onBackToCategory();
    }
  };

  const isNextDisabled = () => {
    if (internalStep === 1) return !wardrobeConfig.type;
    if (internalStep === 2) return !wardrobeConfig.internalLayout;
    if (internalStep === 3) {
      const d = wardrobeConfig.dimensions;
      return !d.width || !d.height || !d.depth;
    }
    if (internalStep === 4) {
      return !wardrobeConfig.coreMaterial || !wardrobeConfig.shutterFinish;
    }
    return false;
  };

  const handleAccessoryToggle = (val) => {
    let current = [...wardrobeConfig.accessories];
    if (current.includes(val)) {
      current = current.filter(c => c !== val);
    } else {
      current.push(val);
    }
    updateWardrobeConfig('accessories', current);
  };

  const handleDimensionChange = (key, val) => {
    updateWardrobeConfig('dimensions', { ...wardrobeConfig.dimensions, [key]: val });
  };

  const renderStepContent = () => {
    switch (internalStep) {
      case 1:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Choose Your Wardrobe Type</h2>
              <p className="step-subtitle">Select the outer structure of your wardrobe.</p>
            </div>
            <div className="layout-grid-4">
              <LargeVisualCard 
                title="Hinged Wardrobe" 
                imageSrc={getImgUrl("est-wd-hinged")}
                isSelected={wardrobeConfig.type === 'hinged'}
                onClick={() => updateWardrobeConfig('type', 'hinged')}
              />
              <LargeVisualCard 
                title="Sliding Wardrobe" 
                imageSrc={getImgUrl("est-wd-sliding")}
                isSelected={wardrobeConfig.type === 'sliding'}
                onClick={() => updateWardrobeConfig('type', 'sliding')}
              />
              <LargeVisualCard 
                title="Walk-in Wardrobe" 
                imageSrc={getImgUrl("est-wd-walk-in")}
                isSelected={wardrobeConfig.type === 'walk-in'}
                onClick={() => updateWardrobeConfig('type', 'walk-in')}
              />
              <LargeVisualCard 
                title="Built-in / Niche Wardrobe" 
                imageSrc={getImgUrl("est-wd-built-in-niche")}
                isSelected={wardrobeConfig.type === 'built-in'}
                onClick={() => updateWardrobeConfig('type', 'built-in')}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Configure Internal Layout</h2>
              <p className="step-subtitle">How do you want to organize the inside?</p>
            </div>
            <div className="options-grid">
              <VisualOptionCard 
                title="Hanging Focus" 
                description="More space for hanging clothes"
                imageSrc={getImgUrl("est-wd-hanging-focus")}
                isSelected={wardrobeConfig.internalLayout === 'hanging'}
                onClick={() => updateWardrobeConfig('internalLayout', 'hanging')}
              />
              <VisualOptionCard 
                title="Shelving Focus" 
                description="More stacked folded clothes"
                imageSrc={getImgUrl("est-wd-shelving-focus")}
                isSelected={wardrobeConfig.internalLayout === 'shelves'}
                onClick={() => updateWardrobeConfig('internalLayout', 'shelves')}
              />
              <VisualOptionCard 
                title="Balanced / Combination" 
                description="Mix of hanging, shelves, and drawers"
                imageSrc={getImgUrl("est-wd-balanced-combo")}
                isSelected={wardrobeConfig.internalLayout === 'combination'}
                onClick={() => updateWardrobeConfig('internalLayout', 'combination')}
              />
              <VisualOptionCard 
                title="Drawer Heavy" 
                description="Extra internal drawers"
                imageSrc={getImgUrl("est-wd-drawer-heavy")}
                isSelected={wardrobeConfig.internalLayout === 'drawers'}
                onClick={() => updateWardrobeConfig('internalLayout', 'drawers')}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Wardrobe Dimensions</h2>
              <p className="step-subtitle">Provide approximate dimensions for your wardrobe space.</p>
            </div>
            <div className="dimensions-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <DimensionInput label="Width" value={wardrobeConfig.dimensions.width} onChange={(v) => handleDimensionChange('width', v)} />
              <DimensionInput label="Height" value={wardrobeConfig.dimensions.height} onChange={(v) => handleDimensionChange('height', v)} />
              <DimensionInput label="Depth" value={wardrobeConfig.dimensions.depth} onChange={(v) => handleDimensionChange('depth', v)} />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Select Material & Finish</h2>
            </div>
            
            <h4 style={{ marginBottom: '16px', color: 'var(--dark-espresso)' }}>Core Material</h4>
            <div className="layout-grid-2x2">
              <MaterialCard 
                title="Plywood" 
                description="Strong, durable and reliable"
                imageSrc={getImgUrl("est-mat-plywood")}
                insetSrc={getImgUrl("est-mat-plywood")}
                isSelected={wardrobeConfig.coreMaterial === 'plywood'}
                onClick={() => updateWardrobeConfig('coreMaterial', 'plywood')}
                features={[
                  { icon: 'shield', text: 'Strong & Durable' },
                  { icon: 'drop', text: 'Moisture Resistant' },
                  { icon: 'leaf', text: 'Long Lasting' }
                ]}
              />
              <MaterialCard 
                title="HDHMR" 
                description="High density, more durable & moisture resistant"
                imageSrc={getImgUrl("est-mat-hdhmr")}
                insetSrc={getImgUrl("est-mat-hdhmr")}
                isSelected={wardrobeConfig.coreMaterial === 'hdhmr'}
                onClick={() => updateWardrobeConfig('coreMaterial', 'hdhmr')}
                features={[
                  { icon: 'shield', text: 'High Density' },
                  { icon: 'drop', text: 'Moisture & Termite Resistant' },
                  { icon: 'leaf', text: 'Smooth Finish' },
                  { icon: 'gear', text: 'Ideal for Premium Interiors' }
                ]}
              />
            </div>

            <h4 style={{ margin: '32px 0 16px', color: 'var(--dark-espresso)' }}>Shutter Finish</h4>
            <div className="layout-grid-2x2">
              <MaterialCard 
                title="Laminate" 
                description="Stylish, durable and easy to maintain"
                imageSrc={getImgUrl("est-fin-laminate")}
                isSelected={wardrobeConfig.shutterFinish === 'laminate'}
                onClick={() => updateWardrobeConfig('shutterFinish', 'laminate')}
                features={[
                  { icon: 'sparkle', text: 'Wide Variety of Colors & Textures' },
                  { icon: 'shield', text: 'Scratch Resistant' },
                  { icon: 'drop', text: 'Easy to Clean' },
                  { icon: 'layer', text: 'Budget Friendly' }
                ]}
              />
              <MaterialCard 
                title="Veneer" 
                description="Natural wood beauty with a premium look"
                imageSrc={getImgUrl("est-fin-veneer")}
                isSelected={wardrobeConfig.shutterFinish === 'veneer'}
                onClick={() => updateWardrobeConfig('shutterFinish', 'veneer')}
                features={[
                  { icon: 'leaf', text: 'Natural Wood Look' },
                  { icon: 'diamond', text: 'Premium Appearance' },
                  { icon: 'leaf', text: 'Unique Grain Patterns' },
                  { icon: 'sparkle', text: 'Elegant & Timeless' }
                ]}
              />
              <MaterialCard 
                title="PU Finish" 
                description="Luxurious look with long lasting finish"
                imageSrc={getImgUrl("est-fin-pu")}
                isSelected={wardrobeConfig.shutterFinish === 'pu'}
                onClick={() => updateWardrobeConfig('shutterFinish', 'pu')}
                features={[
                  { icon: 'sparkle', text: 'Smooth & Glossy Finish' },
                  { icon: 'shield', text: 'Scratch Resistant' },
                  { icon: 'drop', text: 'Water Resistant' },
                  { icon: 'layer', text: 'Available in Matte, Gloss & High Gloss' }
                ]}
              />
              <MaterialCard 
                title="Acrylic" 
                description="High gloss, modern look, and easy to clean"
                imageSrc={getImgUrl("est-fin-glossy-acrylic")}
                isSelected={wardrobeConfig.shutterFinish === 'acrylic'}
                onClick={() => updateWardrobeConfig('shutterFinish', 'acrylic')}
                features={[
                  { icon: 'sparkle', text: 'High Gloss Finish' },
                  { icon: 'shield', text: 'Scratch Resistant' },
                  { icon: 'drop', text: 'Moisture Resistant' },
                  { icon: 'layer', text: 'Vibrant Colors' }
                ]}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Optional Accessories</h2>
              <p className="step-subtitle">Enhance your wardrobe with smart accessories</p>
            </div>
            
            <div className="options-grid" style={{ marginBottom: '40px' }}>
              <VisualOptionCard 
                title="Pull-down Hanger"
                description="Easily access high storage space"
                imageSrc={getImgUrl("est-wd-pulldown-hanger")}
                isSelected={wardrobeConfig.accessories.includes('pullDown')}
                onClick={() => handleAccessoryToggle('pullDown')}
              />
              <VisualOptionCard 
                title="Jewellery Drawer"
                description="Organized storage for your valuables"
                imageSrc={getImgUrl("est-wd-jewellery-drawer")}
                isSelected={wardrobeConfig.accessories.includes('jewellery')}
                onClick={() => handleAccessoryToggle('jewellery')}
              />
              <VisualOptionCard 
                title="Internal Lighting"
                description="Better visibility with elegant lighting"
                imageSrc={getImgUrl("est-add-internal-light")}
                isSelected={wardrobeConfig.accessories.includes('lighting')}
                onClick={() => handleAccessoryToggle('lighting')}
              />
              <VisualOptionCard 
                title="Mirror"
                description="Full-length mirror for your convenience"
                imageSrc={getImgUrl("est-wd-mirror")}
                isSelected={wardrobeConfig.accessories.includes('mirror')}
                onClick={() => handleAccessoryToggle('mirror')}
              />
              <VisualOptionCard 
                title="Soft-close Hardware"
                description="Smooth and silent closing"
                imageSrc={getImgUrl("est-hw-self-close")}
                isSelected={wardrobeConfig.accessories.includes('softClose')}
                onClick={() => handleAccessoryToggle('softClose')}
              />
              <VisualOptionCard 
                title="Trouser Rack"
                description="Keep your trousers neat and organized"
                imageSrc={getImgUrl("est-wd-trouser-rack")}
                isSelected={wardrobeConfig.accessories.includes('trouserRack')}
                onClick={() => handleAccessoryToggle('trouserRack')}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <ProgressIndicator currentStep={internalStep} totalSteps={WARDROBE_STEPS.length} stepLabels={WARDROBE_STEPS} />
      
      {renderStepContent()}

      <div className="step-actions">
        <button className="btn-back" onClick={prevInternal}>
          <ArrowLeft size={16} /> Back
        </button>
        <button 
          className="btn btn-primary-dark" 
          onClick={nextInternal} 
          disabled={isNextDisabled()}
          style={{ opacity: isNextDisabled() ? 0.5 : 1 }}
        >
          {internalStep === WARDROBE_STEPS.length ? 'Continue' : 'Next Step'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default WardrobeFlow;
