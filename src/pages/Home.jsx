import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';
import { testimonials } from '../data/testimonials';
import { ArrowRight, ShieldCheck, PenTool, HeartHandshake, Home as HomeIcon, Building2, Sofa, LayoutGrid } from 'lucide-react';
import '../styles/Home.css';
import { getImgUrl, getVideoUrl } from '../utils/cloudinary';
import { supabase } from '../utils/supabase';

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

  const trackRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const { data, error } = await supabase.from('site_assets').select('cloudinary_public_id').eq('slot_key', 'ui-hero-video').maybeSingle();
        if (error || !data || !data.cloudinary_public_id) {
          setVideoError(true);
          return;
        }
        
        let rawId = data.cloudinary_public_id;
        let finalUrl = "";
        
        if (rawId.startsWith('http')) {
          finalUrl = rawId;
        } else {
          let cleanId = rawId.replace(/^\/+/, '').replace(/^timber-tech-interio\//, '');
          finalUrl = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload/vc_h264:baseline,ac_none,w_1280,q_auto:good,f_mp4/timber-tech-interio/${cleanId}.mp4`;
        }
        
        let response = await fetch(finalUrl);
        if (!response.ok) {
          let cleanId = rawId.replace(/^\/+/, '').replace(/^timber-tech-interio\//, '');
          finalUrl = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload/vc_h264:baseline,ac_none,w_1280,q_auto:good,f_mp4/${cleanId}.mp4`;
          response = await fetch(finalUrl);
          if (!response.ok) throw new Error("Video not found");
        }
        
        const blob = await response.blob();
        setBlobUrl(URL.createObjectURL(blob));
      } catch (err) {
        console.error("Hero video error:", err);
        setVideoError(true);
      }
    };
    
    fetchVideo();
  }, []);

  useEffect(() => {
    let targetProgress = 0;
    let smoothProgress = 0;
    let rafId = null;
    let lastVideoTime = -1;

    const onScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      if (maxScroll <= 0) return;
      targetProgress = Math.min(1, Math.max(0, -rect.top / maxScroll));
    };

    const renderLoop = () => {
      // 1. Calculate difference with a maximum speed cap per frame (0.008 max step per frame at 60fps)
      // This guarantees the video takes at least ~2 seconds of smooth gliding even if the user flicks the scrollbar hard!
      const diff = targetProgress - smoothProgress;
      const step = Math.sign(diff) * Math.min(Math.abs(diff) * 0.06, 0.008);
      smoothProgress += step;

      // 2. Scrub video smoothly
      const video = videoRef.current;
      if (video && video.readyState >= 2 && Number.isFinite(video.duration) && video.duration > 0) {
        // Keep video slightly away from exact 100% end so it never triggers ended state
        const clampedProgress = Math.min(0.995, Math.max(0.001, smoothProgress));
        const nextTime = +(clampedProgress * video.duration).toFixed(3);

        if (Math.abs(nextTime - lastVideoTime) > 0.015 && !video.seeking) {
          video.currentTime = nextTime;
          lastVideoTime = nextTime;
        }
      }

      // 3. Keep Hero Text visible for the first 70% of the video, then fade out smoothly between 70% and 95%
      if (contentRef.current) {
        const fadeProgress = Math.max(0, (smoothProgress - 0.7) / 0.25);
        const opacity = Math.max(0, 1 - fadeProgress);
        const translateY = smoothProgress * -40;
        contentRef.current.style.transform = `translate(-50%, -50%) translate3d(0, ${translateY}px, 0)`;
        contentRef.current.style.opacity = `${opacity}`;
        contentRef.current.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto';
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    rafId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="page-wrapper">
      
      {/* Scroll-Driven Hero Section */}
      <div 
        ref={trackRef} 
        style={{ height: '500vh', minHeight: '500vh', position: 'relative', width: '100%', backgroundColor: '#000' }}
      >
        <div style={{ position: 'sticky', top: 0, left: 0, width: '100%', height: '100vh', overflow: 'hidden' }}>
          
          {/* Background Video or Fallback Image */}
          {!videoError && (blobUrl || getVideoUrl("ui-hero-video")) ? (
            <video 
              ref={videoRef}
              src={blobUrl || getVideoUrl("ui-hero-video")}
              poster={getImgUrl("ui-hero-main")}
              muted 
              playsInline 
              preload="auto"
              onLoadedMetadata={(e) => {
                e.target.currentTime = 0.001;
                e.target.pause();
              }}
              onError={() => setVideoError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div 
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${getImgUrl("ui-hero-main")})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          )}

          {/* Hero Overlay */}
          <div className="hero-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.25)', zIndex: 1 }}></div>
          
          {/* Hero Content with Parallax & Fade */}
          <div 
            ref={contentRef}
            className="container hero-content"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) translate3d(0, 0, 0)`,
              opacity: 1,
              width: '100%',
              textAlign: 'center',
              zIndex: 2,
              willChange: 'transform, opacity'
            }}
          >
            <h1 className="hero-title">Crafting Beautiful Spaces for Modern Living</h1>
            <p className="hero-subtitle">Custom furniture, modular kitchens, wardrobes, sofas, beds and complete interior work.</p>
            <div className="hero-buttons">
              <Link to="/book-appointment" className="btn btn-primary-gold">Book Appointment</Link>
              <a href="tel:9939557655" className="btn btn-outline-light">Call Now</a>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Your Space Section */}
      <section className="plan-space-section section-padding">
        <div className="container">
          <SectionTitle 
            eyebrow="PLAN YOUR SPACE"
            title="Get an Estimate for Your Interior"
            subtitle="Explore your options, choose your style and get an indicative cost for your space."
            centered={true}
          />
          <div className="estimator-category-grid">
            {[
              { id: 'kitchen', name: 'Modular Kitchen', desc: 'Custom cabinets & layouts', img: getImgUrl("est-kit-modular") },
              { id: 'wardrobe', name: 'Wardrobe', desc: 'Storage & closet solutions', img: getImgUrl("est-wd-complete") },
              { id: 'living', name: 'Living Room', desc: 'TV units & display cabinets', img: getImgUrl("gal-living-room-01") },
              { id: 'bedroom', name: 'Bedroom', desc: 'Beds, side tables & more', img: getImgUrl("gal-bedroom-01") },
              { id: 'office', name: 'Office / Workspace', desc: 'Workstations & storage', img: getImgUrl("est-room-study-office") },
              { id: 'full-home', name: 'Full Home Interiors', desc: 'Complete end-to-end design', img: getImgUrl("est-prop-villa") }
            ].map((cat) => (
              <div key={cat.id} className="estimator-category-card">
                <div 
                  className="estimator-category-bg" 
                  style={{ backgroundImage: `url(${cat.img})` }}
                ></div>
                <div className="estimator-category-overlay"></div>
                <div className="estimator-category-content">
                  <h3 className="estimator-category-title">{cat.name}</h3>
                  <p className="estimator-category-desc">{cat.desc}</p>
                  <Link 
                    to="/estimator" 
                    className="btn estimator-category-btn"
                    onClick={() => localStorage.setItem('selectedEstimatorCategory', cat.id)} 
                  >
                    Calculate Estimate <ArrowRight size={18} className="btn-icon-right" />
                  </Link>
                </div>
              </div>
            ))}
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
            <img src={getImgUrl("ui-workshop")} alt="Timber Tech Workshop" />
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
