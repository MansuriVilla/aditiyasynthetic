import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    title: "Textile Dyes",
    image:
      "https://images.unsplash.com/photo-1741851374674-e4b7e573a9e7?w=500&auto=format&fit=crop&q=60",
    color: "#F29F05",
  },
  {
    title: "Plastic Dyes",
    image:
      "https://images.unsplash.com/photo-1741722604231-3d24c0c44864?w=500&auto=format&fit=crop&q=60",
    color: "#D12B85",
  },
  {
    title: "Coating Dyes",
    image:
      "https://images.unsplash.com/photo-1741866987680-5e3d7f052b87?w=500&auto=format&fit=crop&q=60",
    color: "#1645A3",
  },
  {
    title: "Printing Inks",
    image:
      "https://images.unsplash.com/photo-1742138162252-363d0d38a063?w=500&auto=format&fit=crop&q=60",
    color: "#0E5EB3",
  },
  {
    title: "Specialty Dyes",
    image:
      "https://images.unsplash.com/photo-1726930095303-4aac9ba8bb74?w=500&auto=format&fit=crop&q=60",
    color: "#522211",
  },
];

const ProductsSection = () => {
  const sectionRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    // Refresh ScrollTrigger after content loads
    const refreshListener = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", refreshListener);

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef);

      // Animate section title
      gsap.from(q(".section-title"), {
        scrollTrigger: {
          trigger: q(".section-title"),
          start: "top 90%",
          markers: false, // For debugging; remove later
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
      });

      // Animate section subtitle
      gsap.from(q(".section-subtitle"), {
        scrollTrigger: {
          trigger: q(".section-subtitle"),
          start: "top 90%",
          markers: false, // Debug marker
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.1,
      });

      // PINNING: Pin the entire section so the content stays fixed while scrolling
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        // Extend the end so that the pin lasts longer. Adjust this value as needed.
        end: "bottom+=500 top",
        pin: true,
        scrub: true,
        markers: false, // Debug markers—remove when satisfied
      });

      // Animate each product item sequentially (first the image then the title)
      q(".product-item").forEach((item) => {
        const image = item.querySelector("img");
        const title = item.querySelector("h3");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
            markers: false, // Debug markers—remove when satisfied
          },
        });

        tl.from(image, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: "power2.out",
        }).from(
          title,
          {
            opacity: 0,
            y: 50,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3" // Slight overlap between image and title animation
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener("load", refreshListener);
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <section className="products-section background-white" ref={sectionRef}>
      <div className="products-container" ref={containerRef}>
        <h2 className="section-title">Our Products</h2>
        <p className="section-subtitle">
          We specialize in a wide range of synthetic dyes, including:
        </p>
        <div className="products-list">
          {items.map((item, index) => (
            <div className="product-item" key={index}>
              <img src={item.image} alt={item.title} />
              <h3 style={{ color: item.color }}>{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
