import React, { useState } from 'react';
import { useEstimator } from '../../../../context/EstimatorContext';
import ProgressIndicator from '../../ProgressIndicator';
import VisualOptionCard from '../../VisualOptionCard';
import LargeVisualCard from '../../LargeVisualCard';
import DimensionInput from '../../DimensionInput';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import bedOnlyImg from '../../../../assets/estimator/bedroom_scope_bed_1789802097630.png';
import bedProjectImg from '../../../../assets/projects/bedroom-1.webp';
import wardrobeImg from '../../../../assets/projects/wardrobe-1.webp';
import matteImg from '../../../../assets/estimator/finish_matte_laminate_1789802016310.png';
import acrylicImg from '../../../../assets/estimator/finish_glossy_acrylic_1789802033831.png';

const BEDROOM_STEPS = [
  'Scope',
  'Bed & Headboard',
  'Wardrobe & Dressing',
  'Material & Finish',
  'Package & Extras'
];

const BedroomFlow = ({ onComplete, onBackToCategory }) => {
  const { bedroomConfig, updateBedroomConfig } = useEstimator();
  const [internalStep, setInternalStep] = useState(1);

  const nextInternal = () => {
    if (internalStep < BEDROOM_STEPS.length) {
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
    if (internalStep === 1) return !bedroomConfig.scope;
    if (internalStep === 2) return !bedroomConfig.bedType || !bedroomConfig.headboard;
    if (internalStep === 3 && bedroomConfig.scope.includes('wardrobe')) {
       return !bedroomConfig.wardrobeType || !bedroomConfig.dimensions.wardrobeWidth;
    }
    return false;
  };

  const renderStepContent = () => {
    switch (internalStep) {
      case 1:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">What would you like to build?</h2>
              <p className="step-subtitle">Select the scope of furniture for your bedroom.</p>
            </div>
            <div className="layout-grid">
              <LargeVisualCard 
                title="Bed Only" 
                imageSrc={bedOnlyImg}
                isSelected={bedroomConfig.scope === 'bed'}
                onClick={() => updateBedroomConfig('scope', 'bed')}
              />
              <LargeVisualCard 
                title="Bed + Side Tables" 
                imageSrc={bedProjectImg}
                isSelected={bedroomConfig.scope === 'bed+tables'}
                onClick={() => updateBedroomConfig('scope', 'bed+tables')}
              />
              <LargeVisualCard 
                title="Bed + Wardrobe" 
                imageSrc={bedProjectImg}
                isSelected={bedroomConfig.scope === 'bed+wardrobe'}
                onClick={() => updateBedroomConfig('scope', 'bed+wardrobe')}
              />
              <LargeVisualCard 
                title="Complete Bedroom" 
                imageSrc={bedProjectImg}
                isSelected={bedroomConfig.scope === 'complete'}
                onClick={() => updateBedroomConfig('scope', 'complete')}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Bed Configuration</h2>
            </div>
            <h4 style={{ marginBottom: '16px', color: 'var(--dark-espresso)' }}>Bed Type</h4>
            <div className="options-grid" style={{ marginBottom: '40px' }}>
              <VisualOptionCard 
                title="Queen Size" description="Standard 5x6.5 ft"
                imageSrc={bedOnlyImg}
                isSelected={bedroomConfig.bedType === 'queen'}
                onClick={() => updateBedroomConfig('bedType', 'queen')}
              />
              <VisualOptionCard 
                title="King Size" description="Large 6x6.5 ft"
                imageSrc={bedOnlyImg}
                isSelected={bedroomConfig.bedType === 'king'}
                onClick={() => updateBedroomConfig('bedType', 'king')}
              />
              <VisualOptionCard 
                title="Storage Bed" description="Hydraulic or Drawer storage"
                imageSrc={bedProjectImg}
                isSelected={bedroomConfig.bedType === 'storage'}
                onClick={() => updateBedroomConfig('bedType', 'storage')}
              />
            </div>

            <h4 style={{ marginBottom: '16px', color: 'var(--dark-espresso)' }}>Headboard Design</h4>
            <div className="options-grid">
              <VisualOptionCard 
                title="Simple Wooden"
                imageSrc={matteImg}
                isSelected={bedroomConfig.headboard === 'wooden'}
                onClick={() => updateBedroomConfig('headboard', 'wooden')}
              />
              <VisualOptionCard 
                title="Upholstered (Fabric/Leather)"
                imageSrc={bedOnlyImg}
                isSelected={bedroomConfig.headboard === 'upholstered'}
                onClick={() => updateBedroomConfig('headboard', 'upholstered')}
              />
              <VisualOptionCard 
                title="Full Wall Paneling"
                imageSrc={bedProjectImg}
                isSelected={bedroomConfig.headboard === 'paneling'}
                onClick={() => updateBedroomConfig('headboard', 'paneling')}
              />
            </div>
          </div>
        );
      case 3:
        if (!bedroomConfig.scope.includes('wardrobe') && bedroomConfig.scope !== 'complete') {
          return (
            <div className="step-content text-center">
              <h2>No wardrobe or dressing unit selected in scope.</h2>
              <p>Click Next to continue to materials.</p>
            </div>
          );
        }
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Wardrobe & Storage Details</h2>
            </div>
            <div className="options-grid" style={{ marginBottom: '40px' }}>
              <VisualOptionCard 
                title="Hinged Wardrobe"
                imageSrc={wardrobeImg}
                isSelected={bedroomConfig.wardrobeType === 'hinged'}
                onClick={() => updateBedroomConfig('wardrobeType', 'hinged')}
              />
              <VisualOptionCard 
                title="Sliding Wardrobe"
                imageSrc={wardrobeImg}
                isSelected={bedroomConfig.wardrobeType === 'sliding'}
                onClick={() => updateBedroomConfig('wardrobeType', 'sliding')}
              />
            </div>
            <div className="dimensions-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <DimensionInput label="Approx Wardrobe Width" value={bedroomConfig.dimensions.wardrobeWidth} onChange={(v) => updateBedroomConfig('dimensions', { ...bedroomConfig.dimensions, wardrobeWidth: v })} />
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
                title="Plywood"
                imageSrc={matteImg}
                isSelected={bedroomConfig.coreMaterial === 'plywood'}
                onClick={() => updateBedroomConfig('coreMaterial', 'plywood')}
              />
              <VisualOptionCard 
                title="HDHMR"
                imageSrc={matteImg}
                isSelected={bedroomConfig.coreMaterial === 'hdhmr'}
                onClick={() => updateBedroomConfig('coreMaterial', 'hdhmr')}
              />
            </div>

            <h4 style={{ margin: '32px 0 16px', color: 'var(--dark-espresso)' }}>Primary Finish</h4>
            <div className="options-grid">
              <VisualOptionCard 
                title="Laminate"
                imageSrc={matteImg}
                isSelected={bedroomConfig.shutterFinish === 'laminate'}
                onClick={() => updateBedroomConfig('shutterFinish', 'laminate')}
              />
              <VisualOptionCard 
                title="Acrylic"
                imageSrc={acrylicImg}
                isSelected={bedroomConfig.shutterFinish === 'acrylic'}
                onClick={() => updateBedroomConfig('shutterFinish', 'acrylic')}
              />
              <VisualOptionCard 
                title="Veneer"
                imageSrc={bedProjectImg}
                isSelected={bedroomConfig.shutterFinish === 'veneer'}
                onClick={() => updateBedroomConfig('shutterFinish', 'veneer')}
              />
              <VisualOptionCard 
                title="PU Finish"
                imageSrc={bedProjectImg}
                isSelected={bedroomConfig.shutterFinish === 'pu'}
                onClick={() => updateBedroomConfig('shutterFinish', 'pu')}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Design Level</h2>
            </div>
            <div className="options-grid">
              <VisualOptionCard 
                title="Essential" description="Smart & Practical" isPackageCard={true}
                imageSrc={matteImg}
                isSelected={bedroomConfig.package === 'essential'}
                onClick={() => updateBedroomConfig('package', 'essential')}
              />
              <VisualOptionCard 
                title="Premium" description="Elegant & Enhanced" isPackageCard={true}
                imageSrc={bedProjectImg}
                isSelected={bedroomConfig.package === 'premium'}
                onClick={() => updateBedroomConfig('package', 'premium')}
              />
              <VisualOptionCard 
                title="Luxury" description="Statement & Bespoke" isPackageCard={true}
                imageSrc={wardrobeImg}
                isSelected={bedroomConfig.package === 'luxury'}
                onClick={() => updateBedroomConfig('package', 'luxury')}
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
      <ProgressIndicator currentStep={internalStep} totalSteps={BEDROOM_STEPS.length} stepLabels={BEDROOM_STEPS} />
      
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
          {internalStep === BEDROOM_STEPS.length ? 'Continue' : 'Next Step'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default BedroomFlow;
