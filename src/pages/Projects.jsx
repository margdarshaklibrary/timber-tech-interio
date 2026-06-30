import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { projects, projectCategories } from '../data/projects';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import '../styles/Projects.css';

const Projects = () => {
  const { activeProjectCategory, setActiveProjectCategory } = useAppContext();

  const filteredProjects = useMemo(() => {
    if (activeProjectCategory === 'All Projects') return projects;
    return projects.filter(p => p.category === activeProjectCategory);
  }, [activeProjectCategory]);

  return (
    <div className="page-wrapper">
      <section className="projects-hero">
        <div className="projects-hero-overlay"></div>
        <div className="container projects-hero-content">
          <h1 className="hero-title">Masterpieces of Living</h1>
          <p className="hero-subtitle">Explore our portfolio of bespoke interiors and custom furniture crafted with precision and passion.</p>
        </div>
      </section>

      <section className="projects-gallery-section section-padding">
        <div className="container">
          {/* Filter Tabs */}
          <div className="filter-tabs">
            {projectCategories.map(cat => (
              <button 
                key={cat}
                className={`filter-tab ${activeProjectCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveProjectCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="no-results">
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="dark-cta-banner">
        <div className="container text-center">
          <h2 className="cta-title">Ready to script your own space?</h2>
          <div className="cta-buttons">
            <Link to="/book-appointment" className="btn btn-primary-gold">Book Consultation</Link>
            <Link to="/contact" className="btn btn-outline-light">Visit Studio</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
