import React, { useState } from 'react';
import image1 from '../../assets/img-1.jpg';
import image2 from '../../assets/img-2.jpg';
import image3 from '../../assets/img-3.jpg';
import image4 from '../../assets/img-4.jpg';
import image5 from '../../assets/img-5.jpg';
import image6 from '../../assets/img-6.jpg';
import image7 from '../../assets/img-7.jpg';
import 'C:/Users/RASTOM/Desktop/zeduc/projet-zeduc/src/App.css'; // pour le style

const ImageSlider = () => {
  const images = [
    image1, image2, image3, image4, image5, image6, image7
    ];

  // Index de l'image actuellement affichée
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonction pour passer à l'image suivante
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Fonction pour revenir à l'image précédente
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
      <div className="image-container">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      </div>
      <button className="right-arrow" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

export default ImageSlider;
