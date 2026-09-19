import React, { useState } from 'react';
import { useEstimator } from '../../../../context/EstimatorContext';
import ProgressIndicator from '../../ProgressIndicator';
import VisualOptionCard from '../../VisualOptionCard';
import LargeVisualCard from '../../LargeVisualCard';
import DimensionInput from '../../DimensionInput';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import hingedImg from '../../../../assets/estimator/wardrobe_type_hinged_1789802046966.png';
import slidingImg from '../../../../assets/estimator/wardrobe_type_sliding_1789802064907.png';
import walkInImg from '../../../../assets/estimator/wardrobe_type_walkin_1789802081466.png';
import builtInImg from '../../../../assets/projects/wardrobe-1.webp';
import matteImg from '../../../../assets/estimator/finish_matte_laminate_1789802016310.png';
import acrylicImg from '../../../../assets/estimator/finish_glossy_acrylic_1789802033831.png';
import showroomImg from '../../../../assets/projects/showroom-1.webp';
import wardrobe1 from '../../../../assets/projects/wardrobe-1.webp';

const WARDROBE_STEPS = [
  'Type',
  'Internal Layout',
  'Dimensions',
  'Material & Finish',
  'Package & Extras'
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
      return !d.width || !d.height;
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
            <div className="layout-grid">
              <LargeVisualCard 
                title="Hinged Wardrobe" 
                imageSrc={hingedImg}
                isSelected={wardrobeConfig.type === 'hinged'}
                onClick={() => updateWardrobeConfig('type', 'hinged')}
              />
              <LargeVisualCard 
                title="Sliding Wardrobe" 
                imageSrc={slidingImg}
                isSelected={wardrobeConfig.type === 'sliding'}
                onClick={() => updateWardrobeConfig('type', 'sliding')}
              />
              <LargeVisualCard 
                title="Walk-in Wardrobe" 
                imageSrc={walkInImg}
                isSelected={wardrobeConfig.type === 'walk-in'}
                onClick={() => updateWardrobeConfig('type', 'walk-in')}
              />
              <LargeVisualCard 
                title="Built-in / Niche Wardrobe" 
                imageSrc={builtInImg}
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
                imageSrc={wardrobe1}
                isSelected={wardrobeConfig.internalLayout === 'hanging'}
                onClick={() => updateWardrobeConfig('internalLayout', 'hanging')}
              />
              <VisualOptionCard 
                title="Shelving Focus" 
                description="More stacked folded clothes"
                imageSrc={wardrobe1}
                isSelected={wardrobeConfig.internalLayout === 'shelves'}
                onClick={() => updateWardrobeConfig('internalLayout', 'shelves')}
              />
              <VisualOptionCard 
                title="Balanced / Combination" 
                description="Mix of hanging, shelves, and drawers"
                imageSrc={walkInImg}
                isSelected={wardrobeConfig.internalLayout === 'combination'}
                onClick={() => updateWardrobeConfig('internalLayout', 'combination')}
              />
              <VisualOptionCard 
                title="Drawer Heavy" 
                description="Extra internal drawers"
                imageSrc={wardrobe1}
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
            <div className="options-grid">
              <VisualOptionCard 
                title="BWP Plywood" description="Waterproof, premium core"
                imageSrc={matteImg}
                isSelected={wardrobeConfig.coreMaterial === 'plywood'}
                onClick={() => updateWardrobeConfig('coreMaterial', 'plywood')}
              />
              <VisualOptionCard 
                title="HDHMR" description="Moisture resistant, durable"
                imageSrc={matteImg}
                isSelected={wardrobeConfig.coreMaterial === 'hdhmr'}
                onClick={() => updateWardrobeConfig('coreMaterial', 'hdhmr')}
              />
            </div>

            <h4 style={{ margin: '32px 0 16px', color: 'var(--dark-espresso)' }}>Shutter Finish</h4>
            <div className="options-grid">
              <VisualOptionCard 
                title="Matte Laminate" description="Durable, budget-friendly"
                imageSrc={matteImg}
                isSelected={wardrobeConfig.shutterFinish === 'laminate'}
                onClick={() => updateWardrobeConfig('shutterFinish', 'laminate')}
              />
              <VisualOptionCard 
                title="Acrylic" description="Smooth, reflective gloss"
                imageSrc={acrylicImg}
                isSelected={wardrobeConfig.shutterFinish === 'acrylic'}
                onClick={() => updateWardrobeConfig('shutterFinish', 'acrylic')}
              />
              <VisualOptionCard 
                title="Veneer" description="Natural wood character"
                imageSrc={wardrobe1}
                isSelected={wardrobeConfig.shutterFinish === 'veneer'}
                onClick={() => updateWardrobeConfig('shutterFinish', 'veneer')}
              />
              <VisualOptionCard 
                title="Glass / Mirror" description="Profile frames with glass"
                imageSrc={wardrobe1}
                isSelected={wardrobeConfig.shutterFinish === 'glass'}
                onClick={() => updateWardrobeConfig('shutterFinish', 'glass')}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Accessories & Package</h2>
            </div>
            
            <h4 style={{ marginBottom: '16px', color: 'var(--dark-espresso)' }}>Optional Accessories</h4>
            <div className="options-grid" style={{ marginBottom: '40px' }}>
              <VisualOptionCard 
                title="Pull-down Hanger"
                imageSrc={wardrobe1}
                isSelected={wardrobeConfig.accessories.includes('pullDown')}
                onClick={() => handleAccessoryToggle('pullDown')}
              />
              <VisualOptionCard 
                title="Jewellery Drawer"
                imageSrc={wardrobe1}
                isSelected={wardrobeConfig.accessories.includes('jewellery')}
                onClick={() => handleAccessoryToggle('jewellery')}
              />
              <VisualOptionCard 
                title="Internal Lighting"
                imageSrc={walkInImg}
                isSelected={wardrobeConfig.accessories.includes('lighting')}
                onClick={() => handleAccessoryToggle('lighting')}
              />
            </div>

            <h4 style={{ marginBottom: '16px', color: 'var(--dark-espresso)' }}>Design Level</h4>
            <div className="options-grid">
              <VisualOptionCard 
                title="Essential" description="Smart & Practical" isPackageCard={true}
                imageSrc={matteImg}
                isSelected={wardrobeConfig.package === 'essential'}
                onClick={() => updateWardrobeConfig('package', 'essential')}
              />
              <VisualOptionCard 
                title="Premium" description="Elegant & Enhanced" isPackageCard={true}
                imageSrc={wardrobe1}
                isSelected={wardrobeConfig.package === 'premium'}
                onClick={() => updateWardrobeConfig('package', 'premium')}
              />
              <VisualOptionCard 
                title="Luxury" description="Statement & Bespoke" isPackageCard={true}
                imageSrc={wardrobe1}
                isSelected={wardrobeConfig.package === 'luxury'}
                onClick={() => updateWardrobeConfig('package', 'luxury')}
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
