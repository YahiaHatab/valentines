import React from 'react';
import './ImageGallery.css';

interface ImageGalleryProps {
  images: string[]; // Array of image URLs
  isPulled: boolean; // New prop to control visibility/animation
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, isPulled }) => {
  return (
    <div className={`image-gallery-container ${isPulled ? 'pulled' : ''}`}>
      <h2>Our Precious Memories</h2>
      <div className="gallery-grid">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="gallery-item">
              <img src={image} alt={`memory-${index}`} />
            </div>
          ))
        ) : (
          <p>No images to display yet. Please add your photos!</p>
        )}
      </div>
    </div>
  );
  };

export default ImageGallery;