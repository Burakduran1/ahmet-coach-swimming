"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { Play, Expand } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import izmirSwimImg from "../images/izmir-swim.jpeg"
import izmirYuzmeEgitimiImg from "../images/izmir-yuzme-egitimi.jpeg"
import bornovaYuzmeImg from "../images/bornova-yuzme.jpeg"
import bucaYuzmeImg from "../images/buca-yuzme.jpeg"
import cocukYuzmeImg from "../images/cocuk-yuzme.jpeg"
import ahmetKemerImg from "../images/ahmet-kemer.jpeg"

type GalleryItem =
  | {
      type: "image"
      src: string | { src: string; width: number; height: number }
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
    src: izmirSwimImg,
    alt: "Ahmet Kemer - Yüzme antrenörü",
    aspect: "aspect-[4/5]",
  },
  {
    type: "image",
    src: izmirYuzmeEgitimiImg,
    alt: "İzmir yüzme eğitimi",
    aspect: "aspect-[3/4]",
  },
  {
    type: "image",
    src: bornovaYuzmeImg,
    alt: "Bornova yüzme",
    aspect: "aspect-[4/5]",
  },
  {
    type: "image",
    src: bucaYuzmeImg,
    alt: "Buca yüzme",
    aspect: "aspect-[3/4]",
  },
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
    src: cocukYuzmeImg,
    alt: "Çocuk yüzme",
    aspect: "aspect-[3/4]",
  },
  {
    type: "image",
    src: ahmetKemerImg,
    alt: "Ahmet Kemer - Yüzme antrenörü",
    aspect: "aspect-[4/5]",
  },
]

function GalleryCard({
  item,
  index,
  onClick,
  onHover,
}: {
  item: GalleryItem
  index: number
  onClick: () => void
  onHover?: () => void
}) {
  const [videoPlaying, setVideoPlaying] = useState(false)

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={item.type === "image" ? onHover : undefined}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 150, damping: 22 }}
      whileHover={{ scale: 1.05, y: -12 }}
      className={`group relative flex cursor-pointer flex-shrink-0 snap-start overflow-hidden rounded-3xl border-2 border-white/50 shadow-lg ${item.aspect} w-64 sm:w-80 lg:w-96`}
      aria-label={item.type === "video" ? `${item.alt} - Videoyu oynat` : `${item.alt} - Görüntüyü büyüt`}
    >
      {item.type === "image" ? (
        <Image
          src={item.src}
          alt={item.alt}
          width={320}
          height={400}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          sizes="(max-width: 640px) 256px, 320px"
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
      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        <Expand className="h-5 w-5 text-foreground" />
      </div>
    </motion.button>
  )
}

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [preloadItem, setPreloadItem] = useState<GalleryItem | null>(null)
  const [lightboxImageLoaded, setLightboxImageLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"])

  // Video seçildiğinde otomatik oynat, lightbox kapanınca durdur
  useEffect(() => {
    if (!selectedItem) {
      videoRef.current?.pause()
      setLightboxImageLoaded(false)
      return
    }
    if (selectedItem.type === "video") {
      setLightboxImageLoaded(true)
      const id = setTimeout(() => {
        videoRef.current?.play().catch(() => {})
      }, 100)
      return () => clearTimeout(id)
    }
  }, [selectedItem])

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
            Derslerimizden ve havuzda geçen güzel anlardan kareler. Tıklayarak videoları oynatabilir veya fotoğrafları büyütebilirsiniz.
          </p>
        </motion.div>
      </div>

      {/* Galeri: sayfa scroll = parallax kayma + yatay swipe + scroll-snap, scrollbar gizli */}
      <div
        className="overflow-x-auto overflow-y-hidden px-4 pb-4 snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <motion.div style={{ x }} className="flex gap-4 sm:gap-6">
          {galleryItems.map((item, index) => (
            <GalleryCard
              key={index}
              item={item}
              index={index}
              onClick={() => setSelectedItem(item)}
              onHover={() => item.type === "image" && setPreloadItem(item)}
            />
          ))}
        </motion.div>
      </div>

      {/* Görünmez ön yükleme: hover sırasında lightbox resmini önceden yükle */}
      {preloadItem && preloadItem.type === "image" && (
        <div className="pointer-events-none fixed -left-[9999px] opacity-0" aria-hidden>
          <Image
            src={preloadItem.src}
            alt=""
            width={896}
            height={672}
            sizes="(max-width: 1024px) 100vw, 896px"
            fetchPriority="high"
          />
        </div>
      )}

      {/* Lightbox Modal - Sabit boyutlu kart, tüm resimler aynı kutuda object-cover */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent
          className="max-h-[90vh] max-w-4xl overflow-hidden border-0 bg-background/95 p-0"
          showCloseButton={true}
        >
          {selectedItem && (
            <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-lg bg-black/5">
              <DialogTitle className="sr-only">{selectedItem.alt}</DialogTitle>
              {/* Sabit oranlı kutu: tüm öğeler aynı boyutta, içerik object-cover ile doldurur */}
              <div className="relative aspect-[4/3] w-full max-h-[70vh] overflow-hidden bg-muted">
                {selectedItem.type === "image" ? (
                  <>
                    {!lightboxImageLoaded && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted">
                        <div className="h-12 w-12 animate-pulse rounded-full bg-primary/20" />
                      </div>
                    )}
                    <Image
                      src={selectedItem.src}
                      alt={selectedItem.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 896px"
                      onLoad={() => setLightboxImageLoaded(true)}
                    />
                  </>
                ) : (
                  <video
                    ref={videoRef}
                    src={selectedItem.src}
                    poster={selectedItem.poster}
                    controls
                    autoPlay
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    Tarayıcınız video oynatmayı desteklemiyor.
                  </video>
                )}
                <p className="absolute bottom-4 left-4 rounded-full bg-background/80 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm">
                  {selectedItem.alt}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/10 via-transparent to-secondary/10" />
    </section>
  )
}
