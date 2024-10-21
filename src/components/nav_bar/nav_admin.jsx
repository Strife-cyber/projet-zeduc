import React, { useState } from "react";
import './nav_employer.css';
import logo from '../../assets/zeduc.jpg';

const NavAdminComponent = ({switched}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const switcher = (value) => {
        switched(value);
        setIsMenuOpen(false);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    return (
        <nav className="nav-employer">
            <div className="nav-container">
                <a className="nav-logo" href="#">
                    <img src={logo} alt="ZeDuc Logo" className="zeduc-logo"/>
                </a>
                <i className="fas fa-burger menu-toggle" onClick={toggleMenu}></i>
                <ul className="menu-content desktop-menu">
                    <li className="men-item">
                        <a className="menu-link" href="#" onClick={() => switcher('commandes')}>Commandes</a>
                    </li>
                    <li className="men-item">
                        <a className="menu-link" href="#" onClick={() => switcher('menu')}>Menu d'jour</a>
                    </li>
                    <li className="men-item">
                        <a className="menu-link" href="#" onClick={() => switcher('stats')}>Statistique</a>
                    </li>
                    <li className="men-item">
                        <a className="menu-link" href="#" onClick={() => switcher('reclam')}>Reclamation</a>
                    </li>
                    <li className="men-item">
                        <a className="menu-link" href="#" onClick={() => switcher('employer')}>Gestion Employer</a>
                    </li>
                    <li className="men-item">
                        <a className="menu-link" href="#" onClick={() => switcher('evenements')}>Gestion Evenements</a>
                    </li>
                </ul>

                <div className={`menu-modal ${isMenuOpen ? 'open' : ''}`}>
                    <i className="fas fa-times close-btn" onClick={closeMenu}></i>
                    <ul className="menu-content mobile-menu">
                        <li className="men-item">
                            <a className="menu-link" href="#" onClick={() => switcher('commandes')}>Commandes</a>
                        </li>
                        <li className="men-item">
                            <a className="menu-link" href="#" onClick={() => switcher('menu')}>Menu d'jour</a>
                        </li>
                        <li className="men-item">
                            <a className="menu-link" href="#" onClick={() => switcher('stats')}>Statistique</a>
                        </li>
                        <li className="men-item">
                            <a className="menu-link" href="#" onClick={() => switcher('reclam')}>Réclamation</a>
                        </li>
                        <li className='men-item'>
                            <a className='menu-link' href="#" onClick={() => switcher('employer')}>Gestion Employer</a>
                        </li>
                        <li className="men-item">
                            <a className="menu-link" href="#" onClick={() => switcher('evenements')}>Gestion Evenements</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavAdminComponent;