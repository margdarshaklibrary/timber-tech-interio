import React from 'react';

const VisualOptionCard = ({ 
  title, 
  description, 
  imageSrc, 
  isSelected, 
  onClick, 
  badge
}) => {
  return (
    <div 
      className={`visual-option-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {badge && <div className="card-badge">{badge}</div>}
      
      <div className="voc-visual">
        <img src={imageSrc} alt={title} className="voc-image" />
      </div>

      <div className="voc-footer">
        <div className="card-title-row">
          <h4 className="voc-title">{title}</h4>
          <div className="voc-indicator"></div>
        </div>
        {description && <p className="voc-description">{description}</p>}
      </div>
    </div>
  );
};

export default VisualOptionCard;
