import Herobanner from "../components/Herobanner";
import TemplateSection from "../components/TemplateSection";
import Services from "../components/Services";
import SpeedFeature from "../components/SpeedFeature";
import Costumer from "../components/Costumer";
import About from "../components/About";

export default function Home() {
  return (
    <>
      <Herobanner />
      <SpeedFeature />
      <TemplateSection />
      <Services />
      <Costumer />
      <About />
    </>
  );
}
