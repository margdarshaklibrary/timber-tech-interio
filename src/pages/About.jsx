import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="page-wrapper">

      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="container text-center position-relative">
          <SectionTitle
            eyebrow="OUR STORY"
            title="A Legacy Written in Wood"
            subtitle="Timber Tech Interio creates custom furniture and interiors for modern homes. We focus on strong materials, clean finishing and practical designs."
            centered={true}
          />
        </div>
      </section>

      <section className="about-content section-padding">
        <div className="container about-grid">
          <div className="about-text-content">
            <h2 className="section-title">Craftsmanship and Quality</h2>
            <p>At Timber Tech Interio, we believe that true luxury lies in the details. Founded in Darbhanga, our mission has always been to bring artisanal woodworking and premium interior design to homes that value longevity and aesthetics.</p>
            <p>Every piece of furniture we create, and every room we design, is a testament to our dedication to quality. We source the finest timber, employ skilled local craftsmen, and utilize modern techniques to deliver spaces that are not only beautiful but highly functional.</p>
          </div>
          <div className="about-images">
            <div className="image-stack">
              <img src="/src/assets/images/gallery-showroom-1.jpg" alt="Showroom" className="img-back" />

            </div>
          </div>
        </div>
      </section>

      <section className="pillars-section section-padding bg-cream">
        <div className="container">
          <SectionTitle
            eyebrow="OUR FOUNDATION"
            title="The Pillars of Our Purpose"
            centered={true}
          />
          <div className="pillars-grid mt-section">
            <div className="pillar-card dark-card">
              <h3>Bespoke Design</h3>
              <p>We do not believe in one-size-fits-all. Your home is unique, and your furniture should be too. Our design process starts with understanding your vision and tailoring every dimension to fit your space perfectly.</p>
            </div>
            <div className="pillar-card light-card">
              <h3>Enduring Materials</h3>
              <p>We use premium-grade plywood, solid wood, and high-quality laminates and veneers. Our materials are chosen for their durability, resistance to wear, and timeless aesthetic appeal.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="dark-cta-banner">
        <div className="container text-center">
          <h2 className="cta-title">Let's build something lasting.</h2>
          <div className="cta-buttons">
            <Link to="/book-appointment" className="btn btn-primary-gold">Book a Consultation</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
