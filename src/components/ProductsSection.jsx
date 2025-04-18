import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProductsSection = () => {
  useEffect(() => {
    const mm = ScrollTrigger.matchMedia();
  
    mm.add("(min-width: 1025px)", () => {
      const items = gsap.utils.toArray(".products_section-content-item");
  
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: ".products_section",
          start: "top top",
          end: `+=${items.length * 100}%`,
          scrub: true,
          pin: true,
          snap: 1 / (items.length - 1),
          markers: false,
        },
      });
  
      items.forEach((item) => {
        const tl = gsap.timeline();
        tl.fromTo(
          item,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
  
        master.add(tl);
      });
  
      // Cleanup timeline on media unmatch
      return () => {
        master.kill();
      };
    });
  
    return () => {
      mm.kill(); // Cleanup matchMedia
    };
  }, []);
  
  
  return (
    <section className="products_section background-white">
    <div className="products_section-inner site_flex site_flex-column site_flex_center_vertical">
      <div className="products_section-title">
        <h2 className="title_orange">Our Products</h2>
        <p className="title_orange">We specialize in a wide range of synthetic dyes, including:</p>
      </div>
      <div className="products_section-content site_flex site_flex-row">
        <div className="products_section-content-inner">
          <div className="products_section-content-item">
            <div className="products_section-content-item-left">
              <img src="/assets/pill-1.webp" alt="Product 1" />
            </div>
            <div className="products_section-content-item-right">
              <h3 style={{color:"#EC7F1B"}}>Textile Dyes</h3>
            </div>
          </div>
          <div className="products_section-content-item">
            <div className="products_section-content-item-left">
              <img src="/assets/pill-2.webp" alt="Product 2" />
            </div>
            <div className="products_section-content-item-right">
              <h3 style={{color:"#C52460"}}>Plastic Dyes</h3>
            </div>
          </div>
          <div className="products_section-content-item item_mask">
            <div className="products_section-content-item-left">
              <img src="/assets/coating-dyes-image.webp" alt="Product 3" />
            </div>
            {/* <div className="products_section-content-item-right">
              <h3>Coating Dyes</h3>
            </div> */}
          </div>
          <div className="products_section-content-item">
            <div className="products_section-content-item-left">
              <img src="/assets/pill-4.webp" alt="Product 4" />
            </div>
            <div className="products_section-content-item-right">
              <h3 style={{color:"#0568AF"}}>Printing Inks</h3>
            </div>
          </div>
          <div className="products_section-content-item">
            <div className="products_section-content-item-left">
              <img src="/assets/pill-4.webp" alt="Product 4" />
            </div>
            <div className="products_section-content-item-right">
              <h3 style={{color:"#603223"}}>Specialty Dyes</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default ProductsSection;
