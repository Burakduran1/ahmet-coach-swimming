"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Waves, MapPin, Phone, Mail, Instagram, Youtube } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

const footerLinks = {
  hizmetler: [
    { label: "Çocuk Yüzme", href: "#egitimler" },
    { label: "Yetişkin Başlangıç", href: "#egitimler" },
    { label: "Performans", href: "#egitimler" },
    { label: "Aqua Fitness", href: "#egitimler" },
  ],
  hakkinda: [
    { label: "Hakkımda", href: "#hakkimda" },
    { label: "Galeri", href: "#galeri" },
    { label: "Başarılar", href: "#" },
    { label: "Blog", href: "#" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
]

export function FooterSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <footer
      id="iletisim"
      ref={ref}
      className="relative overflow-hidden bg-secondary/30 pt-24 sm:pt-32"
    >
      {/* Giant CTA Section */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ y, opacity }}
          className="mb-20 text-center"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
          >
            <span className="relative inline-block overflow-hidden">
              <motion.span
                className="block text-gradient"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Hadi
              </motion.span>
            </span>{" "}
            <span className="relative inline-block overflow-hidden">
              <motion.span
                className="block text-foreground"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Başlayalım
              </motion.span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground"
          >
            Kendiniz veya çocuğunuz için ilk yüzme dersine başlamak ister misiniz? Hemen yazın, birlikte planlayalım.
          </motion.p>

          <motion.a
            href="https://wa.me/905551234567"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp ile ücretsiz danışmanlık al"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group relative mt-10 inline-flex overflow-hidden rounded-2xl px-10 py-5 text-lg font-bold text-white shadow-[0_4px_14px_rgba(194,65,12,0.35)] hover:shadow-[0_6px_24px_rgba(194,65,12,0.4)]"
            style={{ backgroundColor: "#C2410C" }}
          >
            <span className="relative z-10">Ücretsiz Danışmanlık Al</span>
            <motion.div
              className="absolute inset-0 bg-primary/90"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <p className="mt-12 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Ya da formu doldurun
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </motion.div>

        {/* Footer Content */}
        <div className="grid gap-12 border-t border-border/50 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <Waves className="h-6 w-6 text-primary" />
              </div>
              <span className="font-serif text-2xl font-bold text-foreground">
                Ahmet
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              İzmir&apos;de çocuk ve yetişkin yüzme eğitimi. Ahmet Hoca ile
              güvenli, eğlenceli ve kişiye özel dersler.
            </p>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Hizmetler
            </h3>
            <ul className="space-y-3">
              {footerLinks.hizmetler.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* About Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Hakkında
            </h3>
            <ul className="space-y-3">
              {footerLinks.hakkinda.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              İletişim
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Karşıyaka, İzmir</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+905551234567"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4" />
                  <span>+90 555 123 45 67</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:ahmet@yuzme.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  <span>ahmet@yuzme.com</span>
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2024 Koç Ahmet. Tüm hakları saklıdır.
            </p>
            <p className="text-sm text-muted-foreground">
              İzmir, Türkiye&apos;de 🇹🇷 sevgiyle yapıldı
            </p>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
    </footer>
  )
}
