import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TourVirtual360 from "./components/TourVirtual360";
import SobreNosotros from "./components/SobreNosotros";
import Servicios from "./components/Servicios";
import Planes from "./components/Planes";
import ZonasCobertura from "./components/ZonasCobertura";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TourVirtual360 />
      <SobreNosotros />
      <Servicios />
      <Planes />
      <ZonasCobertura />
      <Contacto />
      <Footer />
    </>
  );
}
