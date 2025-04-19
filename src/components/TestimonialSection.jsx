import React, { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const TestimonialSection = () => {

const sectionRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        if (window.innerWidth < 1025) return;
        gsap.registerPlugin(ScrollTrigger);
      
        const cards = document.querySelectorAll(".container .card");
        const firstCard = cards[0];
        const otherCards = Array.from(cards).slice(1);
      
        // Set initial positions
        gsap.set(firstCard, { y: 0, scale: 1, zIndex: cards.length });
        otherCards.forEach((card, i) => {
          gsap.set(card, {
            y: (i + 1) * 20,
            scale: 1 - (i + 1) * 0.05,
            zIndex: cards.length - (i + 1),
          });
        });
      
        // Calculate final Y positions
        const gap = 35;
        const finalPositions = [];
        let runningOffset = firstCard.offsetHeight;
      
        otherCards.forEach((card, i) => {
          finalPositions[i] = runningOffset + gap;
          runningOffset += card.offsetHeight + gap;
        });
      
        // Animate all cards together inside one ScrollTrigger
        gsap.timeline({
          scrollTrigger: {
            trigger: ".container",
            start: "top 55%",
            end: "+=600",
            scrub: true,
          },
        }).to(otherCards, {
          y: (i, target) => finalPositions[i],
          scale: 1,
          stagger: 0.1,
          ease: "linear",
        });


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

      
    return(

        <section ref={sectionRef} className="section_with_background Testimonial_section">
        <div className="section_with_background-inner site_flex site_flex-column">
            <div className="section_with_background-image-holder hero_background site_flex">
                <img ref={imageRef} src="/assets/testimonial-bg-2.webp" alt="Hero Section Image" className="section_with_background-image" />   
            </div>
            <div className="section_with_background-overlay section_inner-space">
                <div className="section_with_background-overlay-inner testimonial_overlay site_flex site_flex-column">
                    <div className="section_with_background-top">
                        <h2 className="section_with_background-title">Hear it from our clients</h2>
                    </div>
                    <div className="container">
                        <div className="card" id="card1">
                            
                            <p className="extra_small" >Aditya Synthetic is a family owned business manufacturing reactive dyes. What started off as a small unit in Ahmedabad, has today spread its wings across many countries over multiple continents. </p>
                            <span className="site_border"></span>

                            <div className="profile">John Doe</div>
                        </div>
                        <div className="card">
                            
                            <p className="extra_small" >Aditya Synthetic is a family owned business manufacturing reactive dyes. What started off as a small unit in Ahmedabad, has today spread its wings across many countries over multiple continents. </p>
                            
                            <span className="site_border"></span>

                            <div className="profile">John Doe</div>
                        </div>
                        <div className="card">
                            
                            <p className="extra_small" >Aditya Synthetic is a family owned business manufacturing reactive dyes. What started off as a small unit in Ahmedabad, has today spread its wings across many countries over multiple continents. </p>
                            
                            <span className="site_border"></span>

                            <div className="profile">John Doe</div>
                        </div>
                        <div className="card">
                            
                            <p className="extra_small" >Aditya Synthetic is a family owned business manufacturing reactive dyes. What started off as a small unit in Ahmedabad, has today spread its wings across many countries over multiple continents. </p>
                            
                            <span className="site_border"></span>

                            <div className="profile">John Doe</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}
export default TestimonialSection;

