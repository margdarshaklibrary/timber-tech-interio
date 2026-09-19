import React, { useState } from 'react';
import { useEstimator } from '../../../../context/EstimatorContext';
import ProgressIndicator from '../../ProgressIndicator';
import VisualOptionCard from '../../VisualOptionCard';
import LargeVisualCard from '../../LargeVisualCard';
import DimensionInput from '../../DimensionInput';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import layoutStraight from '../../../../assets/estimator/kitchen_layout_straight_1789801901417.png';
import layoutLShape from '../../../../assets/estimator/kitchen_layout_l_shaped_1789801885853.png';
import layoutParallel from '../../../../assets/estimator/kitchen_layout_parallel_1789801938864.png';
import layoutUShape from '../../../../assets/estimator/kitchen_layout_u_shaped_1789801919303.png';
import layoutIsland from '../../../../assets/estimator/kitchen_layout_island_1789801958500.png';

import baseUpperImg from '../../../../assets/estimator/kitchen_config_base_upper_1789801970827.png';
import tallUnitImg from '../../../../assets/estimator/kitchen_config_tall_unit_1789801995490.png';
import matteImg from '../../../../assets/estimator/finish_matte_laminate_1789802016310.png';
import acrylicImg from '../../../../assets/estimator/finish_glossy_acrylic_1789802033831.png';

// Fallback images from existing project
import showroomImg from '../../../../assets/projects/showroom-1.webp';
import livingImg from '../../../../assets/projects/living-room-1.webp';
import lobbyImg from '../../../../assets/projects/lobby-1.webp';

const KITCHEN_STEPS = [
  'Layout',
  'Cabinets',
  'Dimensions',
  'Material & Finish',
  'Package & Extras'
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
      if (kitchenConfig.layout === 'l-shaped' || kitchenConfig.layout === 'parallel') return !d.runA || !d.runB;
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
                imageSrc={layoutStraight}
                isLayout={true}
                isSelected={kitchenConfig.layout === 'straight'}
                onClick={() => updateKitchenConfig('layout', 'straight')}
              />
              <LargeVisualCard 
                title="L-Shaped Kitchen" 
                description="Two connected cabinet runs"
                imageSrc={layoutLShape}
                isLayout={true}
                isSelected={kitchenConfig.layout === 'l-shaped'}
                onClick={() => updateKitchenConfig('layout', 'l-shaped')}
              />
              <LargeVisualCard 
                title="Parallel Kitchen" 
                description="Two facing cabinet runs"
                imageSrc={layoutParallel}
                isLayout={true}
                isSelected={kitchenConfig.layout === 'parallel'}
                onClick={() => updateKitchenConfig('layout', 'parallel')}
              />
              <LargeVisualCard 
                title="U-Shaped Kitchen" 
                description="Three connected cabinet runs"
                imageSrc={layoutUShape}
                isLayout={true}
                isSelected={kitchenConfig.layout === 'u-shaped'}
                onClick={() => updateKitchenConfig('layout', 'u-shaped')}
              />
              <LargeVisualCard 
                title="Island Kitchen" 
                description="Main run with detached island"
                imageSrc={layoutIsland}
                isLayout={true}
                isSelected={kitchenConfig.layout === 'island'}
                onClick={() => updateKitchenConfig('layout', 'island')}
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
                imageSrc={baseUpperImg}
                isSelected={kitchenConfig.cabinetConfig.includes('base')}
                onClick={() => handleCabinetToggle('base')}
              />
              <VisualOptionCard 
                title="Upper Cabinets" 
                description="Wall mounted storage cabinets"
                imageSrc={baseUpperImg}
                isSelected={kitchenConfig.cabinetConfig.includes('upper')}
                onClick={() => handleCabinetToggle('upper')}
              />
              <VisualOptionCard 
                title="Tall Units" 
                description="Full height pantry or microwave units"
                imageSrc={tallUnitImg}
                isSelected={kitchenConfig.cabinetConfig.includes('tall')}
                onClick={() => handleCabinetToggle('tall')}
              />
              <VisualOptionCard 
                title="Complete Kitchen" 
                description="Base + Upper + Tall + Lofts"
                imageSrc={showroomImg}
                isSelected={kitchenConfig.cabinetConfig.includes('complete')}
                onClick={() => handleCabinetToggle('complete')}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Tell Us About Your Kitchen Size</h2>
              <p className="step-subtitle">Provide approximate wall lengths for your {kitchenConfig.layout} layout.</p>
            </div>
            <div className="dimensions-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
              {kitchenConfig.layout === 'straight' && (
                <DimensionInput label="Kitchen Length" value={kitchenConfig.dimensions.length} onChange={(v) => handleDimensionChange('length', v)} />
              )}
              {(kitchenConfig.layout === 'l-shaped' || kitchenConfig.layout === 'parallel') && (
                <>
                  <DimensionInput label="Run A Length" value={kitchenConfig.dimensions.runA} onChange={(v) => handleDimensionChange('runA', v)} />
                  <DimensionInput label="Run B Length" value={kitchenConfig.dimensions.runB} onChange={(v) => handleDimensionChange('runB', v)} />
                </>
              )}
              {kitchenConfig.layout === 'u-shaped' && (
                <>
                  <DimensionInput label="Run A Length" value={kitchenConfig.dimensions.runA} onChange={(v) => handleDimensionChange('runA', v)} />
                  <DimensionInput label="Run B Length" value={kitchenConfig.dimensions.runB} onChange={(v) => handleDimensionChange('runB', v)} />
                  <DimensionInput label="Run C Length" value={kitchenConfig.dimensions.runC} onChange={(v) => handleDimensionChange('runC', v)} />
                </>
              )}
              {kitchenConfig.layout === 'island' && (
                <>
                  <DimensionInput label="Main Run Length" value={kitchenConfig.dimensions.mainRun} onChange={(v) => handleDimensionChange('mainRun', v)} />
                  <DimensionInput label="Island Length" value={kitchenConfig.dimensions.islandLength} onChange={(v) => handleDimensionChange('islandLength', v)} />
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
            <div className="options-grid">
              <VisualOptionCard 
                title="BWP Plywood" description="Waterproof, premium core"
                imageSrc={matteImg}
                isSelected={kitchenConfig.coreMaterial === 'plywood'}
                onClick={() => updateKitchenConfig('coreMaterial', 'plywood')}
              />
              <VisualOptionCard 
                title="HDHMR" description="Moisture resistant, durable"
                imageSrc={matteImg}
                isSelected={kitchenConfig.coreMaterial === 'hdhmr'}
                onClick={() => updateKitchenConfig('coreMaterial', 'hdhmr')}
              />
            </div>

            <h4 style={{ margin: '32px 0 16px', color: 'var(--dark-espresso)' }}>Shutter Finish</h4>
            <div className="options-grid">
              <VisualOptionCard 
                title="Matte Laminate" description="Durable, budget-friendly"
                imageSrc={matteImg}
                isSelected={kitchenConfig.shutterFinish === 'laminate'}
                onClick={() => updateKitchenConfig('shutterFinish', 'laminate')}
              />
              <VisualOptionCard 
                title="Acrylic" description="Smooth, reflective gloss"
                imageSrc={acrylicImg}
                isSelected={kitchenConfig.shutterFinish === 'acrylic'}
                onClick={() => updateKitchenConfig('shutterFinish', 'acrylic')}
              />
              <VisualOptionCard 
                title="PU Finish" description="Rich, seamless paint"
                imageSrc={lobbyImg}
                isSelected={kitchenConfig.shutterFinish === 'pu'}
                onClick={() => updateKitchenConfig('shutterFinish', 'pu')}
              />
              <VisualOptionCard 
                title="Veneer" description="Natural wood character"
                imageSrc={livingImg}
                isSelected={kitchenConfig.shutterFinish === 'veneer'}
                onClick={() => updateKitchenConfig('shutterFinish', 'veneer')}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Design Level & Quality</h2>
            </div>
            <div className="options-grid">
              <VisualOptionCard 
                title="Essential" description="Smart & Practical" isPackageCard={true}
                imageSrc={matteImg}
                isSelected={kitchenConfig.package === 'essential'}
                onClick={() => updateKitchenConfig('package', 'essential')}
              />
              <VisualOptionCard 
                title="Premium" description="Elegant & Enhanced" isPackageCard={true}
                imageSrc={acrylicImg}
                isSelected={kitchenConfig.package === 'premium'}
                onClick={() => updateKitchenConfig('package', 'premium')}
              />
              <VisualOptionCard 
                title="Smart Luxury" description="Luxury Look, Controlled Budget" isPackageCard={true}
                badge="Smart Luxury"
                imageSrc={showroomImg}
                isSelected={kitchenConfig.package === 'smart_luxury'}
                onClick={() => updateKitchenConfig('package', 'smart_luxury')}
              />
              <VisualOptionCard 
                title="Luxury" description="Statement & Bespoke" isPackageCard={true}
                imageSrc={lobbyImg}
                isSelected={kitchenConfig.package === 'luxury'}
                onClick={() => updateKitchenConfig('package', 'luxury')}
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
