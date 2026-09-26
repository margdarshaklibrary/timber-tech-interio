import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import { getImgUrl } from '../../utils/cloudinary';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import '../../styles/AdminPortal.css';

const AdminLogin = () => {
  const [view, setView] = useState('login'); // 'login' or 'forgot_password'
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (data.session) {
        navigate('/margdarshakss-admin/dashboard');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/margdarshakss-admin/reset-password`,
      });

      if (error) throw error;
      
      setSuccess("Password reset link has been sent to your email! Please check your inbox (and spam folder).");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-portal-wrapper">
      <style>{`
        .admin-portal-wrapper svg { width: 20px; height: 20px; flex-shrink: 0; }
        .btn-primary-admin svg.animate-spin { width: 20px; height: 20px; }
        .forgot-link { font-size: 13px; color: var(--admin-accent); text-decoration: none; cursor: pointer; font-weight: 600; }
        .forgot-link:hover { text-decoration: underline; }
      `}</style>
      <div className="admin-login-page">
        <div 
          className="admin-login-left" 
          style={{ backgroundImage: `url(${getImgUrl("ui-hero-main")})` }}
        >
          <div className="admin-login-overlay"></div>
          <div className="admin-login-brand">
            <h1>Timber Tech <span>Interio</span></h1>
            <p>Margdarshakss Admin Portal &mdash; Manage your collections, curate galleries, and oversee your digital showroom.</p>
          </div>
        </div>
        
        <div className="admin-login-right">
          <div className="admin-login-card">
            <h2>{view === 'login' ? 'Admin Access' : 'Reset Password'}</h2>
            <p>
              {view === 'login' 
                ? 'Sign in to manage your premium spaces.' 
                : 'Enter your email address and we will send you a password reset link.'}
            </p>
            
            {view === 'login' ? (
              <form onSubmit={handleLogin}>
                {error && (
                  <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: '500' }}>
                    {error}
                  </div>
                )}
                
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <div className="input-icon-left">
                      <Mail />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@timbertech.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ marginBottom: 0 }}>Password</label>
                    <a className="forgot-link" onClick={() => { setView('forgot_password'); setError(''); setSuccess(''); }}>
                      Forgot Password?
                    </a>
                  </div>
                  <div className="input-wrapper">
                    <div className="input-icon-left">
                      <Lock />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="input-icon-right"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-primary-admin" disabled={loading}>
                  {loading ? (
                    <>
                      <svg className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"></path>
                      </svg>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Sign In to Dashboard
                      <ArrowRight />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleForgotPassword}>
                {error && (
                  <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: '500' }}>
                    {error}
                  </div>
                )}
                {success && (
                  <div style={{ background: '#DCFCE7', color: '#166534', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: '500' }}>
                    {success}
                  </div>
                )}
                
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <div className="input-icon-left">
                      <Mail />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@timbertech.com"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary-admin" disabled={loading} style={{ marginBottom: '16px' }}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
                
                <div style={{ textAlign: 'center' }}>
                  <a className="forgot-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }} onClick={() => { setView('login'); setError(''); setSuccess(''); }}>
                    <ArrowLeft style={{ width: '14px', height: '14px' }} /> Back to login
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
