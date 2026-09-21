import React, { useState } from 'react';
import { useEstimator } from '../../../context/EstimatorContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const LeadCapture = () => {
  const { category, kitchenConfig, wardrobeConfig, bedroomConfig, livingRoomConfig, officeConfig, fullHomeConfig, leadData, setLeadData, calculateAndSetEstimate, nextStep, prevStep } = useEstimator();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!leadData.name.trim()) newErrors.name = "Name is required";
    
    // Basic 10 digit Indian mobile number validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!leadData.phone) {
      newErrors.phone = "Mobile number is required";
    } else if (!phoneRegex.test(leadData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // In a real app, send data to backend/CRM here
      console.log("Lead Submitted:", { leadData, category, kitchenConfig });
      calculateAndSetEstimate();
      nextStep();
    }
  };

  const formatDimensions = (d, layout) => {
    if (layout === 'straight') return `${d.length} ft length`;
    if (layout === 'l-shaped' || layout === 'parallel') return `${d.runA} ft × ${d.runB} ft`;
    if (layout === 'u-shaped') return `${d.runA} ft × ${d.runB} ft × ${d.runC} ft`;
    if (layout === 'island') return `Main: ${d.mainRun} ft, Island: ${d.islandLength} ft`;
    return 'Not provided';
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Your Estimate Is Ready</h2>
        <p className="step-subtitle">Review your configuration and enter your details to view the estimated project cost.</p>
      </div>

      <div className="summary-panel">
        <h3 className="summary-title">Your {category.replace('-', ' ')} Plan</h3>
        <div className="summary-list">
          {category === 'kitchen' && (
            <>
              <div className="summary-item"><span className="summary-label">Layout</span><span className="summary-value" style={{ textTransform: 'capitalize' }}>{kitchenConfig.layout}</span></div>
              <div className="summary-item"><span className="summary-label">Dimensions</span><span className="summary-value">{formatDimensions(kitchenConfig.dimensions, kitchenConfig.layout)}</span></div>
              <div className="summary-item"><span className="summary-label">Configuration</span><span className="summary-value" style={{ textTransform: 'capitalize' }}>{kitchenConfig.cabinetConfig.join(' + ')}</span></div>
            </>
          )}
          {category === 'wardrobe' && (
            <>
              <div className="summary-item"><span className="summary-label">Type</span><span className="summary-value" style={{ textTransform: 'capitalize' }}>{wardrobeConfig?.type}</span></div>
              <div className="summary-item"><span className="summary-label">Dimensions</span><span className="summary-value">{wardrobeConfig?.dimensions?.width} W × {wardrobeConfig?.dimensions?.height} H</span></div>
              <div className="summary-item"><span className="summary-label">Finish</span><span className="summary-value" style={{ textTransform: 'capitalize' }}>{wardrobeConfig?.shutterFinish}</span></div>
            </>
          )}
          {category === 'bedroom' && (
            <>
              <div className="summary-item"><span className="summary-label">Scope</span><span className="summary-value" style={{ textTransform: 'capitalize' }}>{bedroomConfig?.scope?.replace('+', ' + ')}</span></div>
              <div className="summary-item"><span className="summary-label">Bed</span><span className="summary-value" style={{ textTransform: 'capitalize' }}>{bedroomConfig?.bedType} / {bedroomConfig?.headboard}</span></div>
              {(bedroomConfig?.scope?.includes('wardrobe') || bedroomConfig?.scope === 'complete') && (
                <div className="summary-item"><span className="summary-label">Wardrobe</span><span className="summary-value" style={{ textTransform: 'capitalize' }}>{bedroomConfig?.wardrobeType}</span></div>
              )}
              <div className="summary-item"><span className="summary-label">Dimensions</span><span className="summary-value">Bed: {bedroomConfig?.dimensions?.bedWidth}×{bedroomConfig?.dimensions?.bedLength} {(bedroomConfig?.scope?.includes('wardrobe') || bedroomConfig?.scope === 'complete') ? `| Wardrobe: ${bedroomConfig.dimensions.wardrobeWidth}×${bedroomConfig.dimensions.wardrobeHeight}×${bedroomConfig.dimensions.wardrobeDepth}` : ''}</span></div>
              <div className="summary-item"><span className="summary-label">Finish</span><span className="summary-value" style={{ textTransform: 'capitalize' }}>{bedroomConfig?.shutterFinish}</span></div>
            </>
          )}
          {category === 'living' && (
            <>
              <div className="summary-item"><span className="summary-label">Scope</span><span className="summary-value" style={{ textTransform: 'capitalize' }}>{livingRoomConfig?.scope?.replace('-', ' ')}</span></div>
              <div className="summary-item"><span className="summary-label">Layout</span><span className="summary-value" style={{ textTransform: 'capitalize' }}>{livingRoomConfig?.storage?.length > 0 ? livingRoomConfig.storage.join(' + ') : 'None'}</span></div>
              <div className="summary-item"><span className="summary-label">Dimensions</span><span className="summary-value">{livingRoomConfig?.dimensions?.wallWidth}W × {livingRoomConfig?.dimensions?.wallHeight}H × {livingRoomConfig?.dimensions?.depth}D</span></div>
              <div className="summary-item"><span className="summary-label">Finish</span><span className="summary-value" style={{ textTransform: 'capitalize' }}>{livingRoomConfig?.shutterFinish}</span></div>
            </>
          )}
          {category === 'office' && (
            <>
              <div className="summary-item"><span className="summary-label">Scope</span><span className="summary-value" style={{ textTransform: 'capitalize' }}>{officeConfig?.scope}</span></div>
              <div className="summary-item"><span className="summary-label">Area Sqft</span><span className="summary-value">{officeConfig?.dimensions?.areaSqft}</span></div>
              <div className="summary-item"><span className="summary-label">Finish</span><span className="summary-value" style={{ textTransform: 'capitalize' }}>{officeConfig?.shutterFinish}</span></div>
            </>
          )}
          {category === 'full-home' && (
            <>
              <div className="summary-item"><span className="summary-label">Property</span><span className="summary-value" style={{ textTransform: 'capitalize' }}>{fullHomeConfig?.propertyType}</span></div>
              <div className="summary-item"><span className="summary-label">Rooms</span><span className="summary-value">{fullHomeConfig?.rooms?.length} selected</span></div>
              <div className="summary-item"><span className="summary-label">Additions</span><span className="summary-value">{fullHomeConfig?.additions?.length} selected</span></div>
            </>
          )}
        </div>
      </div>

      <form className="lead-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            placeholder="e.g. Rahul Sharma"
            value={leadData.name}
            onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
          />
          {errors.name && <div className="form-error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input 
            type="tel" 
            placeholder="e.g. 9876543210"
            value={leadData.phone}
            onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
            maxLength={10}
          />
          {errors.phone && <div className="form-error">{errors.phone}</div>}
        </div>

        <div className="step-actions">
          <button type="button" className="btn-back" onClick={prevStep}>
            <ArrowLeft size={16} /> Back
          </button>
          <button type="submit" className="btn btn-primary-gold">
            View My Estimate <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadCapture;
