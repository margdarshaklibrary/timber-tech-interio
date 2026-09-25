import React, { useState } from 'react';
import { useEstimator } from '../../../../context/EstimatorContext';
import ProgressIndicator from '../../ProgressIndicator';
import VisualOptionCard from '../../VisualOptionCard';
import LargeVisualCard from '../../LargeVisualCard';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

// Rooms








// Property






// Packages





// Additions





import { getImgUrl } from '../../../../utils/cloudinary';


const FULL_HOME_STEPS = [
  'Rooms',
  'Property',
  'Scope',
  'Package',
  'Additions'
];

const ROOM_OPTIONS = [
  { id: 'living', label: 'Living Room' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'master_bed', label: 'Master Bedroom' },
  { id: 'bedroom_2', label: 'Bedroom 2' },
  { id: 'bedroom_3', label: 'Bedroom 3' },
  { id: 'dining', label: 'Dining Area' },
  { id: 'study', label: 'Study / Office' },
];

const FullHomeFlow = ({ onComplete, onBackToCategory }) => {
  const { fullHomeConfig, updateFullHomeConfig } = useEstimator();
  const [internalStep, setInternalStep] = useState(1);

  const nextInternal = () => {
    if (internalStep < FULL_HOME_STEPS.length) {
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
    if (internalStep === 1) return fullHomeConfig.rooms.length === 0;
    if (internalStep === 2) return !fullHomeConfig.propertyType;
    return false;
  };

  const handleRoomToggle = (roomId) => {
    let current = [...fullHomeConfig.rooms];
    if (current.includes(roomId)) {
      current = current.filter(r => r !== roomId);
    } else {
      current.push(roomId);
    }
    updateFullHomeConfig('rooms', current);
  };

  const handleAdditionToggle = (additionId) => {
    let current = [...fullHomeConfig.additions];
    if (current.includes(additionId)) {
      current = current.filter(a => a !== additionId);
    } else {
      current.push(additionId);
    }
    updateFullHomeConfig('additions', current);
  };

  const handleRoomScopeChange = (roomId, scope) => {
    updateFullHomeConfig('roomScope', {
      ...fullHomeConfig.roomScope,
      [roomId]: scope
    });
  };

  const renderStepContent = () => {
    switch (internalStep) {
      case 1:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">What spaces would you like to include?</h2>
              <p className="step-subtitle">Select all the rooms you want to furnish.</p>
            </div>
            <div className="options-grid">
              {ROOM_OPTIONS.map(room => (
                <VisualOptionCard 
                  key={room.id}
                  title={room.label}
                  imageSrc={
                    room.id === 'living' ? livingRoomImg :
                    room.id === 'kitchen' ? kitchenImg :
                    room.id === 'master_bed' ? masterBedroomImg :
                    room.id === 'bedroom_2' ? bedroom2Img :
                    room.id === 'bedroom_3' ? bedroom3Img :
                    room.id === 'dining' ? diningImg :
                    studyImg
                  }
                  isSelected={fullHomeConfig.rooms.includes(room.id)}
                  onClick={() => handleRoomToggle(room.id)}
                />
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Property Type</h2>
            </div>
            <div className="options-grid">
              {['1 BHK', '2 BHK', '3 BHK', '4 BHK+', 'Villa'].map(type => (
                <VisualOptionCard 
                  key={type}
                  title={type}
                  imageSrc={
                    type === '1 BHK' ? oneBhkImg :
                    type === '2 BHK' ? twoBhkImg :
                    type === '3 BHK' ? threeBhkImg :
                    type === '4 BHK+' ? fourBhkImg :
                    villaImg
                  }
                  isSelected={fullHomeConfig.propertyType === type.toLowerCase().replace(' ', '')}
                  onClick={() => updateFullHomeConfig('propertyType', type.toLowerCase().replace(' ', ''))}
                />
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Scope per Room</h2>
              <p className="step-subtitle">Adjust the extent of work for each selected room.</p>
            </div>
            <div className="room-scopes-container">
              {fullHomeConfig.rooms.map(roomId => {
                const room = ROOM_OPTIONS.find(r => r.id === roomId);
                const scope = fullHomeConfig.roomScope[roomId] || 'standard';
                return (
                  <div key={roomId} style={{ marginBottom: '24px', padding: '16px', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                    <h4 style={{ marginBottom: '12px', color: 'var(--dark-espresso)' }}>{room.label}</h4>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      {['basic', 'standard', 'complete'].map(level => (
                        <button 
                          key={level}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '4px',
                            border: `1px solid ${scope === level ? 'var(--dark-espresso)' : 'var(--border-light)'}`,
                            backgroundColor: scope === level ? 'var(--dark-espresso)' : 'white',
                            color: scope === level ? 'white' : 'var(--dark-espresso)',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleRoomScopeChange(roomId, level)}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Overall Design Package</h2>
            </div>
            <div className="options-grid">
              <VisualOptionCard 
                title="Essential" description="Smart & Practical" isPackageCard={true}
                imageSrc={getImgUrl("est-pkg-essential")}
                isSelected={fullHomeConfig.package === 'essential'}
                onClick={() => updateFullHomeConfig('package', 'essential')}
              />
              <VisualOptionCard 
                title="Premium" description="Elegant & Enhanced" isPackageCard={true}
                imageSrc={getImgUrl("est-pkg-premium")}
                isSelected={fullHomeConfig.package === 'premium'}
                onClick={() => updateFullHomeConfig('package', 'premium')}
              />
              <VisualOptionCard 
                title="Smart Luxury" description="Luxury Look, Controlled Budget" isPackageCard={true}
                badge="Recommended"
                imageSrc={getImgUrl("est-pkg-smart-luxury")}
                isSelected={fullHomeConfig.package === 'smart_luxury'}
                onClick={() => updateFullHomeConfig('package', 'smart_luxury')}
              />
              <VisualOptionCard 
                title="Luxury" description="Statement & Bespoke" isPackageCard={true}
                imageSrc={getImgUrl("est-pkg-luxury")}
                isSelected={fullHomeConfig.package === 'luxury'}
                onClick={() => updateFullHomeConfig('package', 'luxury')}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Optional Additions</h2>
              <p className="step-subtitle">What else would you like to include in the estimate?</p>
            </div>
            <div className="options-grid">
              {[
                { id: 'false_ceiling', label: 'False Ceiling' },
                { id: 'lighting', label: 'Decorative Lighting' },
                { id: 'painting', label: 'Wall Painting / Texture' },
                { id: 'curtains', label: 'Curtains & Blinds' },
                { id: 'loose_furniture', label: 'Sofas & Beds (Loose)' }
              ].map(add => (
                <VisualOptionCard 
                  key={add.id}
                  title={add.label}
                  imageSrc={
                    add.id === 'false_ceiling' ? falseCeilingImg :
                    add.id === 'lighting' ? lightingImg :
                    add.id === 'painting' ? paintingImg :
                    add.id === 'curtains' ? curtainsImg :
                    sofasImg
                  }
                  isSelected={fullHomeConfig.additions.includes(add.id)}
                  onClick={() => handleAdditionToggle(add.id)}
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <ProgressIndicator currentStep={internalStep} totalSteps={FULL_HOME_STEPS.length} stepLabels={FULL_HOME_STEPS} />
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
          {internalStep === FULL_HOME_STEPS.length ? 'Continue' : 'Next Step'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default FullHomeFlow;
