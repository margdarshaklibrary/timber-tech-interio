import React, { useState } from 'react';
import { useEstimator } from '../../../../context/EstimatorContext';
import ProgressIndicator from '../../ProgressIndicator';
import VisualOptionCard from '../../VisualOptionCard';
import LargeVisualCard from '../../LargeVisualCard';
import DimensionInput from '../../DimensionInput';
import { ArrowLeft, ArrowRight } from 'lucide-react';






import MaterialCard from '../../MaterialCard';







// New Layout & Storage Images





// New Accessories & Accents Images




import { getImgUrl } from '../../../../utils/cloudinary';


const LIVING_STEPS = [
  'Scope',
  'Layout & Storage',
  'Dimensions',
  'Material & Finish',
  'Accessories & Accents'
];

const LivingRoomFlow = ({ onComplete, onBackToCategory }) => {
  const { livingRoomConfig, updateLivingRoomConfig } = useEstimator();
  const [internalStep, setInternalStep] = useState(1);

  const nextInternal = () => {
    if (internalStep < LIVING_STEPS.length) {
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
    if (internalStep === 1) return !livingRoomConfig.scope;
    if (internalStep === 2) return livingRoomConfig.storage.length === 0;
    if (internalStep === 3) {
      const d = livingRoomConfig.dimensions;
      return !d.wallWidth || !d.wallHeight || !d.depth || !d.tvSize;
    }
    if (internalStep === 4) return !livingRoomConfig.coreMaterial || !livingRoomConfig.shutterFinish;
    return false;
  };

  const handleStorageToggle = (val) => {
    let current = [...livingRoomConfig.storage];
    if (current.includes(val)) {
      current = current.filter(c => c !== val);
    } else {
      current.push(val);
    }
    updateLivingRoomConfig('storage', current);
  };

  const handleDesignToggle = (val) => {
    let current = [...livingRoomConfig.designAccents];
    if (current.includes(val)) {
      current = current.filter(c => c !== val);
    } else {
      current.push(val);
    }
    updateLivingRoomConfig('designAccents', current);
  };

  const renderStepContent = () => {
    switch (internalStep) {
      case 1:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">What would you like to build?</h2>
            </div>
            <div className="layout-grid-2x2">
              <LargeVisualCard 
                title="TV Unit (Base only)" 
                imageSrc={getImgUrl("est-tv-base-only")}
                isWide={true}
                isSelected={livingRoomConfig.scope === 'tv-base'}
                onClick={() => updateLivingRoomConfig('scope', 'tv-base')}
              />
              <LargeVisualCard 
                title="Full Wall TV Unit" 
                imageSrc={getImgUrl("est-tv-full-wall")}
                isWide={true}
                isSelected={livingRoomConfig.scope === 'tv-full'}
                onClick={() => updateLivingRoomConfig('scope', 'tv-full')}
              />
              <LargeVisualCard 
                title="Display / Storage Unit" 
                imageSrc={getImgUrl("est-liv-display-storage")}
                isWide={true}
                isSelected={livingRoomConfig.scope === 'storage'}
                onClick={() => updateLivingRoomConfig('scope', 'storage')}
              />
              <LargeVisualCard 
                title="Wall Paneling" 
                imageSrc={getImgUrl("est-wall-paneling")}
                isWide={true}
                isSelected={livingRoomConfig.scope === 'paneling'}
                onClick={() => updateLivingRoomConfig('scope', 'paneling')}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Layout & Storage</h2>
              <p className="step-subtitle">How should the TV Unit be arranged?</p>
            </div>
            <div className="options-grid">
              <VisualOptionCard 
                title="Base Cabinets" 
                description="Storage below the TV"
                imageSrc={getImgUrl("est-tv-base-cabinet")}
                isSelected={livingRoomConfig.storage.includes('base')}
                onClick={() => handleStorageToggle('base')}
              />
              <VisualOptionCard 
                title="Wall Cabinets" 
                description="Closed storage above or beside TV"
                imageSrc={getImgUrl("est-tv-wall-cabinet")}
                isSelected={livingRoomConfig.storage.includes('wall')}
                onClick={() => handleStorageToggle('wall')}
              />
              <VisualOptionCard 
                title="Open Shelves" 
                description="Display shelves for books or decor"
                imageSrc={getImgUrl("est-tv-open-shelves")}
                isSelected={livingRoomConfig.storage.includes('shelves')}
                onClick={() => handleStorageToggle('shelves')}
              />
              <VisualOptionCard 
                title="Drawers" 
                description="Concealed storage for accessories"
                imageSrc={getImgUrl("est-tv-drawers")}
                isSelected={livingRoomConfig.storage.includes('drawers')}
                onClick={() => handleStorageToggle('drawers')}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Dimensions</h2>
              <p className="step-subtitle">Provide approximate dimensions for your TV Unit.</p>
            </div>
            <div className="dimensions-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <DimensionInput label="Overall Width" value={livingRoomConfig.dimensions.wallWidth} onChange={(v) => updateLivingRoomConfig('dimensions', { ...livingRoomConfig.dimensions, wallWidth: v })} />
              <DimensionInput label="Overall Height" value={livingRoomConfig.dimensions.wallHeight} onChange={(v) => updateLivingRoomConfig('dimensions', { ...livingRoomConfig.dimensions, wallHeight: v })} />
              <DimensionInput label="Overall Depth" value={livingRoomConfig.dimensions.depth} onChange={(v) => updateLivingRoomConfig('dimensions', { ...livingRoomConfig.dimensions, depth: v })} />
              <DimensionInput label="TV Size (inches)" value={livingRoomConfig.dimensions.tvSize} onChange={(v) => updateLivingRoomConfig('dimensions', { ...livingRoomConfig.dimensions, tvSize: v })} unit="in" placeholder="e.g. 55" />
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
                isSelected={livingRoomConfig.coreMaterial === 'plywood'}
                onClick={() => updateLivingRoomConfig('coreMaterial', 'plywood')}
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
                isSelected={livingRoomConfig.coreMaterial === 'hdhmr'}
                onClick={() => updateLivingRoomConfig('coreMaterial', 'hdhmr')}
                features={[
                  { icon: 'shield', text: 'High Density' },
                  { icon: 'drop', text: 'Moisture & Termite Resistant' },
                  { icon: 'leaf', text: 'Smooth Finish' },
                  { icon: 'gear', text: 'Ideal for Premium Interiors' }
                ]}
              />
            </div>

            <h4 style={{ margin: '32px 0 16px', color: 'var(--dark-espresso)' }}>Finish</h4>
            <div className="layout-grid-2x2">
              <MaterialCard 
                title="Laminate" 
                description="Stylish, durable and easy to maintain"
                imageSrc={getImgUrl("est-fin-laminate")}
                isSelected={livingRoomConfig.shutterFinish === 'laminate'}
                onClick={() => updateLivingRoomConfig('shutterFinish', 'laminate')}
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
                isSelected={livingRoomConfig.shutterFinish === 'veneer'}
                onClick={() => updateLivingRoomConfig('shutterFinish', 'veneer')}
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
                isSelected={livingRoomConfig.shutterFinish === 'pu'}
                onClick={() => updateLivingRoomConfig('shutterFinish', 'pu')}
                features={[
                  { icon: 'sparkle', text: 'Smooth & Glossy Finish' },
                  { icon: 'shield', text: 'Scratch Resistant' },
                  { icon: 'drop', text: 'Water Resistant' },
                  { icon: 'layer', text: 'Available in Matte, Gloss & High Gloss' }
                ]}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Accents</h2>
            </div>
            
            <h4 style={{ marginBottom: '16px', color: 'var(--dark-espresso)' }}>Accessories & Accents</h4>
            <div className="options-grid" style={{ marginBottom: '40px' }}>
              <VisualOptionCard 
                title="Fluted Panel"
                imageSrc={getImgUrl("est-wall-fluted-panel")}
                isSelected={livingRoomConfig.designAccents.includes('fluted')}
                onClick={() => handleDesignToggle('fluted')}
              />
              <VisualOptionCard 
                title="Backlighting"
                imageSrc={getImgUrl("est-add-backlighting")}
                isSelected={livingRoomConfig.designAccents.includes('lighting')}
                onClick={() => handleDesignToggle('lighting')}
              />
              <VisualOptionCard 
                title="Cable Management"
                imageSrc={getImgUrl("est-off-cable-mgmt")}
                isSelected={livingRoomConfig.designAccents.includes('cable-management')}
                onClick={() => handleDesignToggle('cable-management')}
              />
              <VisualOptionCard 
                title="Handleless / Push-to-open"
                imageSrc={getImgUrl("est-hw-handleless-push")}
                isSelected={livingRoomConfig.designAccents.includes('handleless')}
                onClick={() => handleDesignToggle('handleless')}
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
      <ProgressIndicator currentStep={internalStep} totalSteps={LIVING_STEPS.length} stepLabels={LIVING_STEPS} />
      
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
          {internalStep === LIVING_STEPS.length ? 'Continue' : 'Next Step'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default LivingRoomFlow;
