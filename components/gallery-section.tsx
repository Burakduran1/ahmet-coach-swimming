"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Play } from "lucide-react"

type GalleryItem =
  | {
      type: "image"
      src: string
      alt: string
      aspect: string
    }
  | {
      type: "video"
      src: string
      poster?: string
      alt: string
      aspect: string
    }

const galleryItems: GalleryItem[] = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=600&q=80",
    alt: "Yüzücü havuzda",
    aspect: "aspect-[4/5]",
  },
  {
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-swimmer-doing-butterfly-stroke-in-pool-1510-large.mp4",
    poster: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80",
    alt: "Kelebek stili - video",
    aspect: "aspect-[3/4]",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1560090995-01632a28895b?w=600&q=80",
    alt: "Çocuk yüzme dersi",
    aspect: "aspect-square",
  },
  {
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-person-swimming-in-a-swimming-pool-4210-large.mp4",
    poster: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?w=600&q=80",
    alt: "Havuzda yüzme - video",
    aspect: "aspect-[4/5]",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?w=600&q=80",
    alt: "Antrenman",
    aspect: "aspect-[3/4]",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
    alt: "Koçluk",
    aspect: "aspect-square",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?w=600&q=80",
    alt: "Serbest stil",
    aspect: "aspect-[4/5]",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    alt: "Sualtı",
    aspect: "aspect-[3/4]",
  },
]

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const [videoPlaying, setVideoPlaying] = useState(false)
  const isVideo = item.type === "video"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 150, damping: 22 }}
      whileHover={{ scale: 1.05, y: -12 }}
      className={`group relative flex-shrink-0 overflow-hidden rounded-3xl border-2 border-white/50 shadow-lg ${item.aspect} w-64 sm:w-80 lg:w-96`}
    >
      {item.type === "image" ? (
        <img
          src={item.src}
          alt={item.alt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <>
          <video
            src={item.src}
            poster={item.poster}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            muted
            loop
            playsInline
            onMouseEnter={(e) => {
              e.currentTarget.play().catch(() => {})
              setVideoPlaying(true)
            }}
            onMouseLeave={(e) => {
              e.currentTarget.pause()
              e.currentTarget.currentTime = 0
              setVideoPlaying(false)
            }}
          />
          {!videoPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 transition-opacity group-hover:opacity-0">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-white shadow-lg">
                <Play className="h-7 w-7 fill-current pl-1" />
              </span>
            </div>
          )}
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
          {item.alt}
        </span>
      </div>
    </motion.div>
  )
}

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"])

  return (
    <section
      id="galeri"
      ref={containerRef}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Section Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Galeri
          </span>
          <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-foreground">Sudaki</span>{" "}
            <span className="text-gradient">Anlar</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Derslerimizden ve havuzda geçen güzel anlardan kareler
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Gallery - resim + video */}
      <motion.div
        style={{ x }}
        className="flex gap-4 px-4 sm:gap-6"
      >
        {galleryItems.map((item, index) => (
          <GalleryCard key={index} item={item} index={index} />
        ))}
      </motion.div>

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/10 via-transparent to-secondary/10" />
    </section>
  )
}
