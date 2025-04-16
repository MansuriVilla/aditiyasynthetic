import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const BeyondColor = () => {
  useEffect(() => {
    // Create a timeline attached to the ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".beyond_color",      // The container to watch
        start: "top top",              // When the container’s top hits the viewport top
        end: "+=1500",                 // Extend the scroll distance by 1500 pixels (adjust as needed)
        scrub: 1,                      // Increase scrub delay for a slower reaction to scroll input
        pin: true,                     // Pin the container while animation plays
        markers: false,                 // Enable markers for debugging positions (remove in production)
      }
    });

    // Animate snippets to move into the center.
    tl.to(".snippet:nth-child(1)", {
      left: "42%",    // Adjusted horizontal center position
      top: "43%",     // Adjusted vertical center position
      x: "-50%",      // Translate to center precisely
      y: "-50%",
      ease: "power1.out"
    }, 0);

    tl.to(".snippet:nth-child(2)", {
      right: "50%",
      top: "50%",
      x: "50%",
      y: "-50%",
      ease: "power1.out"
    }, 0);

    tl.to(".snippet:nth-child(3)", {
      right: "50%",
      bottom: "50%",
      x: "50%",
      y: "50%",
      ease: "power1.out"
    }, 0);

    tl.to(".snippet:nth-child(4)", {
      left: "50%",
      bottom: "50%",
      x: "-50%",
      y: "50%",
      ease: "power1.out"
    }, 0);

    tl.to(".snippet:nth-child(5)", {
      left: "50%",
      top: "50%",
      x: "-50%",
      y: "-50%",
      ease: "power1.out"
    }, 0);

    // Stacking effect via zIndex & opacity adjustment
    tl.to(".snippet", {
      zIndex: 1,
      opacity: 0.8,
      ease: "none"
    }, 0.5);

    // Scale down the <h2> slowly as you scroll further
    tl.to(".beyond_color-inner h2", {
      scale: 0.5,
      ease: "none"
    }, 0);
    
  }, []);

  return (
    <div className="beyond_color background-white">
      <div className="beyond_color-inner">
        <h2>Beyond <br /> Color</h2>
        <div className="snippets-holder">
          <div className="snippet">
            <img src="/assets/snippet-1.webp" alt="Beyond Color 1" />
          </div>
          <div className="snippet">
            <img src="/assets/snippet-2.webp" alt="Beyond Color 2" />
          </div>
          <div className="snippet">
            <img src="/assets/snippet-3.webp" alt="Beyond Color 3" />
          </div>
          <div className="snippet">
            <img src="/assets/snippet-4.webp" alt="Beyond Color 4" />
          </div>
          <div className="snippet">
            <img src="/assets/snippet-5.webp" alt="Beyond Color 5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeyondColor;
