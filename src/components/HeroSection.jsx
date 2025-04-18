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
export const HeroSection = () => {
    
    return (
        <section className="hero_section">
            <div className="hero_section-inner site_flex site_flex-column">
                <div className="hero_section-image hero_background site_flex">
                    <video
                        src="/assets/video-2.mp4"
                        autoPlay
                        loop
                        muted
                        className="hero_section-video"
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