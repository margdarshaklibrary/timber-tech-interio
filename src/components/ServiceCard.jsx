import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';
import '../styles/ServiceCard.css';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const { setAppointmentFormData } = useAppContext();

  const handleRequestQuote = () => {
    // Pre-fill the service type in context
    setAppointmentFormData(prev => ({
      ...prev,
      serviceType: service.title
    }));
    navigate('/book-appointment');
  };

  return (
    <div className="service-card">
      <div className="service-img-wrapper">
        <img src={service.image} alt={service.title} className="service-img" />
      </div>
      <div className="service-content">
        <h3 className="service-title">{service.title}</h3>
        <p className="service-desc">{service.description}</p>
        <button className="btn btn-outline-dark request-btn" onClick={handleRequestQuote}>
          Request Quote <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
