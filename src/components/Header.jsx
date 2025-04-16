import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Header = () => {
    useEffect(() => {
        const header = document.querySelector(".site_header");
        let isInFooter = false;

        const handleScroll = () => {
            if (isInFooter) return;

            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            gsap.to(header, {
                duration: 0.3,
                bottom: scrollTop > 80 ? "20px" : "120px",
                ease: "power1.out"
            });
        };

        window.addEventListener("scroll", handleScroll);

        const interval = setInterval(() => {
            const footer = document.querySelector("footer");
            if (!footer) return;

            clearInterval(interval);

            
            ScrollTrigger.create({
                trigger: footer,
                start: "top bottom",     
                end: "bottom 90%",       
                markers: false,
                onEnter: () => {
                    isInFooter = true;
                    gsap.to(header, {
                        duration: 0.3,
                        bottom: "120px",
                        ease: "power1.out"
                    });
                },
                onLeave: () => {
                    isInFooter = false;
                    if (window.scrollY > 80) {
                        gsap.to(header, {
                            duration: 0.3,
                            bottom: "20px",
                            ease: "power1.out"
                        });
                    }
                },
                onEnterBack: () => {
                    isInFooter = true;
                    gsap.to(header, {
                        duration: 0.3,
                        bottom: "120px",
                        ease: "power1.out"
                    });
                },
                onLeaveBack: () => {
                    isInFooter = false;
                    if (window.scrollY > 80) {
                        gsap.to(header, {
                            duration: 0.3,
                            bottom: "20px",
                            ease: "power1.out"
                        });
                    }
                }
            });

            
            document.querySelectorAll('.background-white').forEach(section => {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 89%",
                    end: "bottom top",
                    markers: false,
                    onEnter: () => header.classList.add("background-orange"),
                    onLeave: () => header.classList.remove("background-orange"),
                    onEnterBack: () => header.classList.add("background-orange"),
                    onLeaveBack: () => header.classList.remove("background-orange")
                });
            });
        }, 100);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearInterval(interval);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <header className="site_header">
            <nav className="site_nav site_flex site_flex_center_vertical">
                <ul className="site_nav-center site_nav-links site_flex site_flex_center_vertical">
                    <li className="site_nav-center-left">
                        <a className="site_nav-logo" href="/">
                            <img src="/assets/home-header-ico.svg" alt="logo" />
                        </a>
                    </li>
                    <li className="site_nav-link">
                        <a href="/" className="site_flex site_flex_center_vertical">
                        <span className="background"></span>
                            <span className="site_header-link-text">News & Events</span>
                            <span className="site_flex site_flex_center_vertical">
                                <img src="/assets/anchor-arrow-ico.svg" alt="arrow icon" />
                            </span>
                        </a>
                    </li>
                    <li className="site_nav-link">
                        <a href="/" className="site_flex site_flex_center_vertical">
                        <span className="background"></span>
                            <span className="site_header-link-text">Shades</span>
                            <span className="site_flex site_flex_center_vertical">
                                <img src="/assets/dropdown-arrow-ico.svg" alt="dropdown arrow icon" />
                            </span>
                        </a>
                    </li>
                    <li className="site_nav-link">
                        <a href="#contact" className="site_flex site_flex_center_vertical">
                            <span className="background"></span>
                            <span className="site_header-link-text">Contact Us</span>
                            <span className="site_flex site_flex_center_vertical">
                                <img src="/assets/dropdown-arrow-ico.svg" alt="dropdown arrow icon" />
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
