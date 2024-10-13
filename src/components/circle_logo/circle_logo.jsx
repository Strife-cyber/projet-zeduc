import React from "react";
import zeduc from '../../assets/zeduc.jpg';
import './circle_logo.css';

const CircleLogoComponent = ({ size = '750px', bgColor = 'black', direction = 'left' }) => {
    const isLeft = direction === 'left';
    const width = isLeft ? `${parseInt(size) / 2}px` : size;
    const height = isLeft ? size : `${parseInt(size) / 2}px`;
    const borderRadius = isLeft
        ? `${parseInt(size) / 2}px 0 0 ${parseInt(size) / 2}px`
        : `${parseInt(size) / 2}px ${parseInt(size) / 2}px 0 0`;
    const imgWidth = isLeft ? '60%' : '40%';

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
            animation: 'slideIn 4s forwards', // Animation for entry
        },
        image: {
            width: imgWidth,
            height: 'auto',
        },
    };

    return (
        <div className="logo-circle" style={styles.semiCircle}>
            <img
                src={zeduc}
                alt="Logo Zeduc"
                style={styles.image}
                className="logo-image"
            />
        </div>
    );
};

export default CircleLogoComponent;
