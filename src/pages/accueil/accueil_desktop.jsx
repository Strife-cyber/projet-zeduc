import React from 'react';
import './accueil_desktop.css';
import ImageSlider from '../../components/images_slider/images_slider';
import CircleLogoComponent from '../../components/circle_logo/circle_logo';

const AccueilDesktopPage = () => {
    return (
        <div className='container-fluid' id="white-part">
            <div id='row'>
                <input type="submit" value="Se Connecter" className='button-con' />
                <input type="submit" value="S'inscrire" className='button-con' />
            </div>
            <div className='white-content'>
                <div className='contents'>
                    <h1 className='miam'>Un bon miam miam!</h1>
                    <p className='catch'>Zeduce space : le plaisir de livrer un bon <br></br>
                    miam miam a chaque bouchée</p>
                    <ImageSlider/>
                </div>
            </div>
            <CircleLogoComponent/>
        </div>
    );
}

export default AccueilDesktopPage;
