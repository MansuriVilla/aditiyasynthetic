import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Header = () => {
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

    const megaMenuRef = useRef(null);
    const overlayRef = useRef(null);
    const listRef = useRef(null);
    const menuContainerRef = useRef(null);
    const headerRef = useRef(null);
    const megaMenuWrapperRef = useRef(null);

    const openMegaMenu = () => {
        const menu = menuContainerRef.current;
        if (!menu) return;

        gsap.set(menu, { height: "auto", paddingBottom: "55px" });
        const menuHeight = menu.offsetHeight;

        gsap.from(menu, {
            height: 0,
            paddingBottom: 0,
            duration: 0.4,
            ease: "power2.out",
        });

        gsap.fromTo(
            listRef.current.children,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "power1.out",
            }
        );

        gsap.to(overlayRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: "power1.out",
            pointerEvents: "auto",
        });

        gsap.set(menuContainerRef.current, { pointerEvents: "auto" });

        setIsMegaMenuOpen(true);
    };

    const closeMegaMenu = () => {
        const menu = menuContainerRef.current;
        if (!menu) return;

        gsap.to(menu, {
            height: 0,
            paddingBottom: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => {
                setIsMegaMenuOpen(false);
                gsap.set(menuContainerRef.current, { pointerEvents: "none" });
            },
        });

        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power1.out",
            pointerEvents: "none",
        });

        gsap.to(listRef.current.children, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: "power1.out",
        });
    };

    const handleMegaMenuHover = (event, isEntering) => {
        const megaMenuState = megaMenuRef.current?.getAttribute("data-mega-menu");

        if (megaMenuState === "disabled") {
            setIsMegaMenuOpen(true);
            gsap.set(menuContainerRef.current, { pointerEvents: "auto" });
            return;
        }

        if (isEntering) {
            openMegaMenu();
        } else {
            // Check if the cursor is still within the mega menu wrapper
            const wrapper = megaMenuWrapperRef.current;
            if (!wrapper || !event.relatedTarget || !wrapper.contains(event.relatedTarget)) {
                closeMegaMenu();
            }
        }
    };

    useEffect(() => {
        const menuState = megaMenuRef.current?.getAttribute("data-mega-menu");
        if (menuState === "disabled") {
            setIsMegaMenuOpen(true);
            gsap.set(menuContainerRef.current, { pointerEvents: "auto" });
        }
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const header = headerRef.current;
            let isInFooter = false;

            const handleScroll = () => {
                if (isInFooter) return;

                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                gsap.to(header, {
                    duration: 0.3,
                    bottom: scrollTop > 80 ? "20px" : "120px",
                    ease: "power1.out",
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
                    onEnter: () => {
                        isInFooter = true;
                        gsap.to(header, {
                            duration: 0.3,
                            bottom: "120px",
                            ease: "power1.out",
                        });
                    },
                    onLeave: () => {
                        isInFooter = false;
                        if (window.scrollY > 80) {
                            gsap.to(header, {
                                duration: 0.3,
                                bottom: "20px",
                                ease: "power1.out",
                            });
                        }
                    },
                    onEnterBack: () => {
                        isInFooter = true;
                        gsap.to(header, {
                            duration: 0.3,
                            bottom: "120px",
                            ease: "power1.out",
                        });
                    },
                    onLeaveBack: () => {
                        isInFooter = false;
                        if (window.scrollY > 80) {
                            gsap.to(header, {
                                duration: 0.3,
                                bottom: "20px",
                                ease: "power1.out",
                            });
                        }
                    },
                });

                document.querySelectorAll(".background-white").forEach((section) => {
                    ScrollTrigger.create({
                        trigger: section,
                        start: "top 89%",
                        end: "bottom top",
                        onEnter: () => header.classList.add("background-orange"),
                        onLeave: () => header.classList.remove("background-orange"),
                        onEnterBack: () => header.classList.add("background-orange"),
                        onLeaveBack: () => header.classList.remove("background-orange"),
                    });
                });
            }, 100);

            return () => {
                window.removeEventListener("scroll", handleScroll);
                clearInterval(interval);
                ScrollTrigger.getAll().forEach((t) => t.kill());
            };
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <header className={`site_header ${isMegaMenuOpen ? "active_header" : ""}`} ref={headerRef}>
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

                        <li
                            className={`site_nav-link mega_menu-wrapper ${isMegaMenuOpen ? "active" : ""}`}
                            ref={megaMenuWrapperRef}
                            onMouseEnter={(e) => handleMegaMenuHover(e, true)}
                            onMouseLeave={(e) => handleMegaMenuHover(e, false)}
                        >
                            <div ref={megaMenuRef} data-mega-menu="enabled">
                                <a href="/" className="site_flex site_flex_center_vertical">
                                    <span className="background"></span>
                                    <span className="site_header-link-text">Shades</span>
                                    <span className="site_flex site_flex_center_vertical">
                                        <img src="/assets/dropdown-arrow-ico.svg" alt="dropdown arrow icon" />
                                    </span>
                                </a>
                            </div>

                                <div className="mega_menu" ref={menuContainerRef}>
                                    <ul className="mega_menu-list" ref={listRef}>
                                        <li><a href="/shades/red">Red Shades</a></li>
                                        <li><a href="/shades/blue">Blue Shades</a></li>
                                        <li><a href="/shades/green">Green Shades</a></li>
                                        <li><a href="/shades/yellow">Yellow Shades</a></li>
                                    </ul>
                                </div>
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

            <div className="backface-overlay" ref={overlayRef}></div>
        </>
    );
};

export default Header;