import React from "react";
import HeroSection from "../components/HeroSection.jsx";
import SectionWithBackground from "../components/SectionWithBackground.jsx";
import ProductsSection from "../components/ProductsSection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import SustanabilitySection from "../components/SustanabilitySection.jsx";
import JourneySection from "../components/JourneySection.jsx";
import TestimonialSection from "../components/TestimonialSection.jsx";
import WhyChooseUsSection from "../components/WhyChooseUsSection.jsx";

export const Home = () => {
    return (
        <>
            <HeroSection />
            <JourneySection />
            <ProductsSection />
            <SustanabilitySection />
            <WhyChooseUsSection />
            {/* <section id="convert-fiat">
                <div className="why_choose-us-section">
                <div className="why_choose-us-inner site_flex site_flex-column site_flex_center_vertical section_inner-space">
                    <div className="why_choose-us-top">
        <h2 className="title_orange">Why Choose Us?</h2>
                    </div>
                    <div className="why_choose-us-bottom">
                        <div className="why_choose-us-bottom-inner">
                            <div className="why_choose-us-label">
                                <p>Advanced R&D for innovative dye solutions</p>
                            </div>
                            <div className="why_choose-us-label">
                                <p>Stringent quality control and global compliance</p>
                            </div>
                            <div className="why_choose-us-label">
                                <p>Tailor-made color solutions for unique applications</p>
                            </div>
                            <div className="why_choose-us-label">
                                <p>Sustainable and environmentally responsible practices</p>
                            </div>
                            <div className="why_choose-us-label">
                                <p>Reliable supply chain and global distribution network</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        
        <InteractiveBalls />
            </section> */}
            <SectionWithBackground />
            <TestimonialSection />
            
            <ContactSection />   
        </>
    );
}
export default Home;