import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import SectionTitle from '../components/SectionTitle';
import { CheckCircle } from 'lucide-react';
import '../styles/BookAppointment.css';

const BookAppointment = () => {
  const { appointmentFormData, setAppointmentFormData } = useAppContext();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [minDate, setMinDate] = useState('');

  // Set minimum date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!appointmentFormData.fullName.trim()) newErrors.fullName = 'Full name is required';
    
    // 10 digit Indian mobile number
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!appointmentFormData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(appointmentFormData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit mobile number';
    }

    if (!appointmentFormData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(appointmentFormData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!appointmentFormData.location.trim()) newErrors.location = 'Project location is required';
    if (!appointmentFormData.serviceType) newErrors.serviceType = 'Service type is required';
    if (!appointmentFormData.appointmentDate) newErrors.appointmentDate = 'Appointment date is required';
    if (!appointmentFormData.referral) newErrors.referral = 'Please tell us where you heard about us';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Backend developer can connect this endpoint with Excel API later
      // fetch('/api/appointment', { method: 'POST', body: JSON.stringify(appointmentFormData) })
      
      console.log('Form Submitted successfully:', appointmentFormData);
      setIsSubmitted(true);
      
      // Clear form after success
      setAppointmentFormData({
        fullName: '', phone: '', email: '', location: '', serviceType: '', appointmentDate: '', referral: '', message: ''
      });
    }
  };

  return (
    <div className="page-wrapper appointment-page">
      <div className="container">
        
        {/* Intro */}
        <div className="appointment-header">
          <SectionTitle 
            eyebrow="CRAFT YOUR LEGACY"
            title="Design Your Dream Space"
            subtitle="Book a consultation with our design experts to discuss your vision, materials, and timeline."
          />
        </div>

        <div className="appointment-layout">
          {/* Form Column */}
          <div className="form-column">
            {isSubmitted ? (
              <div className="success-message">
                <CheckCircle size={48} className="success-icon" />
                <h2>Thank You!</h2>
                <p>Your appointment request has been received. Our team will contact you shortly to confirm the timing.</p>
                <button className="btn btn-primary-dark mt-4" onClick={() => setIsSubmitted(false)}>
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="fullName" value={appointmentFormData.fullName} onChange={handleChange} className={errors.fullName ? 'error' : ''} placeholder="John Doe" />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>Mobile Number *</label>
                    <input type="tel" name="phone" value={appointmentFormData.phone} onChange={handleChange} className={errors.phone ? 'error' : ''} placeholder="9876543210" />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" value={appointmentFormData.email} onChange={handleChange} className={errors.email ? 'error' : ''} placeholder="john@example.com" />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label>Project Location *</label>
                    <input type="text" name="location" value={appointmentFormData.location} onChange={handleChange} className={errors.location ? 'error' : ''} placeholder="Darbhanga City" />
                    {errors.location && <span className="error-text">{errors.location}</span>}
                  </div>

                  <div className="form-group">
                    <label>Service Type *</label>
                    <select name="serviceType" value={appointmentFormData.serviceType} onChange={handleChange} className={errors.serviceType ? 'error' : ''}>
                      <option value="">Select a service</option>
                      <option value="Living Room Furniture">Living Room Furniture</option>
                      <option value="Bedroom Furniture">Bedroom Furniture</option>
                      <option value="Modular Kitchen">Modular Kitchen</option>
                      <option value="Wardrobe">Wardrobe</option>
                      <option value="Dining Furniture">Dining Furniture</option>
                      <option value="TV Unit">TV Unit</option>
                      <option value="Office Furniture">Office Furniture</option>
                      <option value="Full Home Interior">Full Home Interior</option>
                      <option value="Custom Furniture">Custom Furniture</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.serviceType && <span className="error-text">{errors.serviceType}</span>}
                  </div>

                  <div className="form-group">
                    <label>Appointment Date *</label>
                    <input type="date" name="appointmentDate" value={appointmentFormData.appointmentDate} onChange={handleChange} min={minDate} className={errors.appointmentDate ? 'error' : ''} />
                    {errors.appointmentDate && <span className="error-text">{errors.appointmentDate}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label>Where did you hear about us? *</label>
                    <select name="referral" value={appointmentFormData.referral} onChange={handleChange} className={errors.referral ? 'error' : ''}>
                      <option value="">Select an option</option>
                      <option value="Google Search">Google Search</option>
                      <option value="Google Maps">Google Maps</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Instagram">Instagram</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Friend / Family">Friend / Family</option>
                      <option value="Banner / Poster">Banner / Poster</option>
                      <option value="Walk-in">Walk-in</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.referral && <span className="error-text">{errors.referral}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label>Project Message (Optional)</label>
                    <textarea name="message" value={appointmentFormData.message} onChange={handleChange} placeholder="Tell us a bit about your vision..." rows="4"></textarea>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary-dark">Confirm Booking</button>
                </div>
              </form>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="info-sidebar">
            <div className="info-card dark">
              <h3>Why Choose Timber Tech?</h3>
              <ul className="benefit-list">
                <li>
                  <div className="benefit-icon"><CheckCircle size={20} /></div>
                  <div>
                    <h4>Free Consultation</h4>
                    <p>Discuss your ideas with expert designers.</p>
                  </div>
                </li>
                <li>
                  <div className="benefit-icon"><CheckCircle size={20} /></div>
                  <div>
                    <h4>Site Visit</h4>
                    <p>Accurate measurements and space planning.</p>
                  </div>
                </li>
                <li>
                  <div className="benefit-icon"><CheckCircle size={20} /></div>
                  <div>
                    <h4>Custom Design</h4>
                    <p>100% personalized according to your need.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="info-image-card">
              <img src="/src/assets/images/workshop.jpg" alt="Artisan Workshop" />
              <div className="image-card-overlay">
                <h4>Artisan Workshop</h4>
                <p>WHERE VISION BECOMES REALITY</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookAppointment;
