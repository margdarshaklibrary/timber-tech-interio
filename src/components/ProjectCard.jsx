import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-img-wrapper">
        {project.badge && (
          <div className="project-badge">{project.badge}</div>
        )}
        <img src={project.image} alt={project.title} className="project-img" />
      </div>
      <div className="project-content">
        <div className="project-eyebrow">
          <span className="project-category">{project.category.toUpperCase()} PROJECT</span>
          <span className="project-location">&middot; {project.location}</span>
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <Link to="/contact" className="text-link mt-auto">
          VIEW DETAILS <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
