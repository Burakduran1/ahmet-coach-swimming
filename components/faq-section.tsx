"use client"

import { motion } from "framer-motion"
import { HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CONTACT } from "@/lib/contact"

const faqItems = [
  {
    question: "İzmir'de yüzme dersi nerede veriliyor?",
    answer: (
      <>
        Ahmet Kemer, İzmir yüzme kursu kapsamında <strong>Buca</strong> ve <strong>Bornova</strong> ilçelerinde yüzme dersi vermektedir. Her iki bölgede de havuzlarda güvenli ve profesyonel Buca yüzme eğitimi ve Bornova yüzme eğitimi sunulmaktadır.
      </>
    ),
  },
  {
    question: "Yüzme dersi için nasıl iletişime geçilir?",
    answer: (
      <>
        Randevu ve bilgi için{" "}
        <a href={`tel:+${CONTACT.phoneRaw}`} className="font-medium text-primary underline-offset-4 hover:underline">
          {CONTACT.phone}
        </a>
        {" "}numaralı telefondan,{" "}
        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">
          WhatsApp
        </a>
        {" "}veya{" "}
        <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">
          Instagram @ahmet.swim35
        </a>
        {" "}üzerinden ulaşabilirsiniz. Web:{" "}
        <a href="https://ahmetswim.com" className="font-medium text-primary underline-offset-4 hover:underline">
          ahmetswim.com
        </a>
        .
      </>
    ),
  },
  {
    question: "Hangi yaş gruplarına yüzme eğitimi veriliyor?",
    answer: (
      <>
        Çocuk yüzme dersi, yetişkin yüzme dersi ve her yaş grubuna İzmir yüzme eğitimi verilmektedir. Yaş engel değildir; Buca ve Bornova&apos;da kişiye özel yüzme programları uygulanır.
      </>
    ),
  },
  {
    question: "Su korkusu için özel program var mı?",
    answer: (
      <>
        Evet. İzmir&apos;de su korkusu terapisi ve su korkusu programı sunulmaktadır. Özel yöntemlerle güven kazanma, adım adım suya alıştırma ve yüzmeye geçiş hedeflenir. Detay için{" "}
        <a href={`tel:+${CONTACT.phoneRaw}`} className="font-medium text-primary underline-offset-4 hover:underline">
          arayın
        </a>
        {" "}veya{" "}
        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">
          WhatsApp
        </a>
        {" "}ile yazın.
      </>
    ),
  },
  {
    question: "Birebir özel yüzme dersi veriliyor mu?",
    answer: (
      <>
        Evet. İzmir&apos;de birebir özel yüzme dersi ve grup yüzme dersi seçenekleri mevcuttur. Buca yüzme dersi ve Bornova yüzme dersi için uygun gün ve saatlerde randevu alınabilir.{" "}
        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">
          WhatsApp ile randevu al
        </a>
        .
      </>
    ),
  },
  {
    question: "Ahmet Swim yüzme antrenörü kimdir?",
    answer: (
      <>
        Ahmet Kemer, 3. Kademe Kıdemli Yüzme Antrenörü ve Gümüş Cankurtaran sertifikasına sahiptir. İzmir Buca ve Bornova&apos;da çocuk yüzme, yetişkin yüzme ve su korkusu programlarıyla profesyonel yüzme eğitimi vermektedir.{" "}
        <a href="#hakkimda" className="font-medium text-primary underline-offset-4 hover:underline">
          Hakkımda
        </a>
        {" "}bölümünden detaylı bilgi alabilirsiniz.
      </>
    ),
  },
]

export function FAQSection() {
  return (
    <section
      id="sss"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/5 via-transparent to-secondary/10" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <HelpCircle className="h-4 w-4" />
            Sık Sorulan Sorular
          </span>
          <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-foreground">Merak</span>{" "}
            <span className="text-gradient">Ettikleriniz</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            İzmir yüzme kursu, Buca ve Bornova yüzme eğitimi hakkında en çok sorulan sorular.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-border/60 bg-card/50 shadow-lg backdrop-blur-sm"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/50 px-6">
                <AccordionTrigger className="py-5 text-left font-semibold text-foreground hover:no-underline hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground [&_a]:transition-colors">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
