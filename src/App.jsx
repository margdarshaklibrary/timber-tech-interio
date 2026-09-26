import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { EstimatorProvider } from './context/EstimatorContext';
import { supabase } from './utils/supabase';
import { loadSiteAssets } from './utils/cloudinary';

// Layout & Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import BookAppointment from './pages/BookAppointment';
import Contact from './pages/Contact';
import Estimator from './pages/Estimator';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminResetPassword from './pages/admin/AdminResetPassword';

const AppContent = () => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/margdarshakss-admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    loadSiteAssets(supabase);
  }, []);

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/products" element={<Products />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/estimator" element={<Estimator />} />
          
          {/* Admin Routes */}
          <Route path="/margdarshakss-admin" element={<Navigate to="/margdarshakss-admin/dashboard" replace />} />
          <Route path="/margdarshakss-admin/login" element={<AdminLogin />} />
          <Route path="/margdarshakss-admin/reset-password" element={<AdminResetPassword />} />
          <Route 
            path="/margdarshakss-admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <EstimatorProvider>
        <Router>
          <AppContent />
        </Router>
      </EstimatorProvider>
    </AppProvider>
  );
}

export default App;
