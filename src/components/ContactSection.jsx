import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    useEffect(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".background-clip", 
            start: "top 50%", 
            end: "50% 50%", 
            scrub: true, 
            markers: false,
          },
        });
      
        
        tl.to(".background-clip", {
          clipPath: "polygon(0% -1%, 100% -1%, 100% 93.3711%, 50% 42.8926%, 50% 42.8926%, 0% 93.3711%)",
          ease: "power2.out",
          duration: 1,
        });
      
        
        tl.to(".background-clip", {
          clipPath: "polygon(0% 0%, 100% -1%, 100% 0%, 50% 0%, 50% 0%, 0% 0%)",
          ease: "power2.out",
          duration: 1,
        });
      }, []);

  return (
    <section className="contactSection-Area" id="contact">
      <div className="contactSection-Inner site_gird">
        <div className="contactSection-InnerContent site_flex site_flex-column section_inner-space site_flex_center_vertical background-clip background-orange site_gird-center">
            <div className="contactSection-Innertop">
            <h2>Contact Us</h2>
            <p className="contactSection-Innertop-description">
                Let's bring your vision to life with the perfect colors! Get in
                touch for product inquiries and custom dye solutions.
            </p>
            </div>
            <div className="site_flex site_flex-column contactSection-Innerbottom">
            <div className="contactSection-Innerbottom-top">
                <h3>Aditya synthetic</h3>
            </div>
            <div className="contactSection-Innerbottom-center site_flex site_flex-column site_flex_center_vertical">
                <img src="/assets/phone-ico.svg" alt="Phone Icon" />
                <h3>
                <a href="tel:+91 12345 12345" className="contact-text">+91 12345 12345</a>
                </h3>
            </div>
            <div className="contactSection-Innerbottom-center site_flex site_flex-column site_flex_center_vertical">
                <img src="/assets/mail-ico.svg" alt="Mail Icon" />
                <h3>
                <a href="mailto:adityasynthetic@gmail.com" className="contact-text">
                    adityasynthetic@gmail.com
                </a>
                </h3>
            </div>
            </div>
        </div>
        <div className="contactSection-InnerContent site_flex site_flex-column section_inner-space site_flex_center_vertical background-white site_gird-center">
            <div className="contactSection-Innertop">
            <h2>Contact Us</h2>
            <p className="contactSection-Innertop-description">
                Let's bring your vision to life with the perfect colors! Get in
                touch for product inquiries and custom dye solutions.
            </p>
            </div>
            <div className="site_flex site_flex-column contactSection-Innerbottom ">
            <div className="contactSection-Innerbottom-top">
                <h3>Aditya synthetic</h3>
            </div>
            <div className="contactSection-Innerbottom-center site_flex site_flex-column site_flex_center_vertical">
                <img src="/assets/phone-ico.svg" alt="Phone Icon" />
                <h3>
                <a href="tel:+91 12345 12345" className="contact-text">+91 12345 12345</a>
                </h3>
            </div>
            <div className="contactSection-Innerbottom-center site_flex site_flex-column site_flex_center_vertical">
                <img src="/assets/mail-ico.svg" alt="Mail Icon" />
                <h3>
                <a href="mailto:adityasynthetic@gmail.com" className="contact-text">
                    adityasynthetic@gmail.com
                </a>
                </h3>
            </div>
            </div>
        </div>
      </div>
    </section>
  );
}