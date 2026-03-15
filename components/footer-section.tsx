"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { MapPin, Phone, Mail, Instagram } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { CONTACT } from "@/lib/contact"
import { LifebuoyLogo } from "@/components/brand-logo"

const footerLinks = {
  hizmetler: [
    { label: "Çocuk Yüzme Eğitimi", href: "#egitimler" },
    { label: "Yetişkin Yüzme Eğitimi", href: "#egitimler" },
    { label: "Birebir Özel Ders", href: "#egitimler" },
    { label: "Su Korkusu Programı", href: "#su-korkusu" },
  ],
  hakkinda: [
    { label: "Hakkımda", href: "#hakkimda" },
    { label: "Eğitim ve Sertifikalar", href: "#egitim-sertifikalar" },
    { label: "Sık Sorulan Sorular", href: "#sss" },
    { label: "Galeri", href: "#galeri" },
  ],
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const socialLinks = [
  { icon: Instagram, href: CONTACT.instagram, label: "Instagram" },
  { icon: WhatsAppIcon, href: CONTACT.whatsapp, label: "WhatsApp" },
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
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp ile ücretsiz danışmanlık al"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            whileHover={{ scale: 1.08, y: -3, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
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
            <a href="#" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center">
                <LifebuoyLogo size="lg" />
              </div>
              <span className="font-serif text-2xl font-bold text-foreground">
                Ahmet Swim
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              İzmir yüzme kursu, Buca yüzme eğitimi, Bornova yüzme dersi. Çocuk yüzme,
              yetişkin yüzme, su korkusu programı. Birebir ve grup yüzme dersi. Tel:{" "}
              <a href={`tel:+${CONTACT.phoneRaw}`} className="font-medium text-primary hover:underline">
                {CONTACT.phone}
              </a>
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
                  href="https://www.google.com/maps/search/%C4%B0zmir%2C%20%C4%B0zmir%20T%C3%BCrkiye/@38.4382,27.2598,17z?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Buca & Bornova, İzmir</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:+${CONTACT.phoneRaw}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4" />
                  <span>{CONTACT.phone}</span>
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
              © 2025 Ahmet Swim. Tüm hakları saklıdır.
            </p>
            <p className="text-sm text-muted-foreground">
              Developer: B.Can Duran
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
