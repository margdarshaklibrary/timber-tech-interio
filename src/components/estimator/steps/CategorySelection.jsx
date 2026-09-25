import React from 'react';
import { useEstimator } from '../../../context/EstimatorContext';
import { ArrowRight } from 'lucide-react';

import kitchenImg from '../../../assets/gallery/kitchen/modular-kitchenImage.jpg';
import wardrobeImg from '../../../assets/gallery/wardrobe/wardrobe.jpg';
import livingImg from '../../../assets/projects/new_project_1.png';
import bedroomImg from '../../../assets/projects/new_project_2.jpg';
import officeImg from '../../../assets/gallery/office/office-or-workflow.jpg';
import fullHomeImg from '../../../assets/images/fullhome-interior.png';

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
      
      <div className="estimator-category-grid">
        {[
          { id: 'kitchen', name: 'Modular Kitchen', desc: 'Custom cabinets & layouts', img: kitchenImg },
          { id: 'wardrobe', name: 'Wardrobe', desc: 'Storage & closet solutions', img: wardrobeImg },
          { id: 'living', name: 'Living Room', desc: 'TV units & display cabinets', img: livingImg },
          { id: 'bedroom', name: 'Bedroom', desc: 'Beds, side tables & more', img: bedroomImg },
          { id: 'office', name: 'Office / Workspace', desc: 'Workstations & storage', img: officeImg },
          { id: 'full-home', name: 'Full Home Interiors', desc: 'Complete end-to-end design', img: fullHomeImg }
        ].map((cat) => (
          <div 
            key={cat.id} 
            className={`estimator-category-card ${category === cat.id ? 'selected' : ''}`}
            onClick={() => handleSelect(cat.id)}
            style={category === cat.id ? { border: '2px solid var(--champagne-gold)' } : {}}
          >
            <div 
              className="estimator-category-bg" 
              style={{ backgroundImage: `url(${cat.img})` }}
            ></div>
            <div className="estimator-category-overlay"></div>
            <div className="estimator-category-content">
              <h3 className="estimator-category-title">{cat.name}</h3>
              <p className="estimator-category-desc">{cat.desc}</p>
              <button className="btn estimator-category-btn">
                {category === cat.id ? 'Selected' : 'Calculate Estimate'} <ArrowRight size={18} className="btn-icon-right" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;
