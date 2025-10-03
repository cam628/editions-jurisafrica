// Cloudinary Configuration for File Uploads
// Free plan: 25GB storage, unlimited uploads

// Get your credentials from: https://cloudinary.com
// 1. Sign up for free account
// 2. Go to Dashboard
// 3. Copy your Cloud Name and Upload Preset

export const CLOUDINARY_CONFIG = {
  // Your Cloud Name (from Dashboard)
  CLOUD_NAME: 'dkhdkrw4l',
  
  // Upload Preset (you'll create this in settings)
  UPLOAD_PRESET: 'form Juris',
  
  // API URL (don't change this)
  UPLOAD_URL: 'https://api.cloudinary.com/v1_1'
};

// Example: CLOUD_NAME = 'jurisafrica'
// Example: UPLOAD_PRESET = 'article_submissions'

/**
 * Upload a file to Cloudinary
 * @param file - The file to upload
 * @returns Promise with the secure URL of the uploaded file
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.UPLOAD_PRESET);
  
  const response = await fetch(
    `${CLOUDINARY_CONFIG.UPLOAD_URL}/${CLOUDINARY_CONFIG.CLOUD_NAME}/auto/upload`,
    {
      method: 'POST',
      body: formData
    }
  );
  
  if (!response.ok) {
    throw new Error('Échec de l\'upload du fichier');
  }
  
  const data = await response.json();
  return data.secure_url;
}

