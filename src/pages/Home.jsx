import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';
import { testimonials } from '../data/testimonials';
import { ArrowRight, ShieldCheck, PenTool, HeartHandshake, Home as HomeIcon, Building2, Sofa, LayoutGrid } from 'lucide-react';
import '../styles/Home.css';

const Home = () => {
  // Show only 3 services for preview
  const featuredServices = services.slice(0, 3);

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="page-wrapper">
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title">Crafting Beautiful Spaces for Modern Living</h1>
          <p className="hero-subtitle">Custom furniture, modular kitchens, wardrobes, sofas, beds and complete interior work.</p>
          <div className="hero-buttons">
            <Link to="/book-appointment" className="btn btn-primary-gold">Book Appointment</Link>
            <a href="tel:9939557655" className="btn btn-outline-light">Call Now</a>
          </div>
        </div>
      </section>

      {/* Core Services Features */}
      <section ref={sectionRef} className={`stats-section ${isVisible ? 'fade-in-visible' : ''}`}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <HomeIcon size={40} className="stat-icon" />
              <h3 className="stat-title">Residential Interiors</h3>
              <p className="stat-desc">Elegant interiors designed for comfortable and modern homes.</p>
            </div>
            <div className="stat-item">
              <Building2 size={40} className="stat-icon" />
              <h3 className="stat-title">Commercial Interiors</h3>
              <p className="stat-desc">Professional interior solutions for offices and commercial spaces.</p>
            </div>
            <div className="stat-item">
              <Sofa size={40} className="stat-icon" />
              <h3 className="stat-title">Custom Furniture</h3>
              <p className="stat-desc">Made-to-measure furniture crafted to fit your space perfectly.</p>
            </div>
            <div className="stat-item">
              <LayoutGrid size={40} className="stat-icon" />
              <h3 className="stat-title">Modular Solutions</h3>
              <p className="stat-desc">Smart modular kitchens, wardrobes, storage, and interior solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview section-padding">
        <div className="container about-grid">
          <div className="about-text">
            <SectionTitle 
              eyebrow="WHERE HERITAGE MEETS MODERN PRECISION"
              title="A Legacy Written in Wood"
              subtitle="Timber Tech Interio creates custom furniture and interiors for modern homes. Located in Darbhanga, we focus on strong materials, clean finishing and highly practical designs that last generations."
            />
            <Link to="/about" className="text-link mt-4">Discover Our Story <ArrowRight size={16}/></Link>
          </div>
          <div className="about-image">
            <img src="/src/assets/images/workshop.jpg" alt="Timber Tech Workshop" />
          </div>
        </div>
      </section>

      {/* Signature Solutions */}
      <section className="services-preview section-padding bg-cream">
        <div className="container">
          <SectionTitle 
            eyebrow="OUR SIGNATURE SOLUTIONS"
            title="Designed for Your Lifestyle"
            centered={true}
          />
          <div className="services-grid">
            {featuredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="text-center mt-section">
            <Link to="/services" className="btn btn-outline-dark">View All Collections</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section section-padding">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <ShieldCheck size={40} className="gold-icon mb-4" />
              <h3>Premium Materials</h3>
              <p>We source only the highest grade timber and hardware to ensure longevity and strength.</p>
            </div>
            <div className="feature-item">
              <PenTool size={40} className="gold-icon mb-4" />
              <h3>Bespoke Design</h3>
              <p>Every piece is tailored to your exact space dimensions and personal aesthetic preferences.</p>
            </div>
            <div className="feature-item">
              <HeartHandshake size={40} className="gold-icon mb-4" />
              <h3>Lifetime Support</h3>
              <p>Our relationship doesn't end at delivery. We provide ongoing support for all our creations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section section-padding bg-dark">
        <div className="container">
          <SectionTitle 
            eyebrow="CLIENT STORIES"
            title="Words from Our Clients"
            centered={true}
          />
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <p className="quote">"{testimonial.quote}"</p>
                <div className="author-info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark CTA */}
      <section className="dark-cta-banner">
        <div className="container text-center">
          <h2 className="cta-title">Ready to Script Your Space?</h2>
          <p className="cta-subtitle">Visit our Darbhanga showroom or book a consultation today.</p>
          <div className="cta-buttons">
            <Link to="/book-appointment" className="btn btn-primary-gold">Book Appointment</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
