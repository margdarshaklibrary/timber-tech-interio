import React, { useState } from 'react';
import { useEstimator } from '../../../../context/EstimatorContext';
import ProgressIndicator from '../../ProgressIndicator';
import VisualOptionCard from '../../VisualOptionCard';
import LargeVisualCard from '../../LargeVisualCard';
import DimensionInput from '../../DimensionInput';
import { ArrowLeft, ArrowRight } from 'lucide-react';












import MaterialCard from '../../MaterialCard';










// Fallback images from existing project



import { getImgUrl } from '../../../../utils/cloudinary';


const KITCHEN_STEPS = [
  'Scope',
  'Layout',
  'Cabinets',
  'Dimensions',
  'Material & Finish'
];

const KitchenFlow = ({ onComplete, onBackToCategory }) => {
  const { kitchenConfig, updateKitchenConfig } = useEstimator();
  const [internalStep, setInternalStep] = useState(1);

  const nextInternal = () => {
    if (internalStep < KITCHEN_STEPS.length) {
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
    if (internalStep === 1) return !kitchenConfig.layout;
    if (internalStep === 2) return kitchenConfig.cabinetConfig.length === 0;
    if (internalStep === 3) {
      const d = kitchenConfig.dimensions;
      if (kitchenConfig.layout === 'straight') return !d.length;
      if (kitchenConfig.layout === 'l-shaped' || kitchenConfig.layout === 'parallel' || kitchenConfig.layout === 'peninsula') return !d.runA || !d.runB;
      if (kitchenConfig.layout === 'u-shaped') return !d.runA || !d.runB || !d.runC;
      if (kitchenConfig.layout === 'island') return !d.mainRun || !d.islandLength;
    }
    return false;
  };

  const handleCabinetToggle = (val) => {
    let current = [...kitchenConfig.cabinetConfig];
    if (val === 'complete') {
      current = ['base', 'upper', 'tall', 'complete'];
    } else {
      current = current.filter(c => c !== 'complete'); // remove complete if manually toggling
      if (current.includes(val)) {
        current = current.filter(c => c !== val);
      } else {
        current.push(val);
      }
    }
    updateKitchenConfig('cabinetConfig', current);
  };

  const handleDimensionChange = (key, val) => {
    updateKitchenConfig('dimensions', { ...kitchenConfig.dimensions, [key]: val });
  };

  const renderLayoutDiagram = (layout) => {
    const boxStyle = { backgroundColor: '#F0E4DE', border: '1px solid #E2C0BB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A4A4A', fontSize: '18px', fontWeight: '500' };
    
    switch(layout) {
      case 'u-shaped':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F8F3F0', padding: '32px', borderRadius: '12px', minWidth: '300px' }}>
            <div style={{ ...boxStyle, width: '160px', height: '40px', borderBottom: 'none' }}>B</div>
            <div style={{ display: 'flex', width: '160px', justifyContent: 'space-between' }}>
              <div style={{ ...boxStyle, width: '40px', height: '80px', borderTop: 'none' }}>A</div>
              <div style={{ ...boxStyle, width: '40px', height: '80px', borderTop: 'none' }}>C</div>
            </div>
          </div>
        );
      case 'l-shaped':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F8F3F0', padding: '32px', borderRadius: '12px', minWidth: '300px' }}>
            <div style={{ display: 'flex', width: '120px' }}>
              <div style={{ ...boxStyle, width: '40px', height: '120px', borderRight: 'none' }}>A</div>
              <div style={{ ...boxStyle, width: '80px', height: '40px' }}>B</div>
            </div>
          </div>
        );
      case 'straight':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F8F3F0', padding: '32px', borderRadius: '12px', minWidth: '300px' }}>
            <div style={{ ...boxStyle, width: '160px', height: '40px' }}>A</div>
          </div>
        );
      case 'parallel':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', backgroundColor: '#F8F3F0', padding: '32px', borderRadius: '12px', minWidth: '300px' }}>
            <div style={{ ...boxStyle, width: '160px', height: '40px' }}>A</div>
            <div style={{ ...boxStyle, width: '160px', height: '40px' }}>B</div>
          </div>
        );
      case 'island':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', backgroundColor: '#F8F3F0', padding: '32px', borderRadius: '12px', minWidth: '300px' }}>
            <div style={{ ...boxStyle, width: '160px', height: '40px' }}>A</div>
            <div style={{ ...boxStyle, width: '100px', height: '60px' }}>B</div>
          </div>
        );
      case 'peninsula':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F8F3F0', padding: '32px', borderRadius: '12px', minWidth: '300px' }}>
            <div style={{ display: 'flex', width: '160px', flexDirection: 'column' }}>
              <div style={{ ...boxStyle, width: '160px', height: '40px', borderBottom: 'none' }}>A</div>
              <div style={{ ...boxStyle, width: '60px', height: '80px', borderTop: 'none', alignSelf: 'flex-end' }}>B</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderStepContent = () => {
    switch (internalStep) {
      case 1:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Choose Your Kitchen Layout</h2>
              <p className="step-subtitle">Select the layout closest to your space.</p>
            </div>
            <div className="layout-grid">
              <LargeVisualCard 
                title="Straight Kitchen"
                description="Single wall cabinet arrangement"
                imageSrc={getImgUrl("est-kit-single-wall")}
                isLayout={true}
                isSelected={kitchenConfig.layout === 'straight'}
                onClick={() => updateKitchenConfig('layout', 'straight')}
              />
              <LargeVisualCard 
                title="L-Shaped Kitchen" 
                description="Two connected cabinet runs"
                imageSrc={getImgUrl("est-kit-l-shaped")}
                isLayout={true}
                isSelected={kitchenConfig.layout === 'l-shaped'}
                onClick={() => updateKitchenConfig('layout', 'l-shaped')}
              />
              <LargeVisualCard 
                title="Parallel Kitchen" 
                description="Two facing cabinet runs"
                imageSrc={getImgUrl("est-kit-galley")}
                isLayout={true}
                isSelected={kitchenConfig.layout === 'parallel'}
                onClick={() => updateKitchenConfig('layout', 'parallel')}
              />
              <LargeVisualCard 
                title="U-Shaped Kitchen" 
                description="Three connected cabinet runs"
                imageSrc={getImgUrl("est-kit-u-shaped")}
                isLayout={true}
                isSelected={kitchenConfig.layout === 'u-shaped'}
                onClick={() => updateKitchenConfig('layout', 'u-shaped')}
              />
              <LargeVisualCard 
                title="Island Kitchen" 
                description="Main run with detached island"
                imageSrc={getImgUrl("est-kit-island")}
                isLayout={true}
                isSelected={kitchenConfig.layout === 'island'}
                onClick={() => updateKitchenConfig('layout', 'island')}
              />
              <LargeVisualCard 
                title="Peninsula Kitchen" 
                description="Connected island-like extension"
                imageSrc={getImgUrl("est-kit-peninsula")}
                isLayout={true}
                isSelected={kitchenConfig.layout === 'peninsula'}
                onClick={() => updateKitchenConfig('layout', 'peninsula')}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">What type of storage do you need?</h2>
              <p className="step-subtitle">Select the cabinet sections you want to build.</p>
            </div>
            <div className="options-grid">
              <VisualOptionCard 
                title="Base Cabinets" 
                description="Lower cabinets below the countertop"
                imageSrc={getImgUrl("est-kit-base-cabinet")}
                isSelected={kitchenConfig.cabinetConfig.includes('base')}
                onClick={() => handleCabinetToggle('base')}
              />
              <VisualOptionCard 
                title="Upper Cabinets" 
                description="Wall mounted storage cabinets"
                imageSrc={getImgUrl("est-kit-upper-cabinet")}
                isSelected={kitchenConfig.cabinetConfig.includes('upper')}
                onClick={() => handleCabinetToggle('upper')}
              />
              <VisualOptionCard 
                title="Tall Units" 
                description="Full height pantry or microwave units"
                imageSrc={getImgUrl("est-kit-tall-cabinet")}
                isSelected={kitchenConfig.cabinetConfig.includes('tall')}
                onClick={() => handleCabinetToggle('tall')}
              />
              <VisualOptionCard 
                title="Complete Kitchen" 
                description="Base + Upper + Tall + Lofts"
                imageSrc={getImgUrl("est-kit-complete")}
                isSelected={kitchenConfig.cabinetConfig.includes('complete')}
                onClick={() => handleCabinetToggle('complete')}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <div className="step-header" style={{ textAlign: 'center' }}>
              <h2 className="step-title" style={{ fontSize: '28px', fontWeight: 'bold' }}>Now review the measurements for accuracy</h2>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              {renderLayoutDiagram(kitchenConfig.layout)}
            </div>

            <div style={{ backgroundColor: '#F9ECC4', padding: '12px', borderRadius: '8px', textAlign: 'center', color: '#6A5426', fontSize: '14px', fontWeight: '500', maxWidth: '400px', margin: '0 auto 32px' }}>
              Standard size has been set for your convenience
            </div>

            <div className="dimensions-container" style={{ maxWidth: '400px', margin: '0 auto', background: 'transparent', padding: '0', border: 'none' }}>
              {kitchenConfig.layout === 'straight' && (
                <DimensionInput label="A" value={kitchenConfig.dimensions.length} onChange={(v) => handleDimensionChange('length', v)} horizontal={true} />
              )}
              {(kitchenConfig.layout === 'l-shaped' || kitchenConfig.layout === 'parallel' || kitchenConfig.layout === 'peninsula') && (
                <>
                  <DimensionInput label="A" value={kitchenConfig.dimensions.runA} onChange={(v) => handleDimensionChange('runA', v)} horizontal={true} />
                  <DimensionInput label="B" value={kitchenConfig.dimensions.runB} onChange={(v) => handleDimensionChange('runB', v)} horizontal={true} />
                </>
              )}
              {kitchenConfig.layout === 'u-shaped' && (
                <>
                  <DimensionInput label="A" value={kitchenConfig.dimensions.runA} onChange={(v) => handleDimensionChange('runA', v)} horizontal={true} />
                  <DimensionInput label="B" value={kitchenConfig.dimensions.runB} onChange={(v) => handleDimensionChange('runB', v)} horizontal={true} />
                  <DimensionInput label="C" value={kitchenConfig.dimensions.runC} onChange={(v) => handleDimensionChange('runC', v)} horizontal={true} />
                </>
              )}
              {kitchenConfig.layout === 'island' && (
                <>
                  <DimensionInput label="A" value={kitchenConfig.dimensions.mainRun} onChange={(v) => handleDimensionChange('mainRun', v)} horizontal={true} />
                  <DimensionInput label="B" value={kitchenConfig.dimensions.islandLength} onChange={(v) => handleDimensionChange('islandLength', v)} horizontal={true} />
                </>
              )}
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
                isSelected={kitchenConfig.coreMaterial === 'plywood'}
                onClick={() => updateKitchenConfig('coreMaterial', 'plywood')}
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
                isSelected={kitchenConfig.coreMaterial === 'hdhmr'}
                onClick={() => updateKitchenConfig('coreMaterial', 'hdhmr')}
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
                isSelected={kitchenConfig.shutterFinish === 'laminate'}
                onClick={() => updateKitchenConfig('shutterFinish', 'laminate')}
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
                isSelected={kitchenConfig.shutterFinish === 'veneer'}
                onClick={() => updateKitchenConfig('shutterFinish', 'veneer')}
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
                isSelected={kitchenConfig.shutterFinish === 'pu'}
                onClick={() => updateKitchenConfig('shutterFinish', 'pu')}
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
      <ProgressIndicator currentStep={internalStep} totalSteps={KITCHEN_STEPS.length} stepLabels={KITCHEN_STEPS} />
      
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
          {internalStep === KITCHEN_STEPS.length ? 'Continue' : 'Next Step'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default KitchenFlow;
