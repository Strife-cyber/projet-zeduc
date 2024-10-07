import React from "react";
import zeduc from '../../assets/zeduc.jpg';

const CircleLogoComponent = ({ size = '500px', bgColor = 'black', top = '0px', left = '0px', direction = 'top' }) => {
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
            position: 'absolute',
            top: top,
            left: left,
        },
        image: {
            width: imgWidth,
            height: 'auto',
        },
    };

    return (
        <div style={styles.semiCircle}>
            <img src={zeduc} alt="Logo Zeduc" style={styles.image} />
        </div>
    );
}

export default CircleLogoComponent;
