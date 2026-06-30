import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { MapPin, Phone, Mail, ArrowRight, Instagram } from 'lucide-react';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="page-wrapper contact-page">
      <div className="container">
        
        <div className="contact-header">
          <SectionTitle 
            eyebrow="BRINGING ELEGANCE"
            title="Let's Design Your Dream Space"
            subtitle="Get in touch with our team to start planning your interior transformation."
          />
        </div>

        <div className="contact-layout">
          {/* Quick Contact Form (Simplified) */}
          <div className="contact-form-card">
            <h3>Send a Quick Message</h3>
            <form className="quick-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <label>Email / Phone</label>
                <input type="text" placeholder="Contact Info" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="4" placeholder="How can we help?"></textarea>
              </div>
              <button type="button" className="btn btn-primary-dark mt-4">Send Inquiry</button>
            </form>
          </div>

          {/* Info Cards */}
          <div className="contact-info-cards">
            
            <div className="info-card light-card">
              <div className="card-header">
                <MapPin className="gold-icon" />
                <h3>Studio Address</h3>
              </div>
              <p>Hathauri Surha Chatti Road, Near Hathauri Chowk</p>
              <p>Darbhanga, Bihar</p>
              <div className="contact-links mt-4">
                <a href="tel:9939557655" className="contact-link"><Phone size={16}/> 9939557655</a>
                <a href="mailto:timbertechinterio@gmail.com" className="contact-link"><Mail size={16}/> timbertechinterio@gmail.com</a>
              </div>
            </div>

            <div className="info-card light-card">
              <div className="card-header">
                <Instagram className="gold-icon" />
                <h3>Social</h3>
              </div>
              <p>Follow us for daily inspiration.</p>
              <a href="#" className="text-link mt-4">@timbertechinterio <ArrowRight size={14}/></a>
            </div>

            <div className="action-buttons-row">
              <a href="tel:9939557655" className="btn btn-primary-gold flex-1 text-center">CALL NOW</a>
              <a href="https://wa.me/919939557655" target="_blank" rel="noreferrer" className="btn btn-whatsapp flex-1 text-center">WHATSAPP</a>
            </div>

          </div>
        </div>

        {/* Map Placeholder */}
        <div className="map-section mt-section">
          <div className="map-placeholder">
            <div className="map-overlay-card">
              <MapPin size={32} className="gold-icon mb-2"/>
              <h3>Find Us in Darbhanga</h3>
              <p>Hathauri Surha Chatti Road</p>
              <a href="https://maps.google.com/?q=Hathauri+Surha+Chatti+Road,+Near+Hathauri+Chowk,+Darbhanga" target="_blank" rel="noreferrer" className="btn btn-primary-dark mt-4">Get Directions</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
