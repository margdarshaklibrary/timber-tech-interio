import React from 'react';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';
import '../styles/Services.css';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="page-wrapper">
      <section className="services-hero">
        <div className="container">
          <SectionTitle 
            eyebrow="OUR EXPERTISE"
            title="Artisanal Living Spaces"
            subtitle="Explore our comprehensive range of custom furniture and interior solutions designed to elevate your everyday living."
            centered={true}
          />
        </div>
      </section>

      <section className="services-grid-section">
        <div className="container">
          <div className="services-grid">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="dark-cta-banner">
        <div className="container text-center">
          <h2 className="cta-title">Ready to redefine your space?</h2>
          <p className="cta-subtitle">Book a consultation with our design experts today.</p>
          <div className="cta-buttons">
            <Link to="/book-appointment" className="btn btn-primary-gold">Book Appointment</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
