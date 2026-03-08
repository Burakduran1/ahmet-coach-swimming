import dynamic from "next/dynamic"
import { HeroSection } from "@/components/hero-section"
import { Navbar } from "@/components/navbar"
import { LiquidScrollTube } from "@/components/liquid-scroll-tube"
import { AboutSection } from "@/components/about-section"
import { BentoSection } from "@/components/bento-section"
import { GallerySection } from "@/components/gallery-section"
import { StatsSection } from "@/components/stats-section"
import { ReviewsSection } from "@/components/reviews-section"
import { FooterSection } from "@/components/footer-section"
import { WhatsAppButton } from "@/components/whatsapp-button"

const ReactionGame = dynamic(
  () => import("@/components/reaction-game").then((m) => ({ default: m.ReactionGame })),
  { ssr: true, loading: () => <section id="mini-oyun" className="min-h-[40vh] py-16" /> }
)

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <Navbar />
      <LiquidScrollTube />
      <HeroSection />
      <AboutSection />
      <BentoSection />
      <GallerySection />
      <StatsSection />
      <ReviewsSection />
      <ReactionGame />
      <FooterSection />
      <WhatsAppButton />
    </main>
  )
}
