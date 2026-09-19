import React, { useState } from 'react';
import { useEstimator } from '../../../../context/EstimatorContext';
import ProgressIndicator from '../../ProgressIndicator';
import VisualOptionCard from '../../VisualOptionCard';
import LargeVisualCard from '../../LargeVisualCard';
import DimensionInput from '../../DimensionInput';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import livingImg1 from '../../../../assets/projects/living-room-1.webp';
import lobbyImg1 from '../../../../assets/projects/lobby-1.webp';
import matteImg from '../../../../assets/estimator/finish_matte_laminate_1789802016310.png';

const LIVING_STEPS = [
  'Scope',
  'Layout & TV Unit',
  'Dimensions',
  'Material & Finish',
  'Package'
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
    if (internalStep === 2 && livingRoomConfig.scope.includes('tv')) return !livingRoomConfig.tvLayout;
    if (internalStep === 3) return !livingRoomConfig.dimensions.wallWidth;
    return false;
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
            <div className="layout-grid">
              <LargeVisualCard 
                title="TV Unit (Base only)" 
                imageSrc={livingImg1}
                isSelected={livingRoomConfig.scope === 'tv-base'}
                onClick={() => updateLivingRoomConfig('scope', 'tv-base')}
              />
              <LargeVisualCard 
                title="Full Wall TV Unit" 
                imageSrc={lobbyImg1}
                isSelected={livingRoomConfig.scope === 'tv-full'}
                onClick={() => updateLivingRoomConfig('scope', 'tv-full')}
              />
              <LargeVisualCard 
                title="Display / Storage Unit" 
                imageSrc={livingImg1}
                isSelected={livingRoomConfig.scope === 'storage'}
                onClick={() => updateLivingRoomConfig('scope', 'storage')}
              />
              <LargeVisualCard 
                title="Wall Paneling" 
                imageSrc={lobbyImg1}
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
              <h2 className="step-title">TV Unit Layout</h2>
            </div>
            <div className="options-grid">
              <VisualOptionCard 
                title="Minimal / Floating"
                imageSrc={livingImg1}
                isSelected={livingRoomConfig.tvLayout === 'minimal'}
                onClick={() => updateLivingRoomConfig('tvLayout', 'minimal')}
              />
              <VisualOptionCard 
                title="TV + Display Shelves"
                imageSrc={lobbyImg1}
                isSelected={livingRoomConfig.tvLayout === 'display'}
                onClick={() => updateLivingRoomConfig('tvLayout', 'display')}
              />
              <VisualOptionCard 
                title="TV + Fluted Panel"
                imageSrc={livingImg1}
                isSelected={livingRoomConfig.tvLayout === 'fluted'}
                onClick={() => updateLivingRoomConfig('tvLayout', 'fluted')}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Wall Dimensions</h2>
            </div>
            <div className="dimensions-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <DimensionInput label="Approx Wall Width" value={livingRoomConfig.dimensions.wallWidth} onChange={(v) => updateLivingRoomConfig('dimensions', { ...livingRoomConfig.dimensions, wallWidth: v })} />
              <DimensionInput label="Approx Wall Height" value={livingRoomConfig.dimensions.wallHeight} onChange={(v) => updateLivingRoomConfig('dimensions', { ...livingRoomConfig.dimensions, wallHeight: v })} />
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
                isSelected={livingRoomConfig.coreMaterial === 'plywood'}
                onClick={() => updateLivingRoomConfig('coreMaterial', 'plywood')}
              />
              <VisualOptionCard 
                title="HDHMR"
                imageSrc={matteImg}
                isSelected={livingRoomConfig.coreMaterial === 'hdhmr'}
                onClick={() => updateLivingRoomConfig('coreMaterial', 'hdhmr')}
              />
            </div>

            <h4 style={{ margin: '32px 0 16px', color: 'var(--dark-espresso)' }}>Finish</h4>
            <div className="options-grid">
              <VisualOptionCard 
                title="Laminate"
                imageSrc={matteImg}
                isSelected={livingRoomConfig.shutterFinish === 'laminate'}
                onClick={() => updateLivingRoomConfig('shutterFinish', 'laminate')}
              />
              <VisualOptionCard 
                title="Veneer"
                imageSrc={livingImg1}
                isSelected={livingRoomConfig.shutterFinish === 'veneer'}
                onClick={() => updateLivingRoomConfig('shutterFinish', 'veneer')}
              />
              <VisualOptionCard 
                title="PU Finish"
                imageSrc={lobbyImg1}
                isSelected={livingRoomConfig.shutterFinish === 'pu'}
                onClick={() => updateLivingRoomConfig('shutterFinish', 'pu')}
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
            
            <h4 style={{ marginBottom: '16px', color: 'var(--dark-espresso)' }}>Add Accents</h4>
            <div className="options-grid" style={{ marginBottom: '40px' }}>
              <VisualOptionCard 
                title="Fluted Panel"
                imageSrc={livingImg1}
                isSelected={livingRoomConfig.designAccents.includes('fluted')}
                onClick={() => handleDesignToggle('fluted')}
              />
              <VisualOptionCard 
                title="Backlighting"
                imageSrc={lobbyImg1}
                isSelected={livingRoomConfig.designAccents.includes('lighting')}
                onClick={() => handleDesignToggle('lighting')}
              />
            </div>

            <h4 style={{ marginBottom: '16px', color: 'var(--dark-espresso)' }}>Package</h4>
            <div className="options-grid">
              <VisualOptionCard 
                title="Essential" isPackageCard={true}
                imageSrc={matteImg}
                isSelected={livingRoomConfig.package === 'essential'}
                onClick={() => updateLivingRoomConfig('package', 'essential')}
              />
              <VisualOptionCard 
                title="Premium" isPackageCard={true}
                imageSrc={livingImg1}
                isSelected={livingRoomConfig.package === 'premium'}
                onClick={() => updateLivingRoomConfig('package', 'premium')}
              />
              <VisualOptionCard 
                title="Luxury" isPackageCard={true}
                imageSrc={lobbyImg1}
                isSelected={livingRoomConfig.package === 'luxury'}
                onClick={() => updateLivingRoomConfig('package', 'luxury')}
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
