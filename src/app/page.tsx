import { ModalProvider } from '@/context/ModalContext'
import Modals from '@/components/Modals'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ProblemSection from '@/components/ProblemSection'
import SolutionSection from '@/components/SolutionSection'
import ForCreatorSection from '@/components/ForCreatorSection'
import ForBuyerSection from '@/components/ForBuyerSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import TrustSection from '@/components/TrustSection'
import SustainabilitySection from '@/components/SustainabilitySection'
import EarlyAccessSection from '@/components/EarlyAccessSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <ModalProvider>
      <Modals />
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ForCreatorSection />
        <ForBuyerSection />
        <HowItWorksSection />
        <TrustSection />
        <SustainabilitySection />
        <EarlyAccessSection />
        <FAQSection />
      </main>
      <Footer />
    </ModalProvider>
  )
}
