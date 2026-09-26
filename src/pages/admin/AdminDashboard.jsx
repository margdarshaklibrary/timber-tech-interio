import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import { uploadToCloudinary, getImgUrl, getVideoUrl, loadSiteAssets } from '../../utils/cloudinary';
import { DEFAULT_SITE_ASSETS } from '../../utils/siteAssets';
import { 
  LayoutDashboard, Box, Image as ImageIcon, ExternalLink, LogOut, 
  UploadCloud, X, Search, Filter, Trash2, Edit2, Plus, 
  CheckCircle2, AlertCircle, Layers, CheckCircle, Sliders, Key, Eye, EyeOff
} from 'lucide-react';
import '../../styles/AdminPortal.css';

const PRODUCT_CATEGORIES = ['Sofas', 'Beds', 'Wardrobes', 'Kitchen', 'Dining', 'Office', 'TV Units'];
const GALLERY_CATEGORIES = ['Bedroom', 'Living Room', 'Wardrobe', 'Office', 'Showroom', 'Lobby', 'Kitchen'];

// --- Helper Components ---

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`admin-toast ${type === 'error' ? 'toast-error' : ''}`}>
      {type === 'success' && <CheckCircle2 />}
      {type === 'error' && <AlertCircle />}
      <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>{message}</p>
      <button onClick={onClose} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}>
        <X />
      </button>
    </div>
  );
};

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="admin-modal-overlay" style={{ zIndex: 3000 }}>
      <div className="admin-modal-card" style={{ maxWidth: '400px', padding: '24px' }}>
        <h3>{title}</h3>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '14px', marginBottom: '24px' }}>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={onCancel} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#F3F0EB', cursor: 'pointer', fontWeight: '600' }}>
            Cancel
          </button>
          <button onClick={onConfirm} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'var(--admin-danger-text)', color: '#fff', cursor: 'pointer', fontWeight: '600' }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--admin-text-muted)', padding: '4px' }}>
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const DragDropUpload = ({ onFileSelect, file, preview, onRemove, accept = "image/*" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  if (preview) {
    const isVideo = preview.startsWith('data:video') || accept.includes('video');
    return (
      <div className="drag-drop-preview">
        {isVideo && file ? (
          <video src={preview} autoPlay muted loop playsInline style={{ width: '100%', borderRadius: '12px', marginBottom: '12px' }} />
        ) : (
          <img src={preview} alt="Preview" />
        )}
        <button type="button" onClick={onRemove} className="btn-remove">
          <Trash2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Remove File
        </button>
      </div>
    );
  }

  return (
    <div 
      className="drag-drop-zone"
      style={{ borderColor: isDragging ? 'var(--admin-accent)' : '#D6D1C7' }}
      onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input type="file" ref={inputRef} onChange={handleChange} accept={accept} style={{ display: 'none' }} />
      <UploadCloud style={{ color: isDragging ? 'var(--admin-accent)' : '#A39E93', margin: '0 auto 12px' }} />
      <p style={{ fontWeight: '600', color: 'var(--admin-text-main)' }}>Drag & drop file here</p>
      <p>or click to browse from your computer</p>
    </div>
  );
};


// --- Main Admin Dashboard Component ---

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  // Global Toast State
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => setToast({ message, type });

  // Data States
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [siteAssetsDb, setSiteAssetsDb] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [loadingSiteAssets, setLoadingSiteAssets] = useState(true);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Product Form
  const [editingProduct, setEditingProduct] = useState(null);
  const [prodTitle, setProdTitle] = useState('');
  const [prodCategory, setProdCategory] = useState(PRODUCT_CATEGORIES[0]);
  const [prodPrice, setProdPrice] = useState('');
  const [prodMaterial, setProdMaterial] = useState('');
  
  // Gallery Form
  const [editingGallery, setEditingGallery] = useState(null);
  const [galTitle, setGalTitle] = useState('');
  const [galCategory, setGalCategory] = useState(GALLERY_CATEGORIES[0]);

  // Site Assets Form
  const [editingSiteAsset, setEditingSiteAsset] = useState(null);

  // Shared Upload State
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Confirm Modal State
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null, type: null, title: '', message: '' });

  // Change Password State
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
    fetchProducts();
    fetchGallery();
    fetchSiteAssets();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/margdarshakss-admin/login');
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    setProducts(data || []);
    setLoadingProducts(false);
  };

  const fetchGallery = async () => {
    setLoadingGallery(true);
    const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    setGallery(data || []);
    setLoadingGallery(false);
  };

  const fetchSiteAssets = async () => {
    setLoadingSiteAssets(true);
    const { data } = await supabase.from('site_assets').select('*');
    if (data) {
      const dbMap = {};
      data.forEach(item => {
        dbMap[item.slot_key] = item;
      });
      setSiteAssetsDb(dbMap);
    }
    setLoadingSiteAssets(false);
  };

  // --- Handlers ---

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setProdTitle('');
    setProdCategory(PRODUCT_CATEGORIES[0]);
    setProdPrice('');
    setProdMaterial('');
    
    setEditingGallery(null);
    setGalTitle('');
    setGalCategory(GALLERY_CATEGORIES[0]);

    setEditingSiteAsset(null);

    setFile(null);
    setPreview(null);
  };

  const openModalForProduct = (product = null) => {
    resetForm();
    if (product) {
      setEditingProduct(product.id);
      setProdTitle(product.title);
      setProdCategory(product.category);
      setProdPrice(product.price || '');
      setProdMaterial(product.material || '');
      setPreview(getImgUrl(product.cloudinary_public_id));
    }
    setIsModalOpen(true);
  };

  const openModalForGallery = (item = null) => {
    resetForm();
    if (item) {
      setEditingGallery(item.id);
      setGalTitle(item.title);
      setGalCategory(item.category);
      setPreview(getImgUrl(item.cloudinary_public_id));
    }
    setIsModalOpen(true);
  };

  const openModalForSiteAsset = (asset) => {
    resetForm();
    setEditingSiteAsset(asset);
    
    const dbAsset = siteAssetsDb[asset.slot_key];
    if (dbAsset && dbAsset.cloudinary_public_id) {
      setPreview(getImgUrl(asset.slot_key));
    } else {
      // preview defaults from hardcoded Cloudinary if not in db, but getImgUrl does this automatically if we pass slot_key
      setPreview(getImgUrl(asset.slot_key));
    }
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!file && !editingProduct) {
      showToast("Please select an image first", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      let cloudinary_public_id = editingProduct ? products.find(p => p.id === editingProduct)?.cloudinary_public_id : null;
      
      if (file) {
        cloudinary_public_id = await uploadToCloudinary(file, "prod", "products", "products");
      }

      const productData = {
        title: prodTitle, category: prodCategory, 
        price: prodPrice ? parseFloat(prodPrice) : null,
        material: prodMaterial, cloudinary_public_id
      };

      if (editingProduct) {
        await supabase.from('products').update(productData).eq('id', editingProduct);
        showToast("Product updated successfully!");
      } else {
        await supabase.from('products').insert([productData]);
        showToast("Product added successfully!");
      }

      fetchProducts();
      setIsModalOpen(false);
    } catch (error) {
      showToast(error.message || "Failed to save product", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveGallery = async (e) => {
    e.preventDefault();
    if (!file && !editingGallery) {
      showToast("Please select an image first", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      
      let cloudinary_public_id = editingGallery ? gallery.find(g => g.id === editingGallery)?.cloudinary_public_id : null;
      
      if (file) {
        cloudinary_public_id = await uploadToCloudinary(file, "gal", "gallery", "gallery");
      }
      
      const galleryData = {
        title: galTitle, category: galCategory, cloudinary_public_id
      };

      if (editingGallery) {
        await supabase.from('gallery').update(galleryData).eq('id', editingGallery);
        showToast("Gallery item updated successfully!");
      } else {
        await supabase.from('gallery').insert([galleryData]);
        showToast("Gallery photo added successfully!");
      }
      
      fetchGallery();
      setIsModalOpen(false);
    } catch (error) {
      showToast(error.message || "Failed to save photo", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveSiteAsset = async (e) => {
    e.preventDefault();
    if (!file) {
      showToast("Please select a new image file", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      const cloudinary_public_id = await uploadToCloudinary(file, "site", "site_assets", "site_assets");
      
      const assetData = {
        slot_key: editingSiteAsset.slot_key,
        label: editingSiteAsset.label,
        section: editingSiteAsset.section,
        cloudinary_public_id: cloudinary_public_id,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('site_assets').upsert(assetData, { onConflict: 'slot_key' });
      if (error) throw error;
      
      // Update global context cache immediately so previews reflect
      await loadSiteAssets(supabase);

      showToast("Site image updated successfully!");
      fetchSiteAssets();
      setIsModalOpen(false);
    } catch (error) {
      showToast(error.message || "Failed to update site image", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id, type) => {
    setConfirmModal({
      isOpen: true, id, type,
      title: `Delete ${type === 'product' ? 'Product' : 'Photo'}`,
      message: `Are you sure you want to delete this ${type}? This action cannot be undone.`
    });
  };

  const executeDelete = async () => {
    const { id, type } = confirmModal;
    setConfirmModal({ ...confirmModal, isOpen: false });
    try {
      if (type === 'product') {
        await supabase.from('products').delete().eq('id', id);
        fetchProducts();
      } else {
        await supabase.from('gallery').delete().eq('id', id);
        fetchGallery();
      }
      showToast(`${type === 'product' ? 'Product' : 'Item'} deleted successfully!`);
    } catch (error) {
      showToast("Failed to delete item", "error");
    }
  };

  const executeChangePassword = async (e) => {
    e.preventDefault();
    setChangePasswordError('');

    if (newPassword !== confirmPassword) {
      setChangePasswordError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      
      showToast("Password updated successfully!");
      setIsChangePasswordOpen(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setChangePasswordError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Filtering ---
  
  const getFilteredItems = (items) => {
    return items.filter(item => {
      const searchTitle = item.title || item.label || '';
      const matchesSearch = searchTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const itemCategory = item.category || item.section || '';
      const matchesCategory = filterCategory === 'All' || itemCategory === filterCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const filteredProducts = getFilteredItems(products);
  const filteredGallery = getFilteredItems(gallery);
  const filteredSiteAssets = getFilteredItems(DEFAULT_SITE_ASSETS);

  const productCats = ['All', ...new Set(products.map(p => p.category))];
  const galleryCats = ['All', ...new Set(gallery.map(g => g.category))];
  const siteAssetCats = ['All', ...new Set(DEFAULT_SITE_ASSETS.map(a => a.section))];


  // --- Render Sections ---

  const renderOverview = () => (
    <div>
      <div className="admin-stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper gold">
            <Box />
          </div>
          <div className="stat-info">
            <p>Total Products</p>
            <h3>{products.length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <ImageIcon />
          </div>
          <div className="stat-info">
            <p>Gallery Photos</p>
            <h3>{gallery.length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper purple">
            <Layers />
          </div>
          <div className="stat-info">
            <p>Total Categories</p>
            <h3>{new Set([...products.map(p=>p.category), ...gallery.map(g=>g.category)]).size}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <CheckCircle />
          </div>
          <div className="stat-info">
            <p>Storage Status</p>
            <h3 className="text-status">Cloudinary CDN Active</h3>
          </div>
        </div>
      </div>
    </div>
  );

  const renderToolbar = (categories, onAddClick, btnText) => (
    <div className="admin-toolbar">
      <div className="toolbar-filters">
        <div className="search-wrapper">
          <Search />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-wrapper">
          <Filter />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      {onAddClick && (
        <button onClick={onAddClick} className="btn-add-new">
          <Plus /> {btnText}
        </button>
      )}
    </div>
  );

  const renderProducts = () => (
    <div>
      {renderToolbar(productCats, () => openModalForProduct(), "Add New Product")}
      
      {loadingProducts ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>Loading products...</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Material</th>
                <th>Price</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img className="table-img" src={getImgUrl(product.cloudinary_public_id)} alt={product.title} />
                  </td>
                  <td style={{ fontWeight: '500' }}>{product.title}</td>
                  <td>
                    <span className="category-pill">{product.category}</span>
                  </td>
                  <td style={{ color: 'var(--admin-text-muted)' }}>
                    {product.material || '-'}
                  </td>
                  <td style={{ fontWeight: '600' }}>
                    {product.price ? `₹${product.price.toLocaleString('en-IN')}` : '-'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                      <button onClick={() => openModalForProduct(product)} className="action-btn edit" title="Edit">
                        <Edit2 />
                      </button>
                      <button onClick={() => confirmDelete(product.id, 'product')} className="action-btn delete" title="Delete">
                        <Trash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-muted)' }}>
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderGallery = () => (
    <div>
      {renderToolbar(galleryCats, () => openModalForGallery(), "Upload Gallery Photo")}
      
      {loadingGallery ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>Loading gallery...</div>
      ) : (
        <div className="admin-gallery-grid">
          {filteredGallery.map((item) => (
            <div key={item.id} className="gallery-card">
              <img src={getImgUrl(item.cloudinary_public_id)} alt={item.title} className="gallery-card-img" />
              <div className="gallery-card-footer">
                <div className="gallery-info">
                  <span className="category-pill" style={{ padding: '2px 8px', fontSize: '10px', marginBottom: '6px' }}>{item.category}</span>
                  <h4>{item.title}</h4>
                  <p className="gallery-id">ID: {item.cloudinary_public_id.split('/').pop()}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => openModalForGallery(item)} className="action-btn edit" style={{ background: '#F3F0EB', padding: '10px' }} title="Edit">
                    <Edit2 />
                  </button>
                  <button onClick={() => confirmDelete(item.id, 'gallery')} className="action-btn delete" style={{ background: 'var(--admin-danger-bg)', padding: '10px' }} title="Delete">
                    <Trash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredGallery.length === 0 && <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: 'var(--admin-text-muted)', background: '#fff', borderRadius: '14px' }}>No gallery photos found.</div>}
        </div>
      )}
    </div>
  );

  const renderSiteImages = () => (
    <div>
      {renderToolbar(siteAssetCats, null, null)}
      
      {loadingSiteAssets ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>Loading site images...</div>
      ) : (
        <div className="admin-gallery-grid">
          {filteredSiteAssets.map((asset) => {
            const isVideo = asset.media_type === 'video';
            const videoUrl = isVideo ? getVideoUrl(asset.slot_key) : null;
            return (
              <div key={asset.slot_key} className="gallery-card">
                {isVideo && videoUrl ? (
                  <video src={videoUrl} poster={getImgUrl('ui-hero-main')} autoPlay loop muted playsInline className="gallery-card-img" style={{ objectFit: 'cover' }} />
                ) : (
                  <img src={getImgUrl(asset.slot_key)} alt={asset.label} className="gallery-card-img" />
                )}
                
                <div className="gallery-card-footer" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div className="gallery-info" style={{ width: '100%', marginBottom: '12px' }}>
                    <span className="category-pill" style={{ padding: '2px 8px', fontSize: '10px', marginBottom: '6px' }}>{asset.section}</span>
                    {isVideo && <span className="category-pill" style={{ padding: '2px 8px', fontSize: '10px', marginBottom: '6px', marginLeft: '6px', background: '#FEF3C7', color: '#92400E' }}>VIDEO • SCROLL ANIMATION</span>}
                    <h4>{asset.label}</h4>
                    <p className="gallery-id">Key: {asset.slot_key}</p>
                  </div>
                  <button onClick={() => openModalForSiteAsset(asset)} style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600' }}>
                    <Edit2 style={{ width: '16px', height: '16px' }} /> Edit / Replace {isVideo ? 'Video' : 'Image'}
                  </button>
                </div>
              </div>
            );
          })}
          {filteredSiteAssets.length === 0 && <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: 'var(--admin-text-muted)', background: '#fff', borderRadius: '14px' }}>No site images found.</div>}
        </div>
      )}
    </div>
  );


  return (
    <div className="admin-portal-wrapper">
      <style>{`
        .admin-portal-wrapper svg { width: 20px; height: 20px; flex-shrink: 0; }
        .stat-icon-wrapper svg { width: 24px; height: 24px; }
        .drag-drop-zone svg { width: 48px; height: 48px; }
      `}</style>

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* Confirmation Modal */}
      <ConfirmModal {...confirmModal} onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })} onConfirm={executeDelete} />

      <div className="admin-dashboard-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div>
            <div className="admin-brand-header">
              <h2>Timber Tech <span>Admin</span></h2>
            </div>
            
            <div className="admin-nav-menu">
              <button onClick={() => { setActiveTab('overview'); setSearchQuery(''); setFilterCategory('All'); }} className={`admin-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}>
                <LayoutDashboard /> Dashboard Overview
              </button>
              <button onClick={() => { setActiveTab('products'); setSearchQuery(''); setFilterCategory('All'); }} className={`admin-nav-btn ${activeTab === 'products' ? 'active' : ''}`}>
                <Box /> Manage Products
              </button>
              <button onClick={() => { setActiveTab('gallery'); setSearchQuery(''); setFilterCategory('All'); }} className={`admin-nav-btn ${activeTab === 'gallery' ? 'active' : ''}`}>
                <ImageIcon /> Manage Gallery
              </button>
              <button onClick={() => { setActiveTab('site-images'); setSearchQuery(''); setFilterCategory('All'); }} className={`admin-nav-btn ${activeTab === 'site-images' ? 'active' : ''}`}>
                <Sliders /> Manage Site Images
              </button>
            </div>
          </div>

          <div className="admin-sidebar-footer">
            <a href="/" target="_blank" rel="noreferrer" className="admin-ext-link">
              <ExternalLink /> View Live Website
            </a>
            <div className="admin-user-box">
              <div className="admin-user-info">
                <p>{session?.user?.email || 'admin@timbertech.com'}</p>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button onClick={() => setIsChangePasswordOpen(true)} className="admin-logout-btn" style={{ background: '#2E2D2A' }} title="Change Password">
                  <Key style={{ width: '14px', height: '14px' }} />
                </button>
                <button onClick={handleLogout} className="admin-logout-btn" title="Logout">
                  <LogOut style={{ width: '14px', height: '14px' }} />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="admin-main-content">
          <header className="admin-topbar">
            <h1>{activeTab.replace('-', ' ')}</h1>
            <div className="system-status">
              <div className="dot"></div> System Online
            </div>
          </header>

          <div>
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'gallery' && renderGallery()}
            {activeTab === 'site-images' && renderSiteImages()}
          </div>
        </main>
      </div>

      {/* Add / Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={activeTab === 'products' ? (editingProduct ? 'Edit Product' : 'Add New Product') : activeTab === 'gallery' ? (editingGallery ? 'Edit Gallery Photo' : 'Upload Gallery Photo') : 'Edit Site Image'}
      >
        {activeTab === 'products' ? (
          <form onSubmit={handleSaveProduct}>
            <DragDropUpload onFileSelect={handleFileSelect} file={file} preview={preview} onRemove={() => { setFile(null); setPreview(null); }} />
            
            <div className="modal-form-grid">
              <div className="form-group full-width" style={{ marginBottom: 0 }}>
                <label>Title *</label>
                <div className="input-wrapper">
                  <input type="text" required value={prodTitle} onChange={e => setProdTitle(e.target.value)} placeholder="e.g. Modern Minimalist Sofa" style={{ paddingLeft: '16px' }} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Category *</label>
                <div className="input-wrapper">
                  <select required value={prodCategory} onChange={e => setProdCategory(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid #D6D1C7', borderRadius: '8px', fontSize: '15px', background: '#fff' }}>
                    {PRODUCT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Price</label>
                <div className="input-wrapper">
                  <span style={{ position: 'absolute', left: '16px', color: 'var(--admin-text-muted)', fontSize: '15px' }}>₹</span>
                  <input type="number" value={prodPrice} onChange={e => setProdPrice(e.target.value)} placeholder="0.00" style={{ paddingLeft: '32px' }} />
                </div>
              </div>

              <div className="form-group full-width" style={{ marginBottom: 0 }}>
                <label>Material</label>
                <div className="input-wrapper">
                  <input type="text" value={prodMaterial} onChange={e => setProdMaterial(e.target.value)} placeholder="e.g. Teak Wood, HDHMR" style={{ paddingLeft: '16px' }} />
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="btn-submit">
                {isSubmitting ? 'Saving...' : (editingProduct ? 'Save Changes' : 'Add Product')}
              </button>
            </div>
          </form>
        ) : activeTab === 'gallery' ? (
          <form onSubmit={handleSaveGallery}>
            <DragDropUpload onFileSelect={handleFileSelect} file={file} preview={preview} onRemove={() => { setFile(null); setPreview(null); }} />
            
            <div className="modal-form-grid">
              <div className="form-group full-width" style={{ marginBottom: 0 }}>
                <label>Title *</label>
                <div className="input-wrapper">
                  <input type="text" required value={galTitle} onChange={e => setGalTitle(e.target.value)} placeholder="e.g. Master Bedroom View" style={{ paddingLeft: '16px' }} />
                </div>
              </div>

              <div className="form-group full-width" style={{ marginBottom: 0 }}>
                <label>Category *</label>
                <div className="input-wrapper">
                  <select required value={galCategory} onChange={e => setGalCategory(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid #D6D1C7', borderRadius: '8px', fontSize: '15px', background: '#fff' }}>
                    {GALLERY_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="btn-submit">
                {isSubmitting ? 'Saving...' : (editingGallery ? 'Save Changes' : 'Upload Photo')}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSaveSiteAsset}>
            <p style={{ marginTop: 0, marginBottom: '20px', color: 'var(--admin-text-muted)' }}>
              Replacing: <strong>{editingSiteAsset?.label}</strong><br />
              <small>Slot Key: {editingSiteAsset?.slot_key}</small>
            </p>
            <DragDropUpload 
              onFileSelect={handleFileSelect} 
              file={file} 
              preview={preview} 
              onRemove={() => { setFile(null); setPreview(null); }} 
              accept={editingSiteAsset?.media_type === 'video' ? 'video/mp4,video/webm' : 'image/*'} 
            />
            
            <div className="modal-actions">
              <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting || !file} className="btn-submit">
                {isSubmitting ? 'Uploading...' : 'Upload & Replace'}
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Change Password Modal */}
      <Modal 
        isOpen={isChangePasswordOpen} 
        onClose={() => { setIsChangePasswordOpen(false); setChangePasswordError(''); setNewPassword(''); setConfirmPassword(''); }} 
        title="Change Password"
      >
        <form onSubmit={executeChangePassword}>
          {changePasswordError && (
            <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: '500' }}>
              {changePasswordError}
            </div>
          )}
          
          <div className="form-group">
            <label>New Password</label>
            <div className="input-wrapper">
              <input
                type={showNewPassword ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                style={{ paddingLeft: '16px' }}
              />
              <button
                type="button"
                className="input-icon-right"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <div className="input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                style={{ paddingLeft: '16px' }}
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

          <div className="modal-actions">
            <button type="button" onClick={() => { setIsChangePasswordOpen(false); setChangePasswordError(''); setNewPassword(''); setConfirmPassword(''); }} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-submit">
              {isSubmitting ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default AdminDashboard;
