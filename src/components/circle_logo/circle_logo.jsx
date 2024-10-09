import React from "react";
import zeduc from '../../assets/zeduc.jpg';
import './circle_logo.css';

const CircleLogoComponent = ({ size = '750px', bgColor = 'black', direction = 'left' }) => {
    // Définir la largeur et la hauteur en fonction de la direction
    const isLeft = direction === 'left';
    const width = isLeft ? `${parseInt(size) / 2}px` : size; // Largeur pour direction 'left'
    const height = isLeft ? size : `${parseInt(size) / 2}px`; // Hauteur pour direction 'left'
    const borderRadius = isLeft
        ? `${parseInt(size) / 2}px 0 0 ${parseInt(size) / 2}px` // Bord arrondi à droite si 'left'
        : `${parseInt(size) / 2}px ${parseInt(size) / 2}px 0 0`; // Bord arrondi en haut si 'top'
    const imgWidth = isLeft ? '60%' : '40%';

    // Définir un objet de styles
    const styles = {
        semiCircle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: width,
            height: height,
            borderRadius: borderRadius,
            backgroundColor: bgColor,
            overflow: 'hidden',
            position: 'relative',
            animation: 'slideIn 4s forwards', // Animation pour faire apparaître le cercle
        },
        image: {
            width: imgWidth,
            height: 'auto',
            animation: 'spin 2s linear infinite', // Animation de rotation pour l'image
            transition: 'transform 0.3s ease', // Transition pour l'animation de l'image
        },
    };

    return (
        <div className="logo-circle" style={styles.semiCircle}>
            <img 
                src={zeduc} 
                alt="Logo Zeduc" 
                style={styles.image} 
                className="logo-image" // Ajoutez une classe pour le ciblage CSS
            />
        </div>
    );
}

export default CircleLogoComponent;
