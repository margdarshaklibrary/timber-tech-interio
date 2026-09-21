import React, { useEffect } from 'react';
import { useEstimator } from '../../../context/EstimatorContext';
import VisualOptionCard from '../VisualOptionCard';
import { ArrowRight } from 'lucide-react';

import livingImg1 from '../../../assets/projects/living-room-1.webp';
import wardrobe1 from '../../../assets/projects/wardrobe-1.webp';
import lobbyImg1 from '../../../assets/projects/lobby-1.webp';

const CategorySelection = () => {
  const { category, handleCategorySelect, nextStep } = useEstimator();

  // No longer needed, handled by Estimator.jsx on mount

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
          imageSrc={lobbyImg1}
          isSelected={category === 'kitchen'}
          onClick={() => handleSelect('kitchen')}
        />
        <VisualOptionCard 
          title="Wardrobe" 
          description="Storage and closet solutions"
          imageSrc={wardrobe1}
          isSelected={category === 'wardrobe'}
          onClick={() => handleSelect('wardrobe')}
        />
        <VisualOptionCard 
          title="Living Room" 
          description="TV units, display and furniture"
          imageSrc={livingImg1}
          isSelected={category === 'living'}
          onClick={() => handleSelect('living')}
        />
      </div>


    </div>
  );
};

export default CategorySelection;
