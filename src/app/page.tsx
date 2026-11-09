import { ModalProvider } from '@/context/ModalContext'
import Modals from '@/components/Modals'
import ScrollReveal from '@/components/ScrollReveal'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ProblemSection from '@/components/ProblemSection'
import ComparisonSection from '@/components/ComparisonSection'
import SolutionSection from '@/components/SolutionSection'
import ForCreatorSection from '@/components/ForCreatorSection'
import ForBuyerSection from '@/components/ForBuyerSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import TrustSection from '@/components/TrustSection'
import SustainabilitySection from '@/components/SustainabilitySection'
import NewsSection from '@/components/NewsSection'
import EarlyAccessSection from '@/components/EarlyAccessSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <ModalProvider>
      <Modals />
      <ScrollReveal />
      <Navbar />
      <main>
        <HeroSection />
        {/* 스크롤 시 히어로 위로 덮이는 콘텐츠 레이어 */}
        <div className="relative z-10">
          <ProblemSection />
          <ComparisonSection />
          <SolutionSection />
          <ForCreatorSection />
          <ForBuyerSection />
          <HowItWorksSection />
          {/* <TrustSection /> */}
          <SustainabilitySection />
          <EarlyAccessSection />
          <NewsSection />
          <FAQSection />
        </div>
      </main>
      <Footer />
    </ModalProvider>
  )
}
