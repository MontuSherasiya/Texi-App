import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import WhyUs from "./components/WhyUs.jsx";
import Fleet from "./components/Fleet.jsx";
import Destinations from "./components/Destinations.jsx";
import Tesimonials from "./components/Tesimonials.jsx";
import CTA from "./components/CTA.jsx";

export default function App () {
  return(
    <>
      <Header />
      <Hero/>
      <Stats />
      <WhyUs />
      <Fleet />
      <Destinations />
      <Tesimonials />
      <CTA />
      <Footer />
    </>
  )
}