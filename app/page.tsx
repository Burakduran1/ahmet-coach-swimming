import dynamic from "next/dynamic"
import { HeroSection } from "@/components/hero-section"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { ContactFloatingWidget } from "@/components/contact-floating-widget"

const LiquidScrollTube = dynamic(
  () => import("@/components/liquid-scroll-tube").then((m) => ({ default: m.LiquidScrollTube })),
  { ssr: true }
)

const AboutSection = dynamic(
  () => import("@/components/about-section").then((m) => ({ default: m.AboutSection })),
  { ssr: true }
)

const BentoSection = dynamic(
  () => import("@/components/bento-section").then((m) => ({ default: m.BentoSection })),
  { ssr: true }
)

const GallerySection = dynamic(
  () => import("@/components/gallery-section").then((m) => ({ default: m.GallerySection })),
  { ssr: true }
)

const StatsSection = dynamic(
  () => import("@/components/stats-section").then((m) => ({ default: m.StatsSection })),
  { ssr: true }
)

const ReviewsSection = dynamic(
  () => import("@/components/reviews-section").then((m) => ({ default: m.ReviewsSection })),
  { ssr: true }
)

const ReactionGame = dynamic(
  () => import("@/components/reaction-game").then((m) => ({ default: m.ReactionGame })),
  { ssr: true, loading: () => <section id="mini-oyun" className="min-h-[40vh] py-16" /> }
)

const FAQSection = dynamic(
  () => import("@/components/faq-section").then((m) => ({ default: m.FAQSection })),
  { ssr: true }
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
      <FAQSection />
      <FooterSection />
      <ContactFloatingWidget />
    </main>
  )
}
