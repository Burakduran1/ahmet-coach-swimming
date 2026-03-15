"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Award, Shield, Users, Target, Heart, GraduationCap, Droplets, MapPin, Check } from "lucide-react"
import { CONTACT } from "@/lib/contact"
import ahmetKemerImage from "../images/ahmet-kemer.jpeg"

const certifications = [
  {
    icon: GraduationCap,
    title: "3. Kademe Kıdemli Yüzme Antrenörlüğü Belgesi",
  },
  {
    icon: Shield,
    title: "Gümüş Cankurtaran Sertifikası",
  },
]

const whyChooseMe = [
  {
    icon: Award,
    title: "Profesyonel Eğitim",
    description: "3. Kademe Kıdemli Antrenörlük belgesi ile bilimsel ve doğru tekniklere dayalı eğitim.",
  },
  {
    icon: Shield,
    title: "Güvenli Eğitim Ortamı",
    description: "Gümüş Cankurtaran sertifikası sayesinde derslerde su güvenliği ön plandadır.",
  },
  {
    icon: Users,
    title: "Her Yaşa Uygun Eğitim",
    description: "Çocuklar, gençler ve yetişkinler için farklı yöntemlerle eğitim verilmektedir.",
  },
  {
    icon: Target,
    title: "Kişiye Özel Program",
    description: "Her öğrencinin seviyesi ve hedefi farklı olduğu için ders planları kişiye özel hazırlanır.",
  },
  {
    icon: Heart,
    title: "Su Korkusu İçin Özel Çalışmalar",
    description: "Su korkusu yaşayan bireyler için özel yöntemlerle güven kazanma süreci uygulanır.",
  },
]

const egitimlerListesi = [
  "Yüzmeye başlangıç dersleri",
  "Teknik geliştirme dersleri",
  "Çocuklar için yüzme eğitimi",
  "Yetişkinler için yüzme eğitimi",
  "Birebir özel yüzme dersleri",
  "Grup yüzme dersleri",
]

const suKorkusuHedefler = [
  "Suya güven kazanmak",
  "Panik duygusunu azaltmak",
  "Su içinde rahat hareket edebilmek",
  "Adım adım yüzmeye geçiş yapmak",
]

/** Şık kart bileşeni - Hakkımda alt bölümleri için */
function AboutCard({
  id,
  title,
  icon: Icon,
  children,
  index = 0,
  accent = "primary",
}: {
  id: string
  title: string
  icon?: React.ElementType
  children: React.ReactNode
  index?: number
  accent?: "primary" | "accent"
}) {
  const isAccent = accent === "accent"
  return (
    <motion.article
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative scroll-mt-24 overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-md transition-all duration-300 hover:shadow-xl sm:p-8 ${
        isAccent
          ? "hover:border-accent/40 hover:shadow-[0_8px_30px_rgba(249,115,22,0.12)]"
          : "hover:border-primary/40 hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)]"
      }`}
    >
      {/* Üst accent çizgisi */}
      <div
        className={`absolute left-0 right-0 top-0 h-1 ${isAccent ? "bg-gradient-to-r from-accent/80 to-accent/40" : "bg-gradient-to-r from-primary/80 to-primary/40"}`}
      />
      <div className="flex flex-col text-left">
        {Icon && (
          <div
            className={`mb-4 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors ${
              isAccent ? "bg-accent/15 text-accent group-hover:bg-accent/25" : "bg-primary/15 text-primary group-hover:bg-primary/25"
            }`}
          >
            <Icon className="h-6 w-6" />
          </div>
        )}
        <h3 className="font-serif text-xl font-bold text-foreground sm:text-2xl">
          {title}
        </h3>
        <div className="mt-4 space-y-3 text-left text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline">
          {children}
        </div>
      </div>
    </motion.article>
  )
}

/** Tam genişlik öne çıkan kart - Amacım için */
function AboutCardFeatured({ id, title, icon: Icon, children, index = 0 }: {
  id: string
  title: string
  icon?: React.ElementType
  children: React.ReactNode
  index?: number
}) {
  return (
    <motion.article
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative scroll-mt-24 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-accent/5 p-8 shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-xl sm:p-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(37,99,235,0.06)_0%,transparent_60%)]" />
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary via-accent/80 to-accent" />
      <div className="relative flex flex-col items-center text-center">
        {Icon && (
          <div className="mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <Icon className="h-8 w-8" />
          </div>
        )}
        <h3 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
          {title}
        </h3>
        <div className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </motion.article>
  )
}

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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. HAKKIMDA - Ana giriş */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div style={{ y }} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl"
            >
              <Image
                src={ahmetKemerImage}
                alt="Ahmet Kemer - İzmir Yüzme Antrenörü"
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="glass absolute bottom-6 left-6 right-6 rounded-2xl p-4"
              >
                <p className="text-sm font-medium text-primary">
                  &quot;Yüzmeye başlamak için hiçbir yaş geç değildir.&quot;
                </p>
                <p className="mt-1 text-xs text-muted-foreground">— Ahmet Kemer</p>
              </motion.div>
            </motion.div>
            <div className="glow absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
          </motion.div>

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
                <span className="text-foreground">Ben Ahmet Kemer</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 text-lg leading-relaxed text-muted-foreground"
            >
              İzmir yüzme kursu kapsamında Buca ve Bornova&apos;da profesyonel yüzme antrenörlüğü yapıyorum. Çocuk yüzme dersi, yetişkin yüzme dersi, su korkusu programı, birebir özel yüzme dersi ve grup yüzme dersi ile her yaştan bireye yüzme eğitimi veriyorum. Amacım, öğrencilerimin suyla güvenli bir bağ kurmasını sağlamak ve yüzmeyi keyifli, güvenli ve doğru tekniklerle öğrenmelerine yardımcı olmaktır.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-4 text-lg leading-relaxed text-muted-foreground"
            >
              Yüzme, yalnızca bir spor değil; aynı zamanda sağlıklı bir yaşamın, özgüvenin ve disiplinin önemli bir parçasıdır. Bu anlayışla öğrencilerime hem teknik hem de güvenli bir öğrenme ortamı sunuyorum.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.28, duration: 0.6 }}
              className="mt-4 text-lg leading-relaxed text-muted-foreground"
            >
              İster yüzmeye yeni başlıyor olun ister tekniğinizi geliştirmek isteyin, seviyenize uygun programlarla güvenli, verimli ve eğlenceli bir eğitim sunuyorum.
            </motion.p>

            {/* 2. EĞİTİM VE SERTİFİKALAR - Hakkımda içinde */}
            <motion.div
              id="egitim-sertifikalar"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 scroll-mt-24"
            >
              <h3 className="mb-4 font-serif text-xl font-bold text-foreground">
                Eğitim ve Sertifikalar
              </h3>
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li key={cert.title} className="flex items-center gap-3">
                    <cert.icon className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{cert.title}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-muted-foreground">
                Bu belgeler doğrultusunda derslerimde hem doğru teknikleri hem de su güvenliğini ön planda tutarak profesyonel bir eğitim süreci sunuyorum.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Kartlar - Hakkımda alt bölümleri | 2x2 grid + 1 full-width */}
        <div className="mt-20 space-y-6">
          {/* 4 kart: 2 sütun - dengeli grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            <AboutCard
              id="egitim-bolgeleri"
              title="Eğitim Bölgeleri: Buca & Bornova"
              icon={MapPin}
              index={0}
            >
              <p>
                İzmir yüzme kursu kapsamında <strong className="text-foreground">Buca</strong> ve <strong className="text-foreground">Bornova</strong> ilçelerinde Buca yüzme eğitimi ve Bornova yüzme eğitimi veriyorum. Her iki bölgede de havuzlarda güvenli ve profesyonel yüzme dersi sunuyorum.
              </p>
              <p>
                Buca yüzme dersi veya Bornova yüzme dersi arayanlar için uygun gün ve saatlerde birebir özel yüzme dersi veya grup yüzme dersi planlanabilir. İzmir yüzme hocası olarak detaylı bilgi ve randevu için <a href={`tel:+${CONTACT.phoneRaw}`}>{CONTACT.phone}</a> numaralı telefondan veya <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a> üzerinden iletişime geçebilirsiniz.
              </p>
            </AboutCard>

            <AboutCard
              id="yuzme-egitimlerimiz"
              title="Yüzme Eğitimlerimiz"
              icon={Droplets}
              index={1}
            >
              <p>İzmir yüzme eğitimi kapsamında her seviyeye uygun çocuk yüzme, yetişkin yüzme ve su korkusu programı sunuyorum.</p>
              <ul className="space-y-2">
                {egitimlerListesi.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                Her öğrencinin seviyesi ve hedefi farklı olduğu için ders programları kişiye özel olarak planlanmaktadır.
              </p>
            </AboutCard>

            <AboutCard
              id="su-korkusu"
              title="Su Korkusu Olanlar İçin Özel Eğitim"
              icon={Heart}
              index={2}
              accent="accent"
            >
              <p>
                Su korkusu birçok kişinin yüzme öğrenmesini zorlaştırabilir. Bu nedenle suya alışma sürecini destekleyen özel çalışmalar ve su terapisi yaklaşımıyla eğitimler sunuyorum.
              </p>
              <p className="font-medium text-foreground">Bu süreçte amaç:</p>
              <ul className="space-y-2">
                {suKorkusuHedefler.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                Sabırlı ve güvenli bir eğitim süreci ile öğrencilerimin suyla barışmalarını sağlıyorum.
              </p>
            </AboutCard>

            <AboutCard
              id="yas-engel-degil"
              title="Yüzmek İçin Yaş Engel Değildir"
              icon={Users}
              index={3}
            >
              <p>
                Yüzme öğrenmek için belirli bir yaş sınırı yoktur. Çocuklar, gençler ve yetişkinler için farklı yöntemlerle eğitim vererek herkesin yüzmeyi öğrenebileceğine inanıyorum.
              </p>
              <p>
                Daha önce hiç suya girmemiş olsanız bile doğru yöntemlerle yüzmeyi öğrenmeniz mümkündür.
              </p>
            </AboutCard>
          </div>

          {/* Amacım - tam genişlik öne çıkan kart */}
          <AboutCardFeatured id="amacim" title="Amacım" icon={Target} index={4}>
            <p>
              Amacım yalnızca yüzme öğretmek değil; öğrencilerimin su içinde kendine güvenen, doğru teknikleri bilen ve yüzmeden keyif alan bireyler haline gelmesini sağlamaktır.
            </p>
          </AboutCardFeatured>
        </div>

        {/* 7. NEDEN AHMET KEMER İLE YÜZME DERSİ? - Yeni alan */}
        <motion.section
          id="neden-ahmet-kemer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 scroll-mt-24"
        >
          <h3 className="mb-8 font-serif text-2xl font-bold text-foreground">
            Neden Ahmet Kemer ile Yüzme Dersi?
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseMe.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="rounded-2xl border-2 border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-colors hover:border-primary/30"
              >
                <item.icon className="mb-3 h-8 w-8 text-primary" />
                <h4 className="font-semibold text-foreground">{item.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </section>
  )
}
