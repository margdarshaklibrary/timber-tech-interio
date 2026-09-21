import React from 'react';
import { ShieldCheck, Droplet, Leaf, Diamond, Sparkles, Settings, Layers } from 'lucide-react';

const iconMap = {
  shield: <ShieldCheck size={18} strokeWidth={1.5} />,
  drop: <Droplet size={18} strokeWidth={1.5} />,
  leaf: <Leaf size={18} strokeWidth={1.5} />,
  diamond: <Diamond size={18} strokeWidth={1.5} />,
  sparkle: <Sparkles size={18} strokeWidth={1.5} />,
  gear: <Settings size={18} strokeWidth={1.5} />,
  layer: <Layers size={18} strokeWidth={1.5} />
};

const MaterialCard = ({
  title,
  description,
  imageSrc,
  insetSrc,
  features = [],
  isSelected,
  onClick
}) => {
  return (
    <div 
      className={`material-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="mc-top">
        <div className="mc-image-container">
          <img src={imageSrc} alt={title} className="mc-image" />
          {insetSrc && (
            <div className="mc-inset">
              <img src={insetSrc} alt={`${title} inset`} />
            </div>
          )}
        </div>
        <div className="mc-features">
          {features.map((f, i) => (
            <div key={i} className="mc-feature">
              <div className="mc-feature-icon">{iconMap[f.icon] || <ShieldCheck size={18} strokeWidth={1.5} />}</div>
              <span className="mc-feature-text">{f.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mc-footer">
        <div className="mc-text">
          <h4 className="mc-title">{title}</h4>
          <p className="mc-description">{description}</p>
        </div>
        <div className="mc-radio"></div>
      </div>
    </div>
  );
};

export default MaterialCard;
