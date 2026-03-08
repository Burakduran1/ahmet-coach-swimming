"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Baby, Users, Trophy, Droplets, Clock, Star } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Çocuk Yüzme",
    description: "4-12 yaş grubu için eğlenceli ve güvenli yüzme eğitimi",
    icon: Baby,
    image: "https://images.unsplash.com/photo-1560090995-01632a28895b?w=800&q=80",
    features: ["Su korkusu terapisi", "Temel teknikler", "Oyunla öğrenme"],
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    id: 2,
    title: "Yetişkin Başlangıç",
    description: "Hiç yüzme bilmeyenler için özel program",
    icon: Users,
    image: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?w=800&q=80",
    features: ["Bireysel tempo", "Güven oluşturma"],
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 3,
    title: "Performans",
    description: "Yarışma ve profesyonel seviye eğitimi",
    icon: Trophy,
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
    features: ["Teknik analiz", "Kondisyon"],
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 4,
    title: "Aqua Fitness",
    description: "Su içinde fitness ve rehabilitasyon",
    icon: Droplets,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    features: ["Düşük etki", "Tüm kaslar"],
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 5,
    title: "Özel Ders",
    description: "Birebir kişiselleştirilmiş eğitim seansları",
    icon: Star,
    image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&q=80",
    features: ["Esnek program", "Hızlı ilerleme"],
    span: "lg:col-span-1 lg:row-span-1",
  },
]

function BentoCard({
  course,
  index,
}: {
  course: (typeof courses)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 120, damping: 20 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-3xl border-2 border-border/50 bg-card shadow-md ${course.span}`}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </motion.div>

      {/* Hover Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div
        className="relative flex h-full min-h-[280px] flex-col justify-end p-6 lg:min-h-[320px]"
        style={{ transform: "translateZ(40px)" }}
      >
        <motion.div
          className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm"
          animate={{
            scale: isHovered ? 1.1 : 1,
            backgroundColor: isHovered
              ? "rgba(100, 200, 255, 0.3)"
              : "rgba(100, 200, 255, 0.2)",
          }}
          transition={{ duration: 0.3 }}
        >
          <course.icon className="h-6 w-6 text-primary" />
        </motion.div>

        <h3 className="font-serif text-2xl font-bold text-foreground">
          {course.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>

        <motion.div
          className="mt-4 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? 0 : 5 }}
          transition={{ duration: 0.3 }}
        >
          {course.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm"
            >
              {feature}
            </span>
          ))}
        </motion.div>

        {/* Hover Glow Effect - CSS based for performance */}
        <div 
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "radial-gradient(600px circle at 50% 50%, rgba(100, 200, 255, 0.15), transparent 40%)",
          }}
        />
      </div>

      {/* Duration Badge */}
      <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
        <Clock className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-medium text-foreground">45-60 dk</span>
      </div>
      {/* Çocuk Yüzme kartında "En çok tercih" rozeti */}
      {course.id === 1 && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute left-4 top-4 rounded-2xl bg-accent/95 px-3 py-1.5 text-xs font-bold text-white shadow-lg"
        >
          En çok tercih edilen
        </motion.div>
      )}
    </motion.div>
  )
}

export function BentoSection() {
  return (
    <section id="egitimler" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
          className="mb-16 text-center"
        >
          <motion.span
            className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary"
            whileHover={{ scale: 1.02 }}
          >
            <Droplets className="h-4 w-4" />
            Eğitimler
          </motion.span>
          <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-foreground">Her Yaş İçin</span>
            <br />
            <span className="text-gradient">Eğitim Programları</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Çocuk ve yetişkin gruplarına göre güvenli, eğlenceli ve kişiye özel yüzme dersleri
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {courses.map((course, index) => (
            <BentoCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
    </section>
  )
}
