import React from "react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const TestimonialSection = () => {

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const cards = document.querySelectorAll(".container .card");
        const firstCard = document.getElementById("card1");
        const otherCards = Array.from(cards).filter((card) => card !== firstCard);

        gsap.set(firstCard, { y: 0, scale: 1, zIndex: cards.length });
        otherCards.forEach((card, i) => {
          gsap.set(card, { y: (i + 1) * 20, scale: 1 - (i + 1) * 0.05, zIndex: cards.length - (i + 1) });
        });

        const finalPositions = [];
        const gap = 35;
        let runningOffset = firstCard.offsetHeight;
        otherCards.forEach((card, i) => {
          finalPositions[i] = runningOffset + gap;
          runningOffset += card.offsetHeight + gap;
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".container",
            start: "top 55%",
            end: "+=600",
            scrub: true,
          },
        });

        let cumulativeShift = 0;
        otherCards.forEach((card, i) => {
          const initialY = (i + 1) * 10 + cumulativeShift;
          const targetY = finalPositions[i];
          const delta = targetY - initialY;

          tl.to(otherCards.slice(i), { y: `+=${delta}`, scale: 1, ease: "power2.out", duration: 0.5 }, "+=0.15");

          cumulativeShift += delta;
        });
        }
        , []);
        
    // useEffect(() => {
    //     gsap.registerPlugin(ScrollTrigger);
      
    //     const cards = document.querySelectorAll(".container .card");
    //     const firstCard = document.getElementById("card1");
        
    //     const otherCards = Array.from(cards).filter((card) => card !== firstCard);
      
        
    //     gsap.set(firstCard, { y: 0, scale: 1, zIndex: cards.length });
    //     otherCards.forEach((card, i) => {
    //       gsap.set(card, {
    //         y: (i + 1) * 20,
    //         scale: 1 - (i + 1) * 0.05,
    //         zIndex: cards.length - (i + 1),
    //       });
    //     });
      
        
    //     const finalPositions = [];
    //     const gap = 40;
    //     let runningOffset = firstCard.offsetHeight;
    //     otherCards.forEach((card, i) => {
    //       finalPositions[i] = runningOffset + gap;
    //       runningOffset += card.offsetHeight + gap;
    //     });
      
        
    //     const tl = gsap.timeline({
    //       scrollTrigger: {
    //         trigger: ".container",
    //         start: "top 55%",
    //         end: "+=600",
    //         scrub: true,
    //       },
    //     });
      
    //     let cumulativeShift = 0;
    //     otherCards.forEach((card, i) => {
          
    //       const initialY = (i + 1) * 20 + cumulativeShift;
    //       const targetY = finalPositions[i];
    //       const deltaY = targetY - initialY;
      
          
    //       tl.to(otherCards.slice(i), {
    //         y: `+=${deltaY}`,
    //         ease: "power2.out",
    //         duration: 0.5,
    //       }, "+=0.15");
      
          
    //       gsap.to(card, {
    //         scrollTrigger: {
    //           trigger: card,
              
    //           end: "bottom center",
    //           scrub: true,
    //         },
    //         scale: 1,
    //         ease: "power2.out",
    //       });
      
    //       cumulativeShift += deltaY; 
    //     });
    //   }, []);
        

    return(

        <section className="section_with_background Testimonial_section">
        <div className="section_with_background-inner site_flex site_flex-column">
            <div className="section_with_background-image hero_background site_flex">
                <img src="https://www.jeton.com/_ipx/f_webp&q_80&w_3400/cms/b7c674ecd0ee69b2eca20443cac6272c550ed396-4000x2667.jpg" alt="Hero Section Image" className="section_with_background-image" />   
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

