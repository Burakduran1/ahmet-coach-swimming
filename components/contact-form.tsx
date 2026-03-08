"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle, Loader2 } from "lucide-react"

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ID ?
    `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}` :
    "https://formspree.io/f/placeholder"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    setStatus("sending")

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })

      if (res.ok) {
        setStatus("success")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const isPlaceholder = !process.env.NEXT_PUBLIC_FORMSPREE_ID

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Ad Soyad</Label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Adınız Soyadınız"
            required
            disabled={status === "sending"}
            className="h-11 bg-background/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">E-posta</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder="ornek@email.com"
            required
            disabled={status === "sending"}
            className="h-11 bg-background/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-message">Mesajınız</Label>
          <Textarea
            id="contact-message"
            name="message"
            placeholder="Yüzme eğitimi hakkında bilgi almak istiyorum..."
            required
            rows={4}
            disabled={status === "sending"}
            className="resize-none bg-background/50"
          />
        </div>

        {isPlaceholder && (
          <p className="text-xs text-amber-500/90">
            Formun çalışması için .env.local dosyasına NEXT_PUBLIC_FORMSPREE_ID ekleyin.
          </p>
        )}

        {status === "success" && (
          <p className="flex items-center gap-2 text-sm text-green-500">
            <CheckCircle className="h-4 w-4" />
            Mesajınız iletildi. En kısa sürede dönüş yapacağız.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-destructive">
            Gönderilemedi. Lütfen tekrar deneyin veya doğrudan e-posta/WhatsApp ile yazın.
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={status === "sending" || isPlaceholder}
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Gönderiliyor...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Gönder
            </>
          )}
        </Button>
      </form>
    </motion.div>
  )
}
