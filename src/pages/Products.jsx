import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../utils/supabase';
import { getImgUrl } from '../utils/cloudinary';
import SectionTitle from '../components/SectionTitle';
import { Link } from 'react-router-dom';
import '../styles/Gallery.css'; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(products.map(item => item.category));
    return ['All', ...Array.from(cats)];
  }, [products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <div className="page-wrapper gallery-page">
      <div className="container">
        
        <div className="gallery-header">
          <SectionTitle 
            title="Our Custom Products & Furniture."
            subtitle="Browse our wide selection of precision-crafted furniture and interiors."
          />
        </div>

        {/* Filter Tabs */}
        {!loading && categories.length > 1 && (
          <div className="gallery-filters">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
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

        {/* Grid */}
        {!loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
            {filteredProducts.map(product => (
              <div key={product.id} style={{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <img 
                  src={getImgUrl(product.cloudinary_public_id)} 
                  alt={product.title} 
                  style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                  loading="lazy" 
                />
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0, color: '#1a1a1a' }}>{product.title}</h3>
                    {product.price && <span style={{ fontWeight: '600', color: '#b8860b' }}>₹{product.price.toLocaleString('en-IN')}</span>}
                  </div>
                  
                  <span style={{ display: 'inline-block', backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '500', color: '#4b5563', marginBottom: '10px' }}>
                    {product.category}
                  </span>
                  
                  {product.material && (
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 10px 0' }}><strong>Material:</strong> {product.material}</p>
                  )}
                  
                  {product.description && (
                    <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {product.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="no-results" style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
            <p>No products found in this category yet.</p>
          </div>
        )}

      </div>

      <section className="dark-cta-banner mt-section">
        <div className="container text-center">
          <h2 className="cta-title">See something you like?</h2>
          <p className="cta-subtitle">Let's craft the perfect piece for your space.</p>
          <div className="cta-buttons">
            <Link to="/book-appointment" className="btn btn-primary-gold">Book a Consultation</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
