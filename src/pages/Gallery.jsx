import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../utils/supabase';
import { getImgUrl } from '../utils/cloudinary';
import SectionTitle from '../components/SectionTitle';
import { Link } from 'react-router-dom';
import '../styles/Gallery.css';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState('All');
  
  // Extract unique categories from fetched items
  const categories = useMemo(() => {
    const cats = new Set(galleryItems.map(item => item.category));
    return ['All', ...Array.from(cats)];
  }, [galleryItems]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = useMemo(() => {
    if (activeGalleryFilter === 'All') return galleryItems;
    return galleryItems.filter(img => img.category === activeGalleryFilter);
  }, [activeGalleryFilter, galleryItems]);

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
        {!loading && categories.length > 1 && (
          <div className="gallery-filters">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`filter-tab ${activeGalleryFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveGalleryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        )}

        {/* Masonry Grid */}
        {!loading && (
          <div className="gallery-grid">
            {filteredImages.map(item => (
              <div key={item.id} className="gallery-item">
                <img src={getImgUrl(item.cloudinary_public_id)} alt={item.title || item.category} loading="lazy" />
                <div className="gallery-overlay">
                  <span>{item.title || item.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredImages.length === 0 && (
          <div className="no-results" style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
            <p>No images found in this category yet.</p>
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
