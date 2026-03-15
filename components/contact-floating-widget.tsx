"use client"

import { motion } from "framer-motion"
import { Phone, Instagram } from "lucide-react"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CONTACT } from "@/lib/contact"

function FloatingIconButton({
  href,
  label,
  icon: Icon,
  delay = 0,
}: {
  href: string
  label: string
  icon: React.ElementType
  delay?: number
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("tel:") ? undefined : "_blank"}
      rel={href.startsWith("tel:") ? undefined : "noopener noreferrer"}
      aria-label={label}
      title={label}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2 + delay, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="group/btn relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 bg-card/90 text-primary shadow-lg backdrop-blur-md transition-colors hover:border-primary/50 hover:bg-primary/15 sm:h-12 sm:w-12"
    >
      <Icon className="h-5 w-5 sm:h-5 sm:w-5" />
      {/* Tooltip */}
      <span className="pointer-events-none absolute bottom-full right-0 mb-2 hidden whitespace-nowrap rounded-lg bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-lg opacity-0 transition-opacity group-hover/btn:opacity-100 sm:block">
        {label}
      </span>
    </motion.a>
  )
}

export function ContactFloatingWidget() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Telefon ve Instagram - WP'nin üstünde */}
      <FloatingIconButton
        href={`tel:+${CONTACT.phoneRaw}`}
        label="Telefon ile ara"
        icon={Phone}
        delay={0.1}
      />
      <FloatingIconButton
        href={CONTACT.instagram}
        label="Instagram"
        icon={Instagram}
        delay={0.2}
      />
      {/* WhatsApp - en altta */}
      <WhatsAppButton embedded />
    </div>
  )
}
