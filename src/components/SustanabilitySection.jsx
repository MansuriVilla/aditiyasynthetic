import React from "react";
import { useEffect } from "react";
import { gsap } from "gsap";





export const SustanabilitySection = () => {
    useEffect(() => {
        
        gsap.fromTo(
          ".animate_cover-image", 
          {
            transform: "translate(0%, 10%) rotate(-2deg) scale(0.9)", 
          },
          {
            transform: "translate(0px)", 
            scrollTrigger: {
              trigger: ".animate_cover-image", 
              start: "top 80%", 
              end: "top 20%", 
              scrub: true,
              markers: false, 
            },
          }
        );
      }, []);
    return (
        <section className="sustainability-section background-white">
        <div className="sustainability-inner section_inner-space site_flex site_flex-column site_flex_center_vertical">
            <div className="sustainability-top section-text_area">
                <h2 className="sustainability-title">Sustainability</h2>
                <p className="sustainability-subtitle">Eco-Friendly & Responsible Manufacturing</p>
                <p className="sustainability-description extra_small">At Aditya Synthetic, we prioritize sustainability by using energy-efficient processes, non-toxic materials, and waste reduction techniques. Our dyes comply with international environmental regulations to support a greener future.</p>
            </div>
            <div className="sustainability-center image-container">
                <img src="/assets/sustainability-image.webp" alt="Sustainability Image" className="animate_cover-image sustainability-image" />
            </div>
            <div className="sustainability-bottom section-text_area">
                <h2 className="sustainability-title">Quality Assurance</h2>
                
                <p className="sustainability-description extra_small">We uphold the highest standards of quality through rigorous testing and research. Our in-house labs ensure consistency, stability, and compliance with industry regulations.</p>
            </div>
        </div>
    </section>
    );
}
export default SustanabilitySection;