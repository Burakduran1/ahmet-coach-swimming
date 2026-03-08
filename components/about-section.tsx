"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Award, Heart, Users, Target } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Çocuk & Yetişkin Deneyimi",
    description: "Her yaş grubuyla çalışma tecrübesi, güven veren ve sonuç odaklı eğitim",
  },
  {
    icon: Heart,
    title: "Sıcak ve Sabırlı",
    description: "Her öğrencinin kendi hızında ilerlediği, yaşa uygun ve motive edici dersler",
  },
  {
    icon: Users,
    title: "Aile & Öğrenci İletişimi",
    description: "Velilerle ve yetişkin öğrencilerle düzenli bilgilendirme, şeffaf süreç",
  },
  {
    icon: Target,
    title: "Güvenli Öğrenme",
    description: "Su güvenliği öncelikli, adım adım ilerleyen, kişiye özel programlar",
  },
]

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section
      id="hakkimda"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Image with Parallax */}
          <motion.div
            style={{ y }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl"
            >
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80"
                alt="Koç Ahmet havuz başında"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="glass absolute bottom-6 left-6 right-6 rounded-2xl p-4"
              >
                <p className="text-sm font-medium text-primary">
                  &quot;İster çocuk ister yetişkin olsun, herkes kendi temposunda suyu sevebilir.&quot;
                </p>
                <p className="mt-1 text-xs text-muted-foreground">— Koç Ahmet</p>
              </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="glow absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
          </motion.div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Hakkımda
              </span>
              <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-gradient">Merhaba,</span>
                <br />
                <span className="text-foreground">Ben Ahmet</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 text-lg leading-relaxed text-muted-foreground"
            >
              İzmir&apos;de çocuklara ve yetişkinlere yüzme eğitimi veriyorum.
              Genç ve dinamik bir eğitmen olarak her yaş grubuyla güvenli, eğlenceli
              ve sonuç odaklı bir ortam sunuyorum. Amacım her öğrencinin suyu sevmesi,
              güvenle yüzmeyi öğrenmesi; ailelerin ve yetişkin öğrencilerin de içi rahat olsun.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 grid gap-6 sm:grid-cols-2"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, type: "spring", stiffness: 150, damping: 20 }}
                  whileHover={{ scale: 1.04, y: -8 }}
                  className="group cursor-default rounded-2xl border-2 border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-lg"
                >
                  <motion.div
                    className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 transition-colors group-hover:bg-primary/25"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <feature.icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
