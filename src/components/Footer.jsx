import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              Timber Tech <span>Interio</span>
            </Link>
            <p className="footer-tagline">
              Crafting Your Dream Spaces.<br/>
              Your All-Interior Solution.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Collections</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="footer-col">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><Link to="/services">Living Room</Link></li>
              <li><Link to="/services">Modular Kitchen</Link></li>
              <li><Link to="/services">Wardrobes</Link></li>
              <li><Link to="/services">Office Setup</Link></li>
              <li><Link to="/services">Custom Furniture</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Visit Our Studio</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={18} className="footer-icon" />
                <span>Hathauri Surha Chatti Road, Near Hathauri Chowk, Darbhanga</span>
              </li>
              <li>
                <Phone size={18} className="footer-icon" />
                <a href="tel:9939557655">9939557655</a>
              </li>
              <li>
                <Mail size={18} className="footer-icon" />
                <a href="mailto:timbertechinterio@gmail.com">timbertechinterio@gmail.com</a>
              </li>
            </ul>
            <p className="footer-hours">Open Hours: 10 AM to 8 PM</p>
          </div>
          
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Timber Tech Interio. Artisanal Excellence.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <span>&middot;</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
