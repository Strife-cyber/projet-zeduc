import { useEffect, useState } from "react";
import usePromotion from "../../../utilities/client/promotion";
import './home_mobile.css';
import './home_desktop.css';
import './promotion.css';

const PromotionPage = ({onOpen}) => {
    const { fetchPromotion } = usePromotion();
    const [promotion, setPromotion] = useState([]); // Initialize with an empty array
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000); // Initialize based on screen size

    const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 1000);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPromotion();

            if (Array.isArray(data)) {
                setPromotion(data);
            }
        };

        fetchData();
        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []); // Added fetchPromotion as a dependency

    return (
        <div className={isMobile ? 'cards-mobile' : 'cards'} style={isMobile ? {} : {width: '100%'}}>
            {!isMobile ? (
                <div className="text-box">
                    <h3>Les promotions du moment</h3>
                </div>
            ) : (
                <div className="text-box-mobile">
                    <h3 className="label-mobile">Menu du Jour</h3>
                    {/* Open menu icon */}
                    <i className="fas fa-hamburger" id="ham" onClick={onOpen}></i>
                </div>
            )}
            <ul className="all-promotions">
                {promotion.map((c, index) => (
                    <li key={index} style={{listStyle: 'none'}}>
                        <div className="promotion-container">
                            <h1 className="text-center" style={{margin: '20px', fontSize: '20px'}}>{c.description} </h1>
                            <div style={{display: "flex", justifyContent: 'space-between'}}>
                                <div style={{fontSize: '10px', fontFamily: 'Montaga'}}>
                                    <strong>Date de début:</strong> {c.date_debut} <br />
                                </div>
                                <div style={{fontSize: '10px', fontFamily: 'Montaga'}}>
                                    <strong>Date de fin:</strong> {c.date_fin}
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PromotionPage;
