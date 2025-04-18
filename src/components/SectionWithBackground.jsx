import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const SectionWithBackground = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const image = imageRef.current;
        const section = sectionRef.current;

        const anim = gsap.to(image, {
            y: -80,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top center",  
                end: "bottom top",    
                scrub: 1.2,
            }
        });

        return () => {
            anim.scrollTrigger?.kill();
            anim.kill();
        };
    }, []);

    return (
        <section ref={sectionRef} className="section_with_background our_philosophy-section">
            <div className="section_with_background-inner site_flex site_flex-column">
                <div className="section_with_background-image-holder hero_background site_flex">
                    <img
                        ref={imageRef}
                        src="/assets/our-philosophy.webp"
                        alt="Hero Section Image"
                        className="section_with_background-image"
                    />
                </div>
                <div className="section_with_background-overlay">
                    <div className="section_with_background-overlay-inner site_flex site_flex-column">
                        <div className="section_with_background-center">
                            <h2 className="section_with_background-title">Our Philosophy</h2>
                            <p className="section_with_background-description">
                                Aditya Synthetic is a family owned business manufacturing reactive dyes.
                                What started off as a small unit in Ahmedabad, has today spread its wings
                                across many countries over multiple continents. Armed with a state-of-the-art
                                manufacturing unit, an advanced RnD department, two high tech labs and
                                some of the most experienced personnel in the industry, we have consistently
                                been one of the best export houses in the country. A stickler for quality,
                                considerate for the environment and conscious of the ever-changing demands
                                of the customer, we have been the first choice of all sizes of clients.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionWithBackground;
