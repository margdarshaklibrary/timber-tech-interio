import React from 'react';

const LargeVisualCard = ({ 
  title, 
  description,
  badge,
  imageSrc, 
  isSelected, 
  isLayout = false,
  isWide = false,
  onClick 
}) => {
  return (
    <div 
      className={`large-visual-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {badge && <div className="card-badge">{badge}</div>}
      <div className={`lvc-visual ${isWide ? 'lvc-visual-wide' : ''}`}>
        <img 
          src={imageSrc} 
          alt={title} 
          className={`lvc-image ${isLayout ? 'lvc-layout-image' : ''}`} 
        />
      </div>
      <div className="lvc-footer">
        <div className="card-title-row">
          <h4 className="lvc-title">{title}</h4>
          <div className="lvc-indicator"></div>
        </div>
        {description && <p className="lvc-description">{description}</p>}
      </div>
    </div>
  );
};

export default LargeVisualCard;
