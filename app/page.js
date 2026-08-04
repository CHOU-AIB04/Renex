import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import Why from "./components/sections/Why";
import Comparison from "./components/sections/Comparison";
import Process from "./components/sections/Process";
import Realisations from "./components/sections/Realisations";
import CtaSection from "./components/sections/CtaSection";

export default function Home() {
  return (
    <>
     <Header/>
     <Hero/>
     <Why />
     <Comparison />
     <Process />
     <Realisations />
     <CtaSection />
    </>
  );
}
