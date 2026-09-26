export const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/rp2vrlfe/image/upload/f_auto,q_auto/";

let siteAssetsMap = {};

export const loadSiteAssets = async (supabase) => {
  try {
    const { data, error } = await supabase.from('site_assets').select('slot_key, cloudinary_public_id, updated_at');
    if (data && !error) {
      const newMap = {};
      data.forEach(item => {
        if (item.cloudinary_public_id) {
          newMap[item.slot_key] = item;
        }
      });
      siteAssetsMap = newMap;
    }
  } catch (err) {
    console.error("Failed to load site assets map:", err);
  }
};

export const getImgUrl = (publicId) => {
  if (siteAssetsMap[publicId]) {
    const asset = siteAssetsMap[publicId];
    const version = asset.updated_at ? new Date(asset.updated_at).getTime() : Date.now();
    return `${CLOUDINARY_BASE_URL}v${version}/${asset.cloudinary_public_id}`;
  }
  return `${CLOUDINARY_BASE_URL}${publicId}`;
};

export const getVideoUrl = (publicId) => {
  if (!publicId) return null;
  const CLOUDINARY_VIDEO_BASE = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload/vc_h264:baseline,ac_none,w_1280,q_auto:good,f_mp4/`;
  
  let resolvedPublicId = publicId;
  let version = "";

  if (siteAssetsMap[publicId]) {
    const asset = siteAssetsMap[publicId];
    resolvedPublicId = asset.cloudinary_public_id;
    if (asset.updated_at) {
      version = `v${new Date(asset.updated_at).getTime()}/`;
    }
  } else if (publicId === "ui-hero-video") {
    // If we're looking for the hero video but it hasn't been mapped in DB yet,
    // just return null so the UI can gracefully fallback to the image
    return null;
  }

  // resolvedPublicId often already includes "timber-tech-interio/..." folder path from Cloudinary
  return `${CLOUDINARY_VIDEO_BASE}${version}${resolvedPublicId}`;
};

export const uploadToCloudinary = async (file, prefix, folder, tag, resourceType = "auto") => {
  try {
    const timestamp = Date.now().toString().slice(-6);
    const cleanName = file.name.split('.')[0].toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const finalFilename = `${prefix}-${cleanName}-${timestamp}`;
    
    const renamedFile = new File([file], finalFilename, { type: file.type });
    
    const formData = new FormData();
    formData.append('file', renamedFile);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', `timber-tech-interio/${folder}`);
    formData.append('tags', tag);
    
    const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Upload failed');
    }
    return data.public_id;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};