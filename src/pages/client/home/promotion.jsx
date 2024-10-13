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
                    <li key={index}>
                        <div className="promotion-container">
                            <strong>Description:</strong> {c.description} <br />
                            <strong>Date de début:</strong> {c.date_debut} <br />
                            <strong>Date de fin:</strong> {c.date_fin}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PromotionPage;
