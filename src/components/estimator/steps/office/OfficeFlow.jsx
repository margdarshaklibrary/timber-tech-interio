import React, { useState } from 'react';
import { useEstimator } from '../../../../context/EstimatorContext';
import ProgressIndicator from '../../ProgressIndicator';
import VisualOptionCard from '../../VisualOptionCard';
import LargeVisualCard from '../../LargeVisualCard';
import DimensionInput from '../../DimensionInput';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import officeImg1 from '../../../../assets/projects/office-1.webp';
import showroomImg1 from '../../../../assets/projects/showroom-1.webp';
import matteImg from '../../../../assets/estimator/finish_matte_laminate_1789802016310.png';

const OFFICE_STEPS = [
  'Scope',
  'Layout & Seats',
  'Area',
  'Material & Finish',
  'Package'
];

const OfficeFlow = ({ onComplete, onBackToCategory }) => {
  const { officeConfig, updateOfficeConfig } = useEstimator();
  const [internalStep, setInternalStep] = useState(1);

  const nextInternal = () => {
    if (internalStep < OFFICE_STEPS.length) {
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
    if (internalStep === 1) return !officeConfig.scope;
    if (internalStep === 2 && officeConfig.scope === 'workstation') return !officeConfig.seats;
    if (internalStep === 3) return !officeConfig.dimensions.areaSqft;
    return false;
  };

  const renderStepContent = () => {
    switch (internalStep) {
      case 1:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">What are you designing?</h2>
            </div>
            <div className="layout-grid">
              <LargeVisualCard 
                title="Workstations" 
                imageSrc={officeImg1}
                isSelected={officeConfig.scope === 'workstation'}
                onClick={() => updateOfficeConfig('scope', 'workstation')}
              />
              <LargeVisualCard 
                title="Manager / Director Cabin" 
                imageSrc={showroomImg1}
                isSelected={officeConfig.scope === 'cabin'}
                onClick={() => updateOfficeConfig('scope', 'cabin')}
              />
              <LargeVisualCard 
                title="Meeting / Conference Room" 
                imageSrc={officeImg1}
                isSelected={officeConfig.scope === 'meeting'}
                onClick={() => updateOfficeConfig('scope', 'meeting')}
              />
              <LargeVisualCard 
                title="Complete Office" 
                imageSrc={officeImg1}
                isSelected={officeConfig.scope === 'complete'}
                onClick={() => updateOfficeConfig('scope', 'complete')}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Layout & Requirements</h2>
            </div>
            {officeConfig.scope === 'workstation' ? (
              <>
                <h4 style={{ marginBottom: '16px', color: 'var(--dark-espresso)' }}>Number of Seats</h4>
                <div className="options-grid">
                  {[2, 4, 6, 8, '10+'].map(num => (
                    <VisualOptionCard 
                      key={num}
                      title={`${num} Seats`}
                      imageSrc={officeImg1}
                      isSelected={officeConfig.seats === num}
                      onClick={() => updateOfficeConfig('seats', num)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center" style={{ padding: '40px' }}>
                <p>Specific details for {officeConfig.scope} will be discussed during consultation.</p>
                <p>Click next to proceed.</p>
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Approximate Area</h2>
            </div>
            <div className="dimensions-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <DimensionInput 
                label="Approx Area (Sqft)" 
                value={officeConfig.dimensions.areaSqft} 
                onChange={(v) => updateOfficeConfig('dimensions', { ...officeConfig.dimensions, areaSqft: v })} 
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Select Material & Finish</h2>
            </div>
            <div className="options-grid">
              <VisualOptionCard 
                title="HDHMR + Laminate"
                description="Durable standard for offices"
                imageSrc={matteImg}
                isSelected={officeConfig.coreMaterial === 'hdhmr' && officeConfig.shutterFinish === 'laminate'}
                onClick={() => {
                  updateOfficeConfig('coreMaterial', 'hdhmr');
                  updateOfficeConfig('shutterFinish', 'laminate');
                }}
              />
              <VisualOptionCard 
                title="Plywood + Veneer"
                description="Premium for cabins"
                imageSrc={officeImg1}
                isSelected={officeConfig.coreMaterial === 'plywood' && officeConfig.shutterFinish === 'veneer'}
                onClick={() => {
                  updateOfficeConfig('coreMaterial', 'plywood');
                  updateOfficeConfig('shutterFinish', 'veneer');
                }}
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
                isSelected={officeConfig.package === 'essential'}
                onClick={() => updateOfficeConfig('package', 'essential')}
              />
              <VisualOptionCard 
                title="Premium" description="Elegant & Enhanced" isPackageCard={true}
                imageSrc={officeImg1}
                isSelected={officeConfig.package === 'premium'}
                onClick={() => updateOfficeConfig('package', 'premium')}
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
      <ProgressIndicator currentStep={internalStep} totalSteps={OFFICE_STEPS.length} stepLabels={OFFICE_STEPS} />
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
          {internalStep === OFFICE_STEPS.length ? 'Continue' : 'Next Step'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default OfficeFlow;
