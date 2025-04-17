// import React from "react";



// export const HeroSection = () => {
//     return (
//         <section className="hero_section">
//             <div className="hero_section-inner site_flex site_flex-column">
//                 <div className="hero_section-image hero_background site_flex">
//                     <img src="/assets/home-page-hero-bg.webp" alt="Hero Section Image" className="hero_section-image" />   
//                 </div>
//                 <div className="hero_section-overlay">
//                     <div className="hero_section-overlay-inner site_flex site_flex-column">
//                         <div className="hero_section-top">
//                             <a href="/">
//                                 <img src="/assets/fav-ico.webp" alt="" />
//                             </a>
//                         </div>
//                         <div className="hero_section-center">
//                             <h1 className="hero_section-title site_gradient-clr">Bringing Vibrant Colors to Life</h1>
//                             <p className="hero_section-description">Where colors and chemistry co-exist</p>
//                         </div>
//                         <div className="hero_section-bottom">
//                             <img src="/assets/scroll-more-ico.svg" alt="Hero Section Image" className="hero_section-ico" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }
// export default HeroSection;


import React, { useState } from "react";

export const HeroSection = () => {
    const [isFirstVideo, setIsFirstVideo] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(true);

    const toggleVideo = () => {
        setIsLoading(true); // Show the loader
        setIsVideoReady(false); // Temporarily disable the fade-in effect

        const videoElement = document.createElement("video");
        videoElement.src = isFirstVideo ? "/assets/video-1.mp4" : "/assets/video-2.mp4";

        // Preload the video
        videoElement.oncanplaythrough = () => {
            setIsFirstVideo(!isFirstVideo); // Switch the video
            setIsLoading(false); // Hide the loader

            // Trigger fade-in animation
            setTimeout(() => {
                setIsVideoReady(true);
            }, 50); // Small delay to re-trigger the fade-in effect
        };
    };

    return (
        <section className="hero_section">
            <div className="hero_section-inner site_flex site_flex-column">
                <div className="hero_section-image hero_background site_flex">
                    <video
                        src={isFirstVideo ? "/assets/video-2.mp4" : "/assets/video-1.mp4"}
                        autoPlay
                        loop
                        muted
                        className={`hero_section-video ${isVideoReady ? "fade-in" : "fade-out"}`}
                    />
                </div>
                <div className="hero_section-overlay">
                    <div className="hero_section-overlay-inner site_flex site_flex-column">
                        <div className="hero_section-top">
                            <a href="/">
                                <img src="/assets/fav-ico.webp" alt="" />
                            </a>
                        </div>
                        <div className="hero_section-center">
                            <h1 className="hero_section-title site_gradient-clr">Bringing Vibrant <br/> Colors to Life</h1>
                            <p className="hero_section-description">Where colors and chemistry co-exist</p>
                        </div>
                            <button
                                onClick={toggleVideo}
                                className="hero_section-button"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="spinner"></span>
                                ) : (
                                    "Tap To See Second Option"
                                )}
                            </button>
                        <div className="hero_section-bottom">
                            <a className="hero_section-bottom-link" href="#beyondColor">

                                <img src="/assets/scroll-more-ico.svg" alt="Hero Section Icon" className="hero_section-ico" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;