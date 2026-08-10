import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import Partners from "./components/sections/Partners";
import WhySolar from "./components/sections/WhySolar";
import Why from "./components/sections/Why";
import Stats from "./components/sections/Stats";
import Solutions from "./components/sections/Solutions";
import Process from "./components/sections/Process";
import Realisations from "./components/sections/Realisations";
import Testimonials from "./components/sections/Testimonials";
import Faq from "./components/sections/Faq";
import CtaSection from "./components/sections/CtaSection";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Partners />
      <WhySolar />
      <Why />
      <Stats />
      <Solutions />
      <Process />
      <Realisations />
      <Testimonials />
      <Faq />
      <CtaSection />
      {/* <Footer /> */}
    </>
  );
}
