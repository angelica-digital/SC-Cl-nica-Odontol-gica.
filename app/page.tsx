import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import Treatments from "@/components/Treatments";
import ResultsSection from "@/components/ResultsSection";
import Professional from "@/components/Professional";
import PatientJourney from "@/components/PatientJourney";
import CTA from "@/components/CTA";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Treatments />
        <ResultsSection />
        <Professional />
        <PatientJourney />
        <CTA location="cta-intermediario" />
        <Gallery />
        <Reviews />
        <FAQ />
        <Location />
        <CTA location="cta-final" />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
