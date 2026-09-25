export const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/rp2vrlfe/image/upload/f_auto,q_auto/";

// Helper function jo kisi bhi image ka naam (Public ID) lega aur final link dega
export const getImgUrl = (publicId) => {
  return `${CLOUDINARY_BASE_URL}${publicId}`;
};