import React from 'react';
import { useEstimator } from '../../../context/EstimatorContext';
import { ArrowRight } from 'lucide-react';

import { getImgUrl } from '../../../utils/cloudinary';

const CategorySelection = () => {
  const { category, handleCategorySelect } = useEstimator();

  const handleSelect = (cat) => {
    handleCategorySelect(cat);
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">What space are you planning?</h2>
        <p className="step-subtitle">Select a category to start your estimate.</p>
      </div>
      
      <div className="options-grid">
        <VisualOptionCard 
          title="Modular Kitchen" 
          description="Complete custom kitchen solutions"
          imageSrc={getImgUrl("est-kit-modular")}
          isSelected={category === 'kitchen'}
          onClick={() => handleSelect('kitchen')}
        />
        <VisualOptionCard 
          title="Wardrobe" 
          description="Storage and closet solutions"
          imageSrc={getImgUrl("est-wd-complete")}
          isSelected={category === 'wardrobe'}
          onClick={() => handleSelect('wardrobe')}
        />
        <VisualOptionCard 
          title="Living Room" 
          description="TV units, display and furniture"
          imageSrc={getImgUrl("gal-living-room-01")}
          isSelected={category === 'living'}
          onClick={() => handleSelect('living')}
        />
      </div>
    </div>
  );
};

export default CategorySelection;
