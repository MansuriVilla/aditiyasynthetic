import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


import InteractiveBalls from "./InteractiveBalls"; 

const WhyChooseUsSection = () => {
  const sectionRef = useRef(null);
  const labelsContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const labels = labelsContainerRef.current.querySelectorAll(".why_choose-us-label");

      
      gsap.from(labels, {
        scrollTrigger: {
          trigger: labelsContainerRef.current,
          start: "top 80%", 
          end: "bottom 90%", 
          toggleActions: "play none none none", 
          markers: false, 
          scrub: true, 
        },
        opacity: 0,
        y: 30, 
        duration: 0.6,
        ease: "linear",
        stagger: 0.2, 
      });
    }, sectionRef);

    return () => {
      ctx.revert(); 
    };
  }, []);

  return (
    <section id="convert-fiat" ref={sectionRef}>
      <div className="why_choose-us-section">
        <div className="why_choose-us-inner site_flex site_flex-column site_flex_center_vertical section_inner-space">
          <div className="why_choose-us-top">
            <h2 className="title_orange">Why Choose Us?</h2>
          </div>
          <div className="why_choose-us-bottom">
            <div className="why_choose-us-bottom-inner" ref={labelsContainerRef}>
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
    </section>
  );
};

export default WhyChooseUsSection;