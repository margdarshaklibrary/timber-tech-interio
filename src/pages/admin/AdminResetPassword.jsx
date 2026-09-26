import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import { getImgUrl } from '../../utils/cloudinary';
import { Eye, EyeOff, Lock, CheckCircle2 } from 'lucide-react';
import '../../styles/AdminPortal.css';

const AdminResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for hash changes if Supabase redirects with a recovery token
    const hash = window.location.hash;
    if (hash && hash.includes('type=recovery')) {
      // Token is available, we can proceed
    }
    
    // Check if there is an active session
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session && !hash) {
        // If no session and no hash, they probably shouldn't be here
        // But let's allow it in case they have a valid session already
      }
    });
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) throw error;
      
      setSuccess("Password updated successfully!");
      
      setTimeout(() => {
        navigate('/margdarshakss-admin/dashboard');
      }, 2000);
      
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
            <h2>Set New Password</h2>
            <p>Enter your new password below.</p>
            
            <form onSubmit={handleResetPassword}>
              {error && (
                <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: '500' }}>
                  {error}
                </div>
              )}
              {success && (
                <div style={{ background: '#DCFCE7', color: '#166534', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 style={{ width: '16px', height: '16px' }} />
                  {success}
                </div>
              )}

              <div className="form-group">
                <label>New Password</label>
                <div className="input-wrapper">
                  <div className="input-icon-left">
                    <Lock />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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

              <div className="form-group">
                <label>Confirm New Password</label>
                <div className="input-wrapper">
                  <div className="input-icon-left">
                    <Lock />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="input-icon-right"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-primary-admin" disabled={loading}>
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResetPassword;
