import React from "react";
import HeroSection from "../components/HeroSection.jsx";
import SectionWithBackground from "../components/SectionWithBackground.jsx";
import ProductsSection from "../components/ProductsSection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import SustanabilitySection from "../components/SustanabilitySection.jsx";
import JourneySection from "../components/JourneySection.jsx";
import TestimonialSection from "../components/TestimonialSection.jsx";
import WhyChooseUsSection from "../components/WhyChooseUsSection.jsx";
import IndustriesSection from "../components/IndustriesSection.jsx";
import BeyondColor from "../components/BeyondColor.jsx";

export const Home = () => {
    return (
        <>
            <HeroSection />
            <BeyondColor/>
            <JourneySection />
            <ProductsSection />
            <IndustriesSection />
            <SustanabilitySection />
            <WhyChooseUsSection />
            <SectionWithBackground />
            <TestimonialSection />
            <ContactSection />   
        </>
    );
}
export default Home;