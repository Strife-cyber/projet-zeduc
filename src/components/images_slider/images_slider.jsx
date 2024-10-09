import React, { useState } from 'react';
import image1 from '../../assets/img-1.jpg';
import image2 from '../../assets/img-2.jpg';
import image3 from '../../assets/img-3.jpg';
import image4 from '../../assets/img-4.jpg';
import image5 from '../../assets/img-5.jpg';
import image6 from '../../assets/img-6.jpg';
import image7 from '../../assets/img-7.jpg';
import './images_slider.css';

const ImageSlider = ({imageWidth = '300px', imageHeight = '200px' }) => {
  const images = [
    image1, image2, image3, image4, image5, image6, image7
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider">
      <button className="left-arrow" onClick={prevSlide}>
        ❮
      </button>
      <div className="image-container" style={{ '--image-width': imageWidth, '--image-height': imageHeight }}>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      </div>
      <button className="right-arrow" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

export default ImageSlider;
