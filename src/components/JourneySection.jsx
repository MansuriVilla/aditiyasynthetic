import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const JourneySection = () => {
    const sectionRef = useRef(null);
    const leftImageRef = useRef(null);
    const rightImageRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        const leftAnim = gsap.to(leftImageRef.current, {
            y: -80,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom top",
                scrub: 0.1,
            },
        });

        const rightAnim = gsap.to(rightImageRef.current, {
            y: -80,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom top",
                scrub: 0.1,
            },
        });

        return () => {
            leftAnim.scrollTrigger?.kill();
            rightAnim.scrollTrigger?.kill();
            leftAnim.kill();
            rightAnim.kill();
        };
    }, []);

    return (
        <section ref={sectionRef} className=" section_with_background journey_section">
            <div className="section_with_background-inner site_flex site_flex-column background-orange">
                <div className="section_with_background-overlay journey_section_overlay section_inner-space">
                    <div className="section_with_background-overlay-inner site_flex site_flex-column">
                        <div className="journey_section parallex_img-left">
                            <img
                                ref={leftImageRef}
                                src="/assets/journey-left-img.webp"
                                alt="Journey Left Image"
                                className="section_with_background-image parallex_img"
                            />
                        </div>
                        <div className="section_with_background-center">
                            <h2 className="section_with_background-title">
                                A thirty year journey Into the art of Manufacturing colors
                            </h2>
                            <p className="section_with_background-description">
                                Aditya Synthetic is a family owned business manufacturing reactive dyes. What started off as a small unit in Ahmedabad, has today spread its wings across many countries over multiple continents. Armed with a state-of-the-art manufacturing unit, an advanced RnD department, two high tech labs and some of the most experienced personnel in the industry, we have consistently been one of the best export houses in the country. A stickler for quality, considerate for the environment and conscious of the ever-changing demands of the customer, we have been the first choice of all sizes of clients.
                            </p>
                        </div>
                        <div className="journey_section parallex_img-right">
                            <img
                                ref={rightImageRef}
                                src="/assets/journey-right-img.webp"
                                alt="Journey Right Image"
                                className="section_with_background-image parallex_img"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JourneySection;
