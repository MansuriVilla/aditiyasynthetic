import React from "react";
import HeroSection from "../components/HeroSection.jsx";
import SectionWithBackground from "../components/SectionWithBackground.jsx";
import ProductsSection from "../components/ProductsSection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import SustanabilitySection from "../components/SustanabilitySection.jsx";
import JourneySection from "../components/JourneySection.jsx";
import InteractiveBalls from "../components/InteractiveBalls.jsx";
import TestimonialSection from "../components/TestimonialSection.jsx";

export const Home = () => {
    return (
        <>
            <HeroSection />
            <JourneySection />
            <ProductsSection />
            <SustanabilitySection />
            <SectionWithBackground />
            <TestimonialSection />
            <section id="convert-fiat">
        <h2>Why Choose Us?</h2>
        <InteractiveBalls />
      </section>
            <ContactSection />   
        </>
    );
}
export default Home;