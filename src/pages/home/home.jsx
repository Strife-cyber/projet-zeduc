import { useEffect, useState } from "react"
import HomeMobilePage from "./home_mobile";
import HomeDesktopPage from "./home_desktop";
import FooterComponent from "../../components/footer/footer";

const HomePage = () => {
    const [isMobile, setIsMobile] = useState(false);

    const checkScreenSize = () => {
        if(window.innerWidth <= 1000){
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }

    useEffect(() => {
        checkScreenSize();

        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize)
        }
    }, []);

    return (
        <>
            {isMobile? <HomeMobilePage/> : <HomeDesktopPage/>}
            <FooterComponent/>
        </>
    )
}

export default HomePage;