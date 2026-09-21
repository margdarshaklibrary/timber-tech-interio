import React from 'react';

const ProgressIndicator = ({ currentStep, totalSteps, stepLabels }) => {
  return (
    <div className="progress-container">
      {stepLabels.map((label, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;
        
        return (
          <div 
            key={stepNum} 
            className={`progress-step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
          >
            <span className="ps-number">{(stepNum).toString().padStart(2, '0')}</span>
            <span className="ps-label">{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressIndicator;
