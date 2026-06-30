import React from 'react';
import '../styles/SectionTitle.css';

const SectionTitle = ({ eyebrow, title, subtitle, centered = false }) => {
  return (
    <div className={`section-header ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <>
          <span className="eyebrow">{eyebrow}</span>
          <div className="eyebrow-line"></div>
        </>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
