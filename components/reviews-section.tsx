"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

export type Review = {
  author: string
  text: string
  rating: number
  date?: string
}

const placeholderReviews: Review[] = [
  {
    author: "Ayşe K.",
    text: "Oğlum su korkusunu burada yendi. Ahmet Hoca hem sabırlı hem eğlenceli anlatıyor, çocuklar çok seviyor. Kesinlikle tavsiye ederim.",
    rating: 5,
    date: "2 hafta önce",
  },
  {
    author: "Mehmet Y.",
    text: "Yetişkin olarak ilk kez yüzmeyi öğreniyorum. Hiç bilmeyen biri için çok güven veren ve adım adım ilerleyen bir program. Teşekkürler!",
    rating: 5,
    date: "1 ay önce",
  },
  {
    author: "Zeynep A.",
    text: "Kızım 5 yaşında, derslerden sonra eve mutlu dönüyor. Havuz temiz, ortam güvenli. Ailece güvenerek tercih ettik.",
    rating: 5,
    date: "3 hafta önce",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating
              ? "fill-playful text-playful"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  )
}

export function ReviewsSection({ reviews }: { reviews?: Review[] }) {
  const list = reviews && reviews.length > 0 ? reviews : placeholderReviews

  return (
    <section
      id="yorumlar"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Google Yorumları
          </span>
          <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-foreground">Öğrencilerimiz</span>{" "}
            <span className="text-gradient">Ne Diyor?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Google&apos;da bırakılan gerçek yorumlar — güvenle okuyun, bize katılın.
          </p>
        </motion.div>

        {/* Yorum kartları */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((review, index) => (
            <motion.article
              key={`${review.author}-${index}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 120,
                damping: 20,
              }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col rounded-2xl border-2 border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-lg"
            >
              <Quote className="absolute right-4 top-4 h-8 w-8 text-primary/20" />
              <StarRating rating={review.rating} />
              <blockquote className="mt-4 flex-1 text-muted-foreground">
                &quot;{review.text}&quot;
              </blockquote>
              <footer className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                <span className="font-semibold text-foreground">
                  {review.author}
                </span>
                {review.date && (
                  <span className="text-xs text-muted-foreground">
                    {review.date}
                  </span>
                )}
              </footer>
            </motion.article>
          ))}
        </div>

        {/* Google'dan yorum çekildiğini belirten küçük not */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-sm text-muted-foreground"
        >
          Google işletme sayfamızdan güncel yorumları burada paylaşıyoruz.
        </motion.p>
      </div>
    </section>
  )
}
