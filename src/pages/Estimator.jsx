import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useEstimator } from '../context/EstimatorContext';
import CategorySelection from '../components/estimator/steps/CategorySelection';
import KitchenFlow from '../components/estimator/steps/kitchen/KitchenFlow';
import WardrobeFlow from '../components/estimator/steps/wardrobe/WardrobeFlow';
import BedroomFlow from '../components/estimator/steps/bedroom/BedroomFlow';
import LivingRoomFlow from '../components/estimator/steps/living/LivingRoomFlow';
import OfficeFlow from '../components/estimator/steps/office/OfficeFlow';
import FullHomeFlow from '../components/estimator/steps/fullhome/FullHomeFlow';
import LeadCapture from '../components/estimator/steps/LeadCapture';
import EstimateResult from '../components/estimator/steps/EstimateResult';
import '../styles/Estimator.css';

const EstimatorContent = () => {
  const { currentStep, category, nextStep, prevStep, estimateResult, handleCategorySelect } = useEstimator();
  const location = useLocation();

  useEffect(() => {
    // Check both location state and localStorage for a category passed from Home
    const passedCategory = location.state?.category || localStorage.getItem('selectedEstimatorCategory');
    if (passedCategory) {
      handleCategorySelect(passedCategory);
      // Clear it so it doesn't force this category on subsequent manual visits to the estimator page
      localStorage.removeItem('selectedEstimatorCategory');
    }
  }, [location.state, handleCategorySelect]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  useEffect(() => {
    // If they land on the estimator without a category (or clicked Back from step 2),
    // redirect them to the home page to select one, since we removed the internal selection page.
    if (!category && currentStep === 1) {
      // Small delay to allow initial mount check to process passedCategory
      const timer = setTimeout(() => {
        if (!location.state?.category && !localStorage.getItem('selectedEstimatorCategory')) {
           window.location.href = '/';
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [category, currentStep, location.state]);

  const renderStep = () => {
    if (estimateResult) {
      return <EstimateResult />;
    }

    if (currentStep === 3) {
      return <LeadCapture />;
    }

    if (currentStep === 4) {
      return <EstimateResult />;
    }

    if (currentStep === 2) {
      switch (category) {
        case 'kitchen':
          return <KitchenFlow onComplete={nextStep} onBackToCategory={prevStep} />;
        case 'wardrobe':
          return <WardrobeFlow onComplete={nextStep} onBackToCategory={prevStep} />;
        case 'bedroom':
          return <BedroomFlow onComplete={nextStep} onBackToCategory={prevStep} />;
        case 'living':
          return <LivingRoomFlow onComplete={nextStep} onBackToCategory={prevStep} />;
        case 'office':
          return <OfficeFlow onComplete={nextStep} onBackToCategory={prevStep} />;
        case 'full-home':
          return <FullHomeFlow onComplete={nextStep} onBackToCategory={prevStep} />;
        default:
          return (
            <div className="step-content text-center">
              <h2>Estimator for {category} is coming soon!</h2>
              <button className="btn btn-outline-dark mt-4" onClick={prevStep}>Go Back</button>
            </div>
          );
      }
    }

    return null;
  };

  return (
    <div className="estimator-wrapper">
      <div className="estimator-header-container">
        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--champagne-gold)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
          Interior Cost Estimator
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '48px', color: 'var(--dark-espresso)', marginBottom: '16px', lineHeight: '1.2' }}>
          Design Your Space, Know Your Estimate
        </h1>
        <p style={{ color: 'var(--soft-gray)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Choose your furniture configuration, materials, and finish to get an indicative project estimate instantly.
        </p>
      </div>
      <div className="estimator-container">
        {renderStep()}
      </div>
    </div>
  );
};

const Estimator = () => {
  // We expect this to be wrapped in EstimatorProvider in App.jsx
  return <EstimatorContent />;
};

export default Estimator;
