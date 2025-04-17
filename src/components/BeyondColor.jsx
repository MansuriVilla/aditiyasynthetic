import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const BeyondColor = () => {
useEffect(() => {
  const mm = ScrollTrigger.matchMedia();

  mm.add("(min-width: 1025px)", () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".beyond_color",
        start: "top top",
        end: "+=1500",
        scrub: true,
        pin: true,
        markers: false,
      }
    });

    tl.to(".snippet:nth-child(1)", {
      left: "42%",
      top: "43%",
      x: "-40%",
      y: "-45%",
      ease: "power1.out"
    }, 0);

    tl.to(".snippet:nth-child(2)", {
      right: "50%",
      top: "50%",
      x: "65%",
      y: "-60%",
      ease: "power1.out"
    }, 0);

    tl.to(".snippet:nth-child(3)", {
      right: "52%",
      bottom: "50%",
      x: "55%",
      y: "59%",
      ease: "power1.out"
    }, 0);

    tl.to(".snippet:nth-child(4)", {
      left: "51%",
      bottom: "45%",
      x: "-45%",
      y: "52%",
      ease: "power1.out"
    }, 0);

    tl.to(".snippet:nth-child(5)", {
      left: "53%",
      top: "45%",
      x: "-47%",
      y: "-32%",
      ease: "power1.out"
    }, 0);

    tl.to(".snippet", {
      zIndex: 1,
      opacity: 0.8,
      ease: "none"
    }, 0.5);

    tl.to(".beyond_color-inner h2", {
      scale: 0.5,
      ease: "none"
    }, 0);

    // Optional: Return a cleanup function
    return () => {
      tl.kill();
    };
  });

  return () => {
    mm.kill(); // Clean up all matched media queries on component unmount
  };
}, []);


  return (
    <div className="beyond_color background-white" id="beyondColor">
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
