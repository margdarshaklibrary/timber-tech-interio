import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { galleryImages, galleryCategories } from '../data/gallery';
import SectionTitle from '../components/SectionTitle';
import { Link } from 'react-router-dom';
import '../styles/Gallery.css';

const Gallery = () => {
  const { activeGalleryFilter, setActiveGalleryFilter } = useAppContext();

  const filteredImages = useMemo(() => {
    if (activeGalleryFilter === 'All Collections') return galleryImages;
    return galleryImages.filter(img => img.category === activeGalleryFilter);
  }, [activeGalleryFilter]);

  return (
    <div className="page-wrapper gallery-page">
      <div className="container">
        
        <div className="gallery-header">
          <SectionTitle 
            title="Artisanal Spaces, Timeless Gallery."
            subtitle="Browse through our curated collection of interior masterpieces and bespoke furniture designs."
          />
        </div>

        {/* Filter Tabs */}
        <div className="gallery-filters">
          {galleryCategories.map(cat => (
            <button 
              key={cat}
              className={`filter-tab ${activeGalleryFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveGalleryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="gallery-grid">
          {filteredImages.map(item => (
            <div key={item.id} className="gallery-item">
              <img src={item.image} alt={item.category} loading="lazy" />
              <div className="gallery-overlay">
                <span>{item.category}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="no-results">
            <p>No images found in this category.</p>
          </div>
        )}

      </div>

      <section className="dark-cta-banner mt-section">
        <div className="container text-center">
          <h2 className="cta-title">Inspired by our Gallery?</h2>
          <p className="cta-subtitle">Let's create something beautiful for your home.</p>
          <div className="cta-buttons">
            <Link to="/book-appointment" className="btn btn-primary-gold">Book a Consultation</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
