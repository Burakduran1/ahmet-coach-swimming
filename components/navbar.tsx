"use client"

import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { CONTACT } from "@/lib/contact"
import { LifebuoyLogo } from "@/components/brand-logo"

const navLinks = [
  { href: "#hakkimda", label: "Hakkımda" },
  { href: "#egitimler", label: "Eğitimler" },
  { href: "#galeri", label: "Galeri" },
  { href: "#yorumlar", label: "Yorumlar" },
  { href: "#sss", label: "SSS" },
  { href: "#mini-oyun", label: "Mini oyun" },
  { href: "#iletisim", label: "İletişim" },
]

export function Navbar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 100)
  })

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed left-0 right-0 top-0 z-[60] mx-auto min-h-[5.5rem] max-w-7xl px-4 py-3"
      >
        <nav className="glass rounded-2xl px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              title="Ahmet Swim - İzmir Yüzme Dersi"
            >
              <LifebuoyLogo />
              <span className="font-serif text-xl font-bold text-foreground">
                Ahmet Swim
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover="hover"
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary"
                    variants={{
                      hover: { width: "100%" },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-2xl bg-accent px-6 py-2.5 text-sm font-bold text-accent-foreground shadow-[var(--button-shadow-accent)] transition-shadow hover:shadow-lg md:block"
              whileHover={{ scale: 1.06, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Hemen Başla
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              type="button"
              aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={isMobileMenuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-primary" aria-hidden />
              ) : (
                <Menu className="h-5 w-5 text-primary" aria-hidden />
              )}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-x-4 top-24 z-40 md:hidden"
      >
        <div className="glass rounded-2xl p-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-2xl bg-accent px-6 py-3 text-center text-sm font-bold text-accent-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
              whileTap={{ scale: 0.98 }}
            >
              Hemen Başla
            </motion.a>
          </div>
        </div>
      </motion.div>
    </>
  )
}
