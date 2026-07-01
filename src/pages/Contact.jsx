import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { MapPin, Phone, Mail, ArrowRight, Clock, ExternalLink } from 'lucide-react';
import '../styles/Contact.css';

// Premium Custom WhatsApp SVG Icon
const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.96 9.96 0 0 0 4.88 1.277h.005c5.505 0 9.989-4.478 9.99-9.985A9.98 9.98 0 0 0 12.012 2zm4.7 13.914c-.258.723-1.477 1.32-2.022 1.393-.497.067-1.147.126-3.326-.773-2.78-1.151-4.57-3.978-4.71-4.162-.14-.183-1.12-1.488-1.12-2.839 0-1.35.703-2.012.952-2.28.25-.267.543-.334.723-.334.18 0 .36.002.518.01.166.007.387-.062.607.468.225.54.767 1.866.834 2 .067.135.112.293.023.473-.09.18-.135.293-.27.45-.135.158-.284.35-.406.47-.135.135-.277.282-.12.553.158.27.7 1.135 1.5 1.848.8.713 1.476.932 1.68.1.203-.203.43-.473.654-.744.225-.27.45-.225.767-.113.315.113 2.01.947 2.353 1.117.34.17.563.25.644.39.08.136.08.79-.178 1.513z"/>
  </svg>
);

const Contact = () => {
  const mapSearchLink = "https://www.google.com/maps/search/?api=1&query=Timber+Tech+Interio,+Hathauri+Surha+Chatti+Road,+Near+Hathauri+Chowk,+Darbhanga";
  const embedMapUrl = "https://maps.google.com/maps?q=Hathauri%20Surha%20Chatti%20Road,%20Near%20Hathauri%20Chowk,%20Darbhanga&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="page-wrapper contact-page">
      <div className="container">
        
        {/* 1. Hero Section */}
        <section className="contact-hero">
          <span className="eyebrow">GET IN TOUCH</span>
          <div className="eyebrow-line"></div>
          <h1 className="hero-title">Visit Timber Tech Interio</h1>
          <p className="hero-description">
            Planning furniture or interiors for your home? Call, WhatsApp, or visit our showroom in Darbhanga.
          </p>
          <div className="hero-actions">
            <a href="tel:9939557655" className="btn btn-primary-dark shadow-sm">
              <Phone size={18} />
              Call Now
            </a>
            <a href="https://wa.me/919939557655" target="_blank" rel="noreferrer" className="btn btn-whatsapp shadow-sm">
              <WhatsAppIcon size={18} />
              WhatsApp
            </a>
            <a href={mapSearchLink} target="_blank" rel="noreferrer" className="btn btn-outline-dark">
              <MapPin size={18} />
              Get Directions
            </a>
          </div>
        </section>

        {/* 2. Google Map & Showroom Card Section */}
        <section className="map-showcase-section">
          <div className="map-grid">
            <div className="map-frame-container">
              <iframe 
                src={embedMapUrl} 
                className="showroom-iframe-map"
                allowFullScreen="" 
                loading="lazy" 
                title="Timber Tech Showroom Map"
              ></iframe>
            </div>
            
            <div className="showroom-details-card">
              <div className="showroom-card-header">
                <MapPin className="gold-icon" size={24} />
                <h3>Showroom Location</h3>
              </div>
              <div className="showroom-body">
                <h4 className="company-name">Timber Tech Interio</h4>
                <address className="company-address">
                  Hathauri Surha Chatti Road,<br />
                  Near Hathauri Chowk,<br />
                  Darbhanga, Bihar
                </address>
                <div className="showroom-timing">
                  <Clock size={16} className="gold-icon" />
                  <span>Open: 10:00 AM – 8:00 PM</span>
                </div>
                <a 
                  href={mapSearchLink} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-primary-gold w-full mt-6"
                >
                  Open in Google Maps
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Contact Details Section */}
        <section className="contact-details-section">
          <div className="details-grid">
            
            {/* Phone Card (Priority) */}
            <div className="details-card priority-card phone-card">
              <div className="card-badge">Fast Response</div>
              <div className="details-card-header">
                <div className="icon-wrapper">
                  <Phone size={24} className="gold-icon" />
                </div>
                <h3>Phone</h3>
              </div>
              <p className="card-value">9939557655</p>
              <p className="card-desc">Call for furniture, interior work, and appointment details.</p>
              <a href="tel:9939557655" className="card-action-btn">
                Call Now <ArrowRight size={16} />
              </a>
            </div>

            {/* WhatsApp Card (Priority) */}
            <div className="details-card priority-card whatsapp-card">
              <div className="card-badge bg-green">Online</div>
              <div className="details-card-header">
                <div className="icon-wrapper bg-whatsapp-light">
                  <WhatsAppIcon size={24} className="whatsapp-green-icon" />
                </div>
                <h3>WhatsApp</h3>
              </div>
              <p className="card-value">9939557655</p>
              <p className="card-desc">Send your requirements, room photos, or reference designs.</p>
              <a href="https://wa.me/919939557655" target="_blank" rel="noreferrer" className="card-action-btn whatsapp-text">
                Chat on WhatsApp <ArrowRight size={16} />
              </a>
            </div>

            {/* Email Card (Secondary) */}
            <div className="details-card secondary-card">
              <div className="details-card-header">
                <div className="icon-wrapper">
                  <Mail size={24} className="gold-icon" />
                </div>
                <h3>Email</h3>
              </div>
              <p className="card-value email-value">timbertechinterio@gmail.com</p>
              <p className="card-desc">Share project details or reference images.</p>
              <a href="mailto:timbertechinterio@gmail.com" className="card-action-btn secondary-text">
                Send Email <ArrowRight size={16} />
              </a>
            </div>

            {/* Open Hours Card (Secondary) */}
            <div className="details-card secondary-card">
              <div className="details-card-header">
                <div className="icon-wrapper">
                  <Clock size={24} className="gold-icon" />
                </div>
                <h3>Open Hours</h3>
              </div>
              <p className="card-value">10:00 AM – 8:00 PM</p>
              <p className="card-desc">Visit our showroom during working hours.</p>
              <div className="card-status-indicator">
                <span className="dot pulse-dot"></span>
                <span className="status-label">Showroom Welcomes You</span>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Consultation CTA Section */}
        <section className="consultation-cta-section">
          <div className="cta-content">
            <h2>Need design guidance?</h2>
            <p>
              Book an appointment and discuss your furniture, modular kitchen, wardrobe, or full interior requirement with our team.
            </p>
            <Link to="/book-appointment" className="btn btn-primary-gold">
              Book Appointment
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Contact;
