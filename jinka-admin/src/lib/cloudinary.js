// Cloudinary configuration
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'do8jotiuq';
export const CLOUDINARY_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`;

// Helper function to generate Cloudinary image URLs
export const getCloudinaryImageUrl = (publicId, options = {}) => {
    const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    const transformations = [];
    
    if (options.width) transformations.push(`w_${options.width}`);
    if (options.height) transformations.push(`h_${options.height}`);
    if (options.crop) transformations.push(`c_${options.crop}`);
    if (options.quality) transformations.push(`q_${options.quality}`);
    if (options.format) transformations.push(`f_${options.format}`);
    
    const transformationString = transformations.length > 0 ? transformations.join(',') : '';
    return `${baseUrl}${transformationString ? '/' + transformationString : ''}/${publicId}`;
};

// Helper function to generate Cloudinary video URLs
export const getCloudinaryVideoUrl = (publicId, options = {}) => {
    const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload`;
    const transformations = [];
    
    if (options.width) transformations.push(`w_${options.width}`);
    if (options.height) transformations.push(`h_${options.height}`);
    if (options.quality) transformations.push(`q_${options.quality}`);
    
    const transformationString = transformations.length > 0 ? transformations.join(',') : '';
    return `${baseUrl}${transformationString ? '/' + transformationString : ''}/${publicId}`;
};

export default {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_URL,
    getCloudinaryImageUrl,
    getCloudinaryVideoUrl
};
