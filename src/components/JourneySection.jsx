import React from "react";
import { useEffect } from "react";
import { gsap } from "gsap";


export const JourneySection = () => {

    

    return (
    <section className="section_with_background journey_section">
        <div className="section_with_background-inner site_flex site_flex-column background-orange">
            <div className="section_with_background-overlay journey_section_overlay section_inner-space">
                <div className="section_with_background-overlay-inner site_flex site_flex-column">
                    <div className="journey_section parallex_img-left">
                        <img src="/assets/journey-left-img.webp" alt="Journey Section Image" className="section_with_background-image" />
                    </div>
                    <div className="section_with_background-center">
                        <h2 className="section_with_background-title">A thirty year journey Into the art of Manufacturing colors</h2>
                        <p className="section_with_background-description">Aditya Synthetic is a family owned business manufacturing reactive dyes. What started off as a small unit in Ahmedabad, has today spread its wings across many countries over multiple continents. Armed with a state-of-the-art manufacturing unit, an advanced RnD department, two high tech labs and some of the most experienced personnel in the industry, we have consistently been one of the best export houses in the country. A stickler for quality, considerate for the environment and conscious of the ever-changing demands of the customer, we have been the first choice of all sizes of clients.</p>
                    </div>
                    <div className="journey_section parallex_img-right">
                        <img src="/assets/journey-right-img.webp" alt="Journey Section Image" className="section_with_background-image" />
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}
export default JourneySection;