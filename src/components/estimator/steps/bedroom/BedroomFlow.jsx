import React, { useState } from 'react';
import { useEstimator } from '../../../../context/EstimatorContext';
import ProgressIndicator from '../../ProgressIndicator';
import VisualOptionCard from '../../VisualOptionCard';
import LargeVisualCard from '../../LargeVisualCard';
import DimensionInput from '../../DimensionInput';
import { ArrowLeft, ArrowRight } from 'lucide-react';






// New Bed & Headboard Images







// New Wardrobe Images



// ... other imports ...
import MaterialCard from '../../MaterialCard';











import { getImgUrl } from '../../../../utils/cloudinary';


const BEDROOM_STEPS = [
  'Scope',
  'Bed & Headboard',
  'Wardrobe & Dressing',
  'Dimensions',
  'Material & Finish'
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
    if (internalStep === 3 && (bedroomConfig.scope.includes('wardrobe') || bedroomConfig.scope === 'complete')) {
       return !bedroomConfig.wardrobeType;
    }
    if (internalStep === 4) {
      const d = bedroomConfig.dimensions;
      if (!d.bedWidth || !d.bedLength) return true;
      if (bedroomConfig.scope.includes('wardrobe') || bedroomConfig.scope === 'complete') {
         if (!d.wardrobeWidth || !d.wardrobeHeight || !d.wardrobeDepth) return true;
      }
      return false;
    }
    if (internalStep === 5) return !bedroomConfig.coreMaterial || !bedroomConfig.shutterFinish;
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
                imageSrc={getImgUrl("est-bed-only")}
                isSelected={bedroomConfig.scope === 'bed'}
                onClick={() => updateBedroomConfig('scope', 'bed')}
              />
              <LargeVisualCard 
                title="Bed + Side Tables" 
                imageSrc={getImgUrl("est-bed-with-side-table")}
                isSelected={bedroomConfig.scope === 'bed+tables'}
                onClick={() => updateBedroomConfig('scope', 'bed+tables')}
              />
              <LargeVisualCard 
                title="Bed + Wardrobe" 
                imageSrc={getImgUrl("est-bed-with-wardrobe")}
                isSelected={bedroomConfig.scope === 'bed+wardrobe'}
                onClick={() => updateBedroomConfig('scope', 'bed+wardrobe')}
              />
              <LargeVisualCard 
                title="Complete Bedroom" 
                imageSrc={getImgUrl("est-bed-complete-room")}
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
                imageSrc={getImgUrl("est-bed-queen-size")}
                isSelected={bedroomConfig.bedType === 'queen'}
                onClick={() => updateBedroomConfig('bedType', 'queen')}
              />
              <VisualOptionCard 
                title="King Size" description="Large 6x6.5 ft"
                imageSrc={getImgUrl("est-bed-king-size")}
                isSelected={bedroomConfig.bedType === 'king'}
                onClick={() => updateBedroomConfig('bedType', 'king')}
              />
              <VisualOptionCard 
                title="Storage Bed" description="Hydraulic or Drawer storage"
                imageSrc={getImgUrl("est-bed-storage")}
                isSelected={bedroomConfig.bedType === 'storage'}
                onClick={() => updateBedroomConfig('bedType', 'storage')}
              />
            </div>

            <h4 style={{ marginBottom: '16px', color: 'var(--dark-espresso)' }}>Headboard Design</h4>
            <div className="options-grid">
              <VisualOptionCard 
                title="Simple Wooden"
                imageSrc={getImgUrl("est-bed-simple-wooden")}
                isSelected={bedroomConfig.headboard === 'wooden'}
                onClick={() => updateBedroomConfig('headboard', 'wooden')}
              />
              <VisualOptionCard 
                title="Upholstered (Fabric/Leather)"
                imageSrc={getImgUrl("est-bed-upholstered")}
                isSelected={bedroomConfig.headboard === 'upholstered'}
                onClick={() => updateBedroomConfig('headboard', 'upholstered')}
              />
              <VisualOptionCard 
                title="Full Wall Paneling"
                imageSrc={getImgUrl("est-wall-full-paneling")}
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
            <div className="options-grid">
              <VisualOptionCard 
                title="Hinged Wardrobe"
                imageSrc={getImgUrl("est-wd-hinged")}
                isSelected={bedroomConfig.wardrobeType === 'hinged'}
                onClick={() => updateBedroomConfig('wardrobeType', 'hinged')}
              />
              <VisualOptionCard 
                title="Sliding Wardrobe"
                imageSrc={getImgUrl("est-wd-sliding")}
                isSelected={bedroomConfig.wardrobeType === 'sliding'}
                onClick={() => updateBedroomConfig('wardrobeType', 'sliding')}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Dimensions</h2>
              <p className="step-subtitle">Provide approximate dimensions for your selected furniture.</p>
            </div>
            <div className="dimensions-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <DimensionInput label="Bed Width" value={bedroomConfig.dimensions.bedWidth} onChange={(v) => updateBedroomConfig('dimensions', { ...bedroomConfig.dimensions, bedWidth: v })} />
              <DimensionInput label="Bed Length" value={bedroomConfig.dimensions.bedLength} onChange={(v) => updateBedroomConfig('dimensions', { ...bedroomConfig.dimensions, bedLength: v })} />
              
              {(bedroomConfig.scope.includes('wardrobe') || bedroomConfig.scope === 'complete') && (
                <>
                  <DimensionInput label="Wardrobe Width" value={bedroomConfig.dimensions.wardrobeWidth} onChange={(v) => updateBedroomConfig('dimensions', { ...bedroomConfig.dimensions, wardrobeWidth: v })} />
                  <DimensionInput label="Wardrobe Height" value={bedroomConfig.dimensions.wardrobeHeight} onChange={(v) => updateBedroomConfig('dimensions', { ...bedroomConfig.dimensions, wardrobeHeight: v })} />
                  <DimensionInput label="Wardrobe Depth" value={bedroomConfig.dimensions.wardrobeDepth} onChange={(v) => updateBedroomConfig('dimensions', { ...bedroomConfig.dimensions, wardrobeDepth: v })} />
                </>
              )}
            </div>
          </div>
        );
      case 5:
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
                isSelected={bedroomConfig.coreMaterial === 'plywood'}
                onClick={() => updateBedroomConfig('coreMaterial', 'plywood')}
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
                isSelected={bedroomConfig.coreMaterial === 'hdhmr'}
                onClick={() => updateBedroomConfig('coreMaterial', 'hdhmr')}
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
                isSelected={bedroomConfig.shutterFinish === 'laminate'}
                onClick={() => updateBedroomConfig('shutterFinish', 'laminate')}
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
                isSelected={bedroomConfig.shutterFinish === 'veneer'}
                onClick={() => updateBedroomConfig('shutterFinish', 'veneer')}
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
                isSelected={bedroomConfig.shutterFinish === 'pu'}
                onClick={() => updateBedroomConfig('shutterFinish', 'pu')}
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
