import React from "react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const IndustriesSection = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    function cardOverlapping() {
      if (window.innerWidth > 768) {
        let cards = document.querySelectorAll(".card_overlay-item");
        cards.forEach((card, index) => {
          card.style.zIndex = index + 1;
        });
        let timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".pinned-section",
            start: "top top",
            end: "+=" + 3 * window.innerHeight,
            scrub: 0.1,
            pin: true,
            markers: false,
          },
        });
        // Start the first card at 0px
        timeline.fromTo(
          cards[0],
          { y: 0, scale: 1 },
          { y: 0, scale: 1, duration: 1, ease: "linear" },
          "card0"
        );
        cards.forEach((card, index) => {
          if (index > 0) {
            timeline.addLabel(`card${index}`);
            timeline.fromTo(
              card,
              { y: window.innerHeight, scale: 1 },
              { y: 0, scale: 1, duration: 1, ease: "linear" },
              `card${index}`
            );
            for (let n = 0; n < index; n++) {
              let i = index - n;
              let scaleValue = 1 - 0.07 * i;
              let yOffset = -50 - 50 * (i - 1);
              scaleValue = Math.max(scaleValue, 0.4);
              timeline.to(
                cards[n],
                {
                  scale: scaleValue,
                  y: yOffset,
                  duration: 1,
                  ease: "power1.out",
                },
                `card${index}`
              );
            }
          }
        });
      }
    }
    cardOverlapping();
    window.addEventListener("resize", function () {
      cardOverlapping();
    });
  });
  return (
    <div className="industries-section section_inner-space">
      <div className="industries-section_inner">
        <div className="industries-section_title">
            <h2 className="title_orange">Industries We Serve</h2>
        </div>
        <div className="pinned-section">
          <div className="cards-container">
            <div className="card_overlay-item">
              <div className="card_overlay desktop-image">
                  <img src="/assets/cloths-pices.webp"  alt="" />
                </div>
                <h2>Textiles & Apparel</h2>
            </div>
            <div className="card_overlay-item">
              <div className="card_overlay desktop-image">
                  <img src="/assets/stones.webp"  alt="" />
                </div>
                <h2>Plastics & Polymers</h2>
            </div>
            <div className="card_overlay-item">
              <div className="card_overlay desktop-image">
                  <img src="/assets/bukets.webp"  alt="" />
                </div>
                <h2>Paints, Inks & Coatings</h2>
            </div>
            <div className="card_overlay-item">
              <div className="card_overlay desktop-image">
                  <img src="/assets/stones.webp"  alt="" />
                </div>
                <h2>Cosmetics & Personal Care</h2>
            </div>
            <div className="card_overlay-item">
              <div className="card_overlay desktop-image">
                  <img src="/assets/cloths-pices.webp"  alt="" />
                </div>
                <h2>Food & Beverages (Certified Colors)</h2>
            </div>
            <div className="card_overlay-item">
              <div className="card_overlay desktop-image">
                  <img src="/assets/bukets.webp"  alt="" />
                </div>
                <h2>Pharmaceuticals</h2>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
export default IndustriesSection;
