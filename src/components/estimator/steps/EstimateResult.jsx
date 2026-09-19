import React from 'react';
import { useEstimator } from '../../../context/EstimatorContext';
import { formatCurrency } from '../../../utils/pricingCalculator';
import { Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const EstimateResult = () => {
  const { estimateResult, leadData, kitchenConfig, resetEstimator } = useEstimator();

  if (!estimateResult) return null;

  return (
    <div className="step-content result-container">
      <div className="step-header">
        <h2 className="step-title">Hi {leadData.name.split(' ')[0]}, Here is Your Estimate</h2>
        <p className="step-subtitle">Based on the selections you provided.</p>
      </div>

      <div className="price-range">
        {formatCurrency(estimateResult.minPrice)} – {formatCurrency(estimateResult.maxPrice)}
      </div>
      
      <p className="disclaimer">
        *Indicative estimate. Final quote will be confirmed after design approval, site measurement, and exact material selection.
      </p>

      {estimateResult.isSmartLuxury && (
        <div className="smart-luxury-box">
          <h4>Want a premium look without overspending?</h4>
          <ul>
            <li>Use premium finish (like Acrylic or PU) only on visible areas.</li>
            <li>Use durable standard finishes for internal or hidden areas.</li>
            <li>Focus your budget on high-impact zones.</li>
          </ul>
        </div>
      )}

      <div className="summary-panel" style={{ textAlign: 'left' }}>
        <h3 className="summary-title">Estimate Breakdown</h3>
        <div className="summary-list">
          {estimateResult.breakdown.furniture !== undefined && (
            <div className="summary-item">
              <span className="summary-label">Furniture / Base Setup</span>
              <span className="summary-value">{formatCurrency(estimateResult.breakdown.furniture)}</span>
            </div>
          )}
          {estimateResult.breakdown.hardware !== undefined && (
            <div className="summary-item">
              <span className="summary-label">Hardware & Mechanisms</span>
              <span className="summary-value">{formatCurrency(estimateResult.breakdown.hardware)}</span>
            </div>
          )}
          {estimateResult.breakdown.materials !== undefined && (
            <div className="summary-item">
              <span className="summary-label">Materials & Finishes</span>
              <span className="summary-value">{formatCurrency(estimateResult.breakdown.materials)}</span>
            </div>
          )}
          {estimateResult.breakdown.installation !== undefined && (
            <div className="summary-item">
              <span className="summary-label">Installation & Labor</span>
              <span className="summary-value">{formatCurrency(estimateResult.breakdown.installation)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="step-actions" style={{ justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <Link to="/book-appointment" className="btn btn-primary-dark">
          Book Free Consultation
        </Link>
        <button onClick={resetEstimator} className="btn btn-outline-dark">
          Start Over
        </button>
        <a href="tel:9939557655" className="btn btn-outline-dark">
          <Phone size={18} /> Call Timber Tech
        </a>
        <a href="https://wa.me/919939557655" target="_blank" rel="noopener noreferrer" className="btn btn-primary-gold" style={{ backgroundColor: '#25D366', color: 'white' }}>
          <MessageCircle size={18} /> WhatsApp Us
        </a>
      </div>
    </div>
  );
};

export default EstimateResult;
