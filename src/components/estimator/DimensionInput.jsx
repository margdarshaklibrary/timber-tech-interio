import React from 'react';

const DimensionInput = ({ label, value, onChange, placeholder = "e.g. 10" }) => {
  return (
    <div className="dimension-group">
      <label className="dimension-label">{label}</label>
      <div className="dimension-inputs">
        <div className="input-wrapper">
          <input 
            type="number" 
            min="0" 
            step="0.5"
            placeholder={placeholder}
            value={value || ''}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          />
          <span className="input-suffix">ft</span>
        </div>
      </div>
    </div>
  );
};

export default DimensionInput;
