import React from 'react';

const DimensionInput = ({ label, value, onChange, placeholder = "e.g. 10", horizontal = false, unit = "ft." }) => {
  if (horizontal) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '24px' }}>
        <label style={{ fontSize: '20px', fontWeight: '500', color: '#333', width: '24px' }}>{label}</label>
        <div style={{ position: 'relative', flex: 1 }}>
          <input 
            type="number" 
            min="0" 
            step="0.5"
            placeholder={placeholder}
            value={value || ''}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            style={{ width: '100%', padding: '12px 40px 12px 16px', border: '1px solid #E0E0E0', borderRadius: '6px', fontSize: '16px' }}
          />
          <span style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>{unit}</span>
        </div>
      </div>
    );
  }

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
          <span className="input-suffix">{unit.replace('.', '')}</span>
        </div>
      </div>
    </div>
  );
};

export default DimensionInput;
