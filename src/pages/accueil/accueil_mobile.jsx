import React from "react";
import CircleLogoComponent from "../../components/circle_logo/circle_logo";
import './accueil_mobile.css';

import image1 from '../../assets/img-1.jpg';
import image2 from '../../assets/img-2.jpg';
import image3 from '../../assets/img-3.jpg';
import image4 from '../../assets/img-4.jpg';
import image5 from '../../assets/img-5.jpg';
import image6 from '../../assets/img-6.jpg';

const AccueilMobilePage = () => {
    const images = [
        { src: image1, alt: "Éru savoureux", description: "Un plat traditionnel débordant de saveurs, l’Éru est accompagné de waterleaf, de viande tendre et bien épicée, avec du foufou à côté." },
        { src: image2, alt: "Pilé bien garnie", description: "Du foufou pilé moelleux, servi avec une sauce généreuse, pleine de viande fumée et de poissons bien assaisonnés, un régal pour les papilles." },
        { src: image3, alt: "Poulet DG appétissant", description: "Le Poulet DG, une symphonie de légumes frais, de plantains mûrs et de poulet mariné à la perfection, le tout réuni dans une explosion de goûts." },
        { src: image4, alt: "Poulet pané croustillant", description: "Un poulet pané doré à souhait, croustillant à l’extérieur et juteux à l’intérieur, parfait pour les amateurs de saveurs croquantes." },
        { src: image5, alt: "Rôti de poulet juteux", description: "Un rôti de poulet rôti lentement pour obtenir une chair tendre et juteuse, accompagné d'herbes aromatiques et d’une sauce onctueuse." },
        { src: image6, alt: "Bolognaise et boulettes", description: "Des pâtes bolognaises servies avec de délicieuses boulettes de viande, nappées d'une sauce tomate parfumée aux herbes fraîches." }
    ];

    return (
        <>
            <div className="display-mobile">
                <CircleLogoComponent size="150px" direction="top" />
                <div id='row-mobile'>
                    <input type="submit" value="Se Connecter" className='button-mob' />
                    <input type="submit" value="S'inscrire" className='button-mob' />
                </div>
            </div>
            <div className="mobile-content">
                <h1>Un bon miam miam!</h1>
                <p className="slogan">Zeduc: Le plaisir de bien manger</p>
                <h2>Nos Plats</h2>
            </div>
            <div className="menu">
                {images.map((item, index) => (
                    <div key={index} className={`menu-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                        <img src={item.src} alt={item.alt} className="menu-image" />
                        <p className="menu-description">{item.description}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default AccueilMobilePage;
